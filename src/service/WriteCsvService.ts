import { Parser } from "json2csv";
import { writeFile } from "fs/promises";
import Row from "../entities/Row";
import env from "../config/env";

class WriteCsvService {
  public async executeAsync(rows: Array<Row>): Promise<void> {
    console.time("Write");
    let parser = new Parser<Row>();
    let csv = parser.parse(rows);
    await writeFile(`${env.OUTPUT_PATH}/${env.FILE_NAME}`, csv);
    console.info(`Write file ${env.FILE_NAME}`);
    console.timeEnd("Write");
  }
}

export default WriteCsvService;
