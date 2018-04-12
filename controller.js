const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://mpzdklzq:g7t5RgD332oGuHsSBJbgmDmnvjuz3Zc5@stampy.db.elephantsql.com:5432/mpzdklzq');

sequelize.authenticate()
         .then(() => {console.log('Connection has been established successfully.');})
         .catch(err => {console.error('Unable to connect to the database:');});

const Word = sequelize.define('word', {
  id:   {type: Sequelize.INTEGER, primaryKey: true, autoIncrement:true},
  str:   Sequelize.STRING,
  freq:  Sequelize.INTEGER
});

const controller = {}

let cache;

controller.getWords = (req, res) => {
	console.log('in getWords')
	let input = req.body.word;

	if (!cache){
		
		Word.findAll().then(words => {
			cache = {};
			words.forEach((word)=>{
				
				if (cache[word.dataValues.str[0]]) 
					cache[word.dataValues.str[0]].push({str:word.dataValues.str, freq:word.dataValues.freq});
				else 
					cache[word.dataValues.str[0]] = [{str:word.dataValues.str, freq:word.dataValues.freq}];

			})
			return cache
		}).then(cache => res.send(cache))
		
	}
	else res.send(cache)
}


module.exports = controller;