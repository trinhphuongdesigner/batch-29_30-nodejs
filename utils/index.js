const fs = require('fs');

// Add data to last of exist file or create new
const appendFile = (name = 'file.txt', content = '') => {
  fs.appendFile(name, content, function (err) {
    if (err) throw err;
    console.log('Success!');
  });
}

// Override exits file or create new
const writeFile = (name = 'file.txt', content = '') => {
  fs.writeFile(name, content, function (err) {
    if (err) throw err;
    console.log('Success!');
  });
}

const writeFileSync = (fileName, data) => {
  fs.writeFileSync(fileName, JSON.stringify(data), function (err) {
    if (err) {
      console.log('««««« err »»»»»', err);

      throw err
    };
    console.log('Saved!');
  });
}

const generationID = () => Math.floor(Date.now());

module.exports = {
  generationID,
  writeFileSync,
}