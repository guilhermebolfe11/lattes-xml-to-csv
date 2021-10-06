import env from "./config/env";
import GetInformationService from "./service/GetInformationService";
import ReadXMLService from "./service/ReadXMLService";
import WriteCsvService from "./service/WriteCsvService";
import XmlToJsonService from "./service/XmlToJsonService";

const main = async () => {
  try {
    console.info("Start Lattes Xml to CSV");
    console.time("Lattes Xml To Csv");

    let readXMLService = new ReadXMLService();
    let files = await readXMLService.executeAsync();

    let xmlToJsonService = new XmlToJsonService();
    let researchers = xmlToJsonService.execute(files);

    let getInformationService = new GetInformationService();
    let rows = getInformationService.execute(researchers);

    let writeCsvService = new WriteCsvService();
    await writeCsvService.executeAsync(rows);

    console.timeEnd("Lattes Xml To Csv");
    console.info("End Lattes Xml to CSV");
  } catch (error) {
    if (error instanceof Error)
      console.error(env.NODE_ENV === "development" ? error : error.message);
    else console.error(error);
  }
};

main();
