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
  let words = fs.readFileSync(path.join(__dirname, `./../books/${bookname}.json`));
  words = JSON.parse(words.toString());

  const Word = sequelize.define('word', {
    id:   {type: Sequelize.INTEGER, primaryKey: true, autoIncrement:true},
    str:   Sequelize.STRING,
    freq:  Sequelize.INTEGER
  });

  const wordsTable = [];
  for (let word in words) {
    wordsTable.push({str: word, freq: words[word]});
  }

  const options = {force:true, logging:false};
  Word.sync(options);
  Word.bulkCreate(wordsTable)
      .then( () => console.log('TABLE CREATED'))
      .catch( err => console.log('INSERTION ERROR',err));
}

function createTwoWordsTable() {

}
