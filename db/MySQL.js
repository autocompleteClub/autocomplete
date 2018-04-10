const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');

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


const sequelize = new Sequelize('postgres://mpzdklzq:g7t5RgD332oGuHsSBJbgmDmnvjuz3Zc5@stampy.db.elephantsql.com:5432/mpzdklzq');
sequelize.authenticate()
         .then(() => {console.log('Connection has been established successfully.');})
         .catch(err => {console.error('Unable to connect to the database:');});

const Word = sequelize.define('word', {
  id:   {type: Sequelize.INTEGER, primaryKey: true, autoIncrement:true},
  str:   Sequelize.STRING,
  freq:  Sequelize.INTEGER
});

const options = {force:true, logging:false};
const newWord = {
  str: 'great',
  freq: 1
}
const wordsArr = Object.keys(words);
wordsArr.forEach((word) => {
  const newWord = {
    str: word,
    freq: words[word]
  }
  Word.sync(options)
      .then( () => Word.create(newWord))
      .catch( err => console.log('INSERTION ERROR',err));
})
