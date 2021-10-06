class Row {
  name: string;
  institution: string;
  academicGraduation: string;
  state: string;
  researchThemes: string;
  email:string;
  publishedArticles:string;
  link: string;

  constructor(
    name: string,
    institution: string,
    academicGraduation: string,
    link: string,
    state: string,
    researchThemes: string,
    email:string,
    publishedArticles:string
  ) {
    this.name = name;
    this.institution = institution;
    this.academicGraduation = academicGraduation;
    this.link = link;
    this.state = state;
    this.researchThemes = researchThemes;
    this.email = email;
    this.publishedArticles = publishedArticles;
  }
}

export default Row;
