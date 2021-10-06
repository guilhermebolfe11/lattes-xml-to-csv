import BibliographicProduction from "./BibliographicProduction";
import GeneralData from "./GeneralData";

class Resume {
  _attributes!: {
    "NUMERO-IDENTIFICADOR": string;
    [key: string]: any;
  };
  "DADOS-GERAIS": GeneralData;
  "PRODUCAO-BIBLIOGRAFICA":BibliographicProduction
  [key: string]: any;
}

export default Resume;