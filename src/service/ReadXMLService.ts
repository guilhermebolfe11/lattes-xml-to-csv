import { readdir, readFile } from 'fs/promises'
import env from "../config/env";
import FileXml from '../entities/File';

class ReadXMLService {

  public async executeAsync(): Promise<Array<FileXml>> {
    console.time("Read");
    let result = new Array<FileXml>();
    let errors = new Array<string>();
    let filesPath = await readdir(env.INPUT_PATH)

    if (!filesPath || filesPath.length < 1)
      throw new Error("Files not found in inputs folder");

    for (let index in filesPath) {
      try {
        let fileName = filesPath[index];
        let file = await readFile(`${env.INPUT_PATH}/${fileName}`, { encoding: 'latin1' });
        result.push(new FileXml(fileName, file.toString()))
      } catch (error) {
        if (error instanceof Error)
          errors.push(`${filesPath[index]} - Error: ${error.message}}`)
        else
          console.error(error)
      }
    }

    if (errors.length > 0)
      console.error("Files with error read: ", errors)

    if (result.length < 1)
      throw new Error("No files were read in inputs folder");

    console.info(`Read ${result.length} file(s)`)

    console.timeEnd("Read");
    return result;
  }
}

export default ReadXMLService;