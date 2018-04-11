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
      .then( () => console.log('WORDS TABLE CREATED'))
      .catch( err => console.log('WORD INSERTION ERROR',err));
}

function createTwoWordsTable() {
  let bookname = 'the_hunger_games'; //mockingjay, the_hunger_games
  let words = fs.readFileSync(path.join(__dirname, `./../books/${bookname}.json`));
  words = JSON.parse(words.toString());
  let phrases = fs.readFileSync(path.join(__dirname, `./../books/phrases.json`));
  phrases = JSON.parse(phrases.toString());
  const wordID = {};
  let idx = 1;
  for (let word in words) {
    wordID[word] = idx;
    idx++;
  }

  const Phrase = sequelize.define('phrase', {
    id1:   {type: Sequelize.INTEGER, primaryKey: true},
    id2:   {type: Sequelize.INTEGER, primaryKey: true},
    str:   Sequelize.STRING,
    freq:  Sequelize.INTEGER
  });

  const phrasesTable = []
  for (let phrase in phrases) {
    const word1 = phrase.split(' ')[0];
    const word2 = phrase.split(' ')[1];
    const idx1 = wordID[word1];
    const idx2 = wordID[word2];
    phrasesTable.push({
      id1:   idx1,
      id2:   idx2,
      str:   phrase,
      freq:  phrases[phrase]
    })
  }

  const options = {force:true, logging:false};
  Phrase.sync(options);
  Phrase.bulkCreate(phrasesTable)
        .then( () => console.log('PHRASES TABLE CREATED'))
        .catch( err => console.log('PHRASE INSERTION ERROR',err));
}
