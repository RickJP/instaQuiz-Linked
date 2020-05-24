processFile = () => {
  getData((quiz, questionsCount) => {
    writeData(quiz , questionsCount);
    importIntoMongo();
  });
}

writeData = (quiz, questionsCount) => {
  const fileToWrite = 'questionsImported.txt'
  const fileLocation = require('path').join(__dirname, `../data/${fileToWrite}`);

  const writeStream = require('fs').createWriteStream(fileLocation)
  writeStream.write(quiz);
  writeStream.on('finish', () => {
    console.log(`Saved ${questionsCount} questions in file: ${fileToWrite}`)
  })
  writeStream.end();
}

getData = (cb) => {
  const fileName = 'questionsToImport.tsv';
  const fileLocation = require('path').join(__dirname, `../data/${fileName}`);
  const delimeter = '\t';
  const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(fileLocation),
  });
  
  let quiz = [];
  let lineCount = 0;
  let headers = [];
  let items = [];
  
  lineReader.on('error', function(err) {
    res.end('Error occurred: ' + err);
  });

  
  lineReader.on('line', line => {
    
    if (lineCount === 0) {
      console.log(`Converting TSV to JSON with : ${fileLocation}`);
      headers = line.split(delimeter);
    } else {
      items = line.split(delimeter);
      obj = {};
      headers.map((header, i) => {
        obj = Object.assign(obj, {[header]: items[i]});
      });
      quiz.push(obj);
    }
    lineCount++;
  });
  lineReader.on('close', () => {
    cb(JSON.stringify(quiz), lineCount);
  });
}


importIntoMongo = () => {
  const {exec} = require('child_process');

  const config = require("../config/key");
  const col = 'InstaQuiz-questions';

  const fileToWrite = 'questionsImported.txt'
  const fileLocation = require('path').join(__dirname, `../data/${fileToWrite}`);
  // const mongoImportCmd = `mongoimport --uri mongodb+srv://${user}:${pw}@${cluster}${db}?w=majority -c ${col} --file ${fileLocation} --jsonArray`;
  const mongoImportCmd = `mongoimport --uri ${config.mongoURI} -c ${col} --file ${fileLocation} --jsonArray`;
  console.log('MONGO IMPORT CMD'+mongoImportCmd)

  exec(mongoImportCmd, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
};
module.exports = {processFile};
