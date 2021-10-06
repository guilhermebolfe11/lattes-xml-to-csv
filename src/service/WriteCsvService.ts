import { Parser } from "json2csv";
import { writeFile } from "fs/promises";
import Row from "../entities/Row";

class WriteCsvService {
  public async executeAsync(rows: Array<Row>): Promise<void> {
    console.time("Write");
    let parser = new Parser<Row>();
    let fileName = "result.csv";
    let csv = parser.parse(rows);
    await writeFile(`./results/${fileName}`, csv);
    console.info(`Write file ${fileName}`);
    console.timeEnd("Write");
  }
}

export default WriteCsvService;
