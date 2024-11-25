const express = require('express');
const app = express();
const PORT = 3000;
const containerData = require('./container.json');
const cors = require('cors');

app.use(cors());
app.get('/api/container', (req, res) => {
  res.json(containerData);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
