const fs = require('fs');
const csv = require('csvtojson');

const paths = require('./constants');
const writeStream = fs.createWriteStream(paths.BASE_CSV_TEXT1);

fs.createReadStream(paths.BASE_CSV_PATH)
  .pipe(csv())
  .on('data', (data) => writeStream.write(data))
  .on('error', (msg) => console.log(msg))