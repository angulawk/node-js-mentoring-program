const fs = require('fs');
const csv = require('csvtojson');

const stream = fs.createWriteStream('output.txt', {
  flags: 'a' // 'a' means appending (old data will be preserved)
})

csv()
  .fromStream(fs.createReadStream('./csv/node_mentoring_t1_2_input_example.csv'))
  .then(function(json) {
    json.map(function(line) {
      stream.write("{ 'book': " + line.Book + ", 'author': "  + line.Author + ", 'price': " + line.Price + " } \r\n")
    })
  })
  .catch(function(err) {
    console.log("Error " + err);
  });
