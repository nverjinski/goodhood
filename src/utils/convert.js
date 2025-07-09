import csvToJson from "convert-csv-to-json";

const input = "../datasets/gun_violence_2024.csv";
const output = "../datasets/gun_violence_2024.json";

csvToJson
  .fieldDelimiter(",")
  .supportQuotedField(true)
  .formatValueByType()
  .generateJsonFileFromCsv(input, output);
