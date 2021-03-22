const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

require('dotenv').config();

const { API_KEY } = process.env;

app.use(cors());
app.use(
  '/',
  express.static('./dist', {
    index: 'index.html',
  }),
);

app.get('/api', (req, res) => {
  res.json({
    API_KEY,
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
