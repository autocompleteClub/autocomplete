const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

app.get('/api/hello', (req, res) => {
  res.send({ express: 'server says "make america great again"' });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
