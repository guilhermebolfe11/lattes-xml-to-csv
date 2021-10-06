import Area from "../entities/Area";
import AreaOfExpertise from "../entities/AreaOfExpertise";
import Article from "../entities/Article";
import GeneralData from "../entities/GeneralData";
import Graduation from "../entities/Graduation";
import Researcher from "../entities/Researcher";
import Resume from "../entities/Resume";
import Row from "../entities/Row";

class GetInformationService {
  readonly defaultMessage = "Não há";

  public execute(researchers: Array<Researcher>): Array<Row> {
    console.time("Get information");
    let rows = new Array<Row>();
    let errors = new Array<string>();

    for (let index in researchers) {
      try {
        let researcher = researchers[index];
        let resume = this.getResume(researcher);
        let generalData = this.getGeneralData(resume);

        let name = this.getName(generalData);
        let institution = this.getInstitution(generalData);
        let academicGraduation = this.getAcademicGraduation(generalData);
        let link = this.getLink(resume);
        let state = this.getState(generalData);
        let themes = this.getThemes(generalData);
        let articles = this.getArticles(resume);

        rows.push(
          new Row(
            name,
            institution,
            academicGraduation,
            link,
            state,
            themes,
            this.defaultMessage,
            articles
          )
        );
      } catch (error) {
        if (error instanceof Error)
          errors.push(
            `${researchers[index].fileName} - Error: ${error.message}}`
          );
        else console.error(error);
      }
    }

    if (errors.length > 0)
      console.error("Files with error get information: ", errors);

    if (rows.length < 1) throw new Error("No files were get information");

    console.info(`Get information ${rows.length} file(s)`);
    console.timeEnd("Get information");
    return rows;
  }

  private getName(generalData: GeneralData): string {
    return generalData._attributes["NOME-COMPLETO"];
  }

  private getInstitution(generalData: GeneralData): string {
    let address = generalData.ENDERECO["ENDERECO-PROFISSIONAL"];

    if (!address) return this.defaultMessage;

    let result = address._attributes["NOME-INSTITUICAO-EMPRESA"];

    if (!result || result === "") return this.defaultMessage;

    return result;
  }

  private getAcademicGraduation(generalData: GeneralData): string {
    let result = this.getGraduationInformation(
      generalData["FORMACAO-ACADEMICA-TITULACAO"].GRADUACAO,
      "Graduação"
    );
    result = result.concat(
      this.getGraduationInformation(
        generalData["FORMACAO-ACADEMICA-TITULACAO"].ESPECIALIZACAO,
        "Especialização"
      )
    );
    result = result.concat(
      this.getGraduationInformation(
        generalData["FORMACAO-ACADEMICA-TITULACAO"].MESTRADO,
        "Mestrado"
      )
    );
    result = result.concat(
      this.getGraduationInformation(
        generalData["FORMACAO-ACADEMICA-TITULACAO"].DOUTORADO,
        "Doutorado"
      )
    );
    result = result.concat(
      this.getGraduationInformation(
        generalData["FORMACAO-ACADEMICA-TITULACAO"]["POS-DOUTORADO"],
        "Pós-Doutorado"
      )
    );

    if (result.length === 0) return this.defaultMessage;

    let message = result.join(", \n");
    return message == "" ? this.defaultMessage : message;
  }

  private getGraduationInformation(
    graduation: Graduation | Array<Graduation>,
    desc: string
  ): Array<string> {
    if (graduation instanceof Array)
      return this.getMultipleGraduation(graduation, desc);
    else return this.getMultipleGraduation([graduation], desc);
  }

  private getSingleGraduation(
    graduation: Graduation,
    desc: string
  ): string | null {
    if (
      !graduation ||
      graduation._attributes["STATUS-DO-CURSO"] !== "CONCLUIDO"
    )
      return null;

    return `${desc} - ${graduation._attributes["ANO-DE-CONCLUSAO"]} - ${graduation._attributes["NOME-CURSO"]} - ${graduation._attributes["NOME-INSTITUICAO"]}`;
  }

