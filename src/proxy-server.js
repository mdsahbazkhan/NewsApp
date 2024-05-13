const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 5000; // Choose any available port

app.use(express.json());

app.get('/news', async (req, res) => {
  const { country, category, page, pageSize } = req.query;
  const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=5da05e24dbc24853a09845c9472d81be&page=${page}&pageSize=${pageSize}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
});
