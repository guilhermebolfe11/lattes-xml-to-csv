import { load } from "ts-dotenv";

const env = load({
  NODE_ENV: {
    default: "development",
    type: ["production" as const, "development" as const],
  },
  INPUT_PATH: {
    default: "./inputs",
    type: String,
  },
  OUTPUT_PATH: {
    default: "./outputs",
    type: String,
  },
  FILE_NAME: {
    default: "results.csv",
    type: String,
  },
});

export default env;
