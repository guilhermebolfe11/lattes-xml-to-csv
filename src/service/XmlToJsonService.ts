import Researcher from "../entities/Researcher";
import { xml2json } from 'xml-js';
import FileXml from "../entities/File";

class XmlToJsonService {

  public execute(filesXml: Array<FileXml>): Array<Researcher> {
    console.time("Parsed");
    if (!filesXml || filesXml.length < 1)
      throw new Error("No files were parser to json");

    let result = new Array<Researcher>();
    let errors = new Array<string>();

    for (let file in filesXml) {
      try {
        let json = xml2json(filesXml[file].data, { compact: true });
        let researcher: Researcher = JSON.parse(json);
        researcher.fileName = filesXml[file].name;
        result.push(researcher);
      } catch (error) {
        if (error instanceof Error)
          errors.push(`${filesXml[file].name} - Error: ${error.message}}`)
        else
          console.error(error)
      }
    }

    if (errors.length > 0)
      console.error("Files with error parser: ", errors)

    if (result.length < 1)
      throw new Error("It was not possible to parse any file");

    console.info(`Parsed ${result.length} file(s)`)
    console.timeEnd("Parsed");
    return result;
  }
}

export default XmlToJsonService;