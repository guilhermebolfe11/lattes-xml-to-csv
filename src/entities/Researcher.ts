import Resume from "./Resume";

class Researcher {
  fileName!: string;
  "CURRICULO-VITAE": Resume;
  [key:string]:any;
}

export default Researcher;