  private getMultipleGraduation(
    graduation: Array<Graduation>,
    desc: string
  ): Array<string> {
    let result = new Array<string>();
    for (let g in graduation) {
      let info = this.getSingleGraduation(graduation[g], desc);
      if (info) result.push(info);
    }

    return result;
  }

  private getState(generalData: GeneralData): string {
    let address = generalData.ENDERECO["ENDERECO-PROFISSIONAL"];
    let state = "";

    if (!address) state = generalData._attributes["UF-NASCIMENTO"];
    else state = address._attributes.UF;

    if (!state || state === "") return this.defaultMessage;

    return state;
  }

  private getThemes(generalData: GeneralData): string {
    let result = new Array<string>();
    let areas = generalData["AREAS-DE-ATUACAO"];

    if (!areas) return this.defaultMessage;

    let themes = areas["AREA-DE-ATUACAO"];

    if (themes instanceof Array) result = this.getMultipleTheme(themes);
    else result = this.getMultipleTheme([themes]);

    if (result.length === 0) return this.defaultMessage;

    return result.join(", \n");
  }

  private getSingleTheme(area: Area): string | null {
    if (!area) return null;

    if (area._attributes["NOME-DA-ESPECIALIDADE"] !== "")
      return area._attributes["NOME-DA-ESPECIALIDADE"];

    if (area._attributes["NOME-DA-SUB-AREA-DO-CONHECIMENTO"] !== "")
      return area._attributes["NOME-DA-SUB-AREA-DO-CONHECIMENTO"];

    if (area._attributes["NOME-DA-AREA-DO-CONHECIMENTO"] !== "")
      return area._attributes["NOME-DA-AREA-DO-CONHECIMENTO"];

    return null;
  }

  private getMultipleTheme(area: Array<Area>): Array<string> {
    let result = new Array<string>();
    for (let g in area) {
      let info = this.getSingleTheme(area[g]);
      if (info) result.push(info);
    }

    return result;
  }

  private getLink(resume: Resume): string {
    return `http://lattes.cnpq.br/${resume._attributes["NUMERO-IDENTIFICADOR"]}`;
  }

  private getArticles(resume: Resume): string {
    let articles = resume["PRODUCAO-BIBLIOGRAFICA"]["ARTIGOS-PUBLICADOS"];

    if (!articles) return this.defaultMessage;

    let works = articles["ARTIGO-PUBLICADO"];

    let result = new Array<string>();
    if (works instanceof Array) result = this.getMultiplesArticles(works);
    else result = this.getMultiplesArticles([works]);

    if (result.length === 0) return this.defaultMessage;

    return result.join(", \n");
  }

  private getSingleArticle(article: Article): string | null {
    if (!article) return null;

    let year = article["DADOS-BASICOS-DO-ARTIGO"]._attributes["ANO-DO-ARTIGO"];

    if (year !== "" && year >= "2017")
      return `${article["DADOS-BASICOS-DO-ARTIGO"]._attributes["TITULO-DO-ARTIGO"]} - ${article["DADOS-BASICOS-DO-ARTIGO"]._attributes["ANO-DO-ARTIGO"]}`;

    return null;
  }

  private getMultiplesArticles(articles: Array<Article>): Array<string> {
    let result = new Array<string>();
    for (let index in articles) {
      let info = this.getSingleArticle(articles[index]);
      if (info) result.push(info);
    }

    return result;
  }

  private getResume(researcher: Researcher): Resume {
    let resume = researcher["CURRICULO-VITAE"];

    if (!resume) throw new Error("Resume is null");

    return resume;
  }

  private getGeneralData(resume: Resume): GeneralData {
    let generalData = resume["DADOS-GERAIS"];

    if (!generalData) throw new Error("generalData is null");

    return generalData;
  }
}

export default GetInformationService;
