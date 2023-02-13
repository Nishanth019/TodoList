const express = require('express');
const redis = require('redis');

const client = redis.createClient();
const app = express();

app.use(express.json());

app.post('/create', (req, res) => {
  const { id, data } = req.body;
  client.hset('data', id, data, (err) => {
    if (err) {
      return res.status(500).send({ error: 'Failed to insert data into Redis' });
    }
    return res.send({ message: 'Data inserted successfully' });
  });
});

app.get('/read', (req, res) => {
  client.hgetall('data', (err, data) => {
    if (err) {
      return res.status(500).send({ error: 'Failed to retrieve data from Redis' });
    }
    return res.send({ data });
  });
});

app.delete('/delete-all', (req, res) => {
  client.del('data', (err) => {
    if (err) {
      return res.status(500).send({ error: 'Failed to clear the Redis database' });
    }
    return res.send({ message: 'Redis database cleared successfully' });
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
