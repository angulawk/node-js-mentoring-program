import fs from 'fs';
import csv from 'csvtojson';

const stream = fs.createWriteStream('output.txt', {
  flags: 'a' // 'a' means appending (old data will be preserved)
})

const createTxtFile = async () => {
  try {
    const json = await csv().fromStream(fs.createReadStream('./csv/node_mentoring_t1_2_input_example.csv'));
  
    json.map(({ Book, Author, Price }) => {
      stream.write(`{ 'book': ${Book}, 'author': ${Author}, 'price': ${Price} } \r\n`)
    });
  } catch(err) {
    console.log(`Error ${err}`);
  }
}

createTxtFile();
