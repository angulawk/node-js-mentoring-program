import fs from 'fs';
import csv from 'csvtojson';
import { pipeline } from 'stream';

const readStream = fs.createReadStream('./csv/node_mentoring_t1_2_input_example.csv');
const writeStream = fs.createWriteStream('output.txt');

pipeline(
  readStream.pipe(
    csv({
      ignoreColumns: /(Amount)/
    })
  ),
  writeStream,
  err => err ? console.error(err) : console.log('Done!')
);
