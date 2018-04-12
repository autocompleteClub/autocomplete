const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const controller = require('./controller');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json())

app.post('/words', controller.getWords);

app.listen(port, () => console.log(`Listening on port ${port}`));


//(req, res) => {
//   res.send({ express: 'server says "make america great again"' });
// }