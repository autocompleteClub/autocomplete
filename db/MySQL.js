const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');

const sequelize = new Sequelize('postgres://mpzdklzq:g7t5RgD332oGuHsSBJbgmDmnvjuz3Zc5@stampy.db.elephantsql.com:5432/mpzdklzq');
sequelize.authenticate()
         .then(() => {
           console.log('Connection has been established successfully.');
           // createOneWordTable();
           // createTwoWordsTable();
          })
         .catch(err => {console.error('Unable to connect to the database:');});


function createOneWordTable() {
  let bookname = 'the_hunger_games'; //mockingjay, the_hunger_games
  let words_1 = fs.readFileSync(path.join(__dirname, `./../books/${bookname}.json`));
  bookname = 'mockingjay';
  let words_2 = fs.readFileSync(path.join(__dirname, `./../books/${bookname}.json`));
  words_1 = JSON.parse(words_1.toString());
  words_2 = JSON.parse(words_2.toString());
  const words = words_1;
  for (let word in words_2) {
    if (words[word]) words[word] += words_2[word];
    else words[word] = words_2[word];
  }
  
  const Word = sequelize.define('word', {
    id:   {type: Sequelize.INTEGER, primaryKey: true, autoIncrement:true},
    str:   Sequelize.STRING,
    freq:  Sequelize.INTEGER
  });
  const options = {force:true, logging:false};
  const wordsArr = Object.keys(words);
  const wordsTable = [];
  wordsArr.forEach((word) => {
    wordsTable.push({str: word, freq: words[word]});
  })

  Word.sync(options);
  Word.bulkCreate(wordsTable)
      .then( () => console.log('TABLE CREATED'))
      .catch( err => console.log('INSERTION ERROR',err));
}

function createTwoWordsTable() {

}
