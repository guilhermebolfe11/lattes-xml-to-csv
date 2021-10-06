import Graduation from "./Graduation";

class AcademicGraduation {
  GRADUACAO!: Graduation | Array<Graduation>;
  ESPECIALIZACAO!:Graduation | Array<Graduation>;
  MESTRADO!: Graduation | Array<Graduation>;
  DOUTORADO!: Graduation | Array<Graduation>;
  "POS-DOUTORADO"!: Graduation | Array<Graduation>;
  [key: string]: any;
}

export default AcademicGraduation;