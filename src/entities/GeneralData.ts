import AcademicGraduation from "./AcademicGraduation";
import Address from "./Address";
import AreaOfExpertise from "./AreaOfExpertise";

class GeneralData {
  _attributes!: {
    "NOME-COMPLETO": string;
    "UF-NASCIMENTO": string;
    [key: string]: any;
  };
  ENDERECO!: Address;
  "FORMACAO-ACADEMICA-TITULACAO": AcademicGraduation;
  "AREAS-DE-ATUACAO": AreaOfExpertise;
  [key: string]: any;
}

export default GeneralData;