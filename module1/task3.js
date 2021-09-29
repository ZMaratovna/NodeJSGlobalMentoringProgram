import fs from 'fs';
import csv from 'csvtojson';

import paths from './constants';

const writeStream = fs.createWriteStream(paths.BASE_CSV_TEXT2);

fs.createReadStream(paths.BASE_CSV_PATH)
    .pipe(csv())
    .on('data', (data) => writeStream.write(data))
    .on('error', console.log)