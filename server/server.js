const path = require('path');
const express = require('express');
const app = express();
// const router = express.Router();
const PORT = 3000;
const history = require('connect-history-api-fallback');
const {  router : usersRouter } = require('./routes/usersRouter')
app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});

const jsonBodyParser = express.json();
app.use(jsonBodyParser);

app.use('/users', usersRouter);

const staticFileMiddleware = express.static(path.join(__dirname, '../dist'));
app.use(staticFileMiddleware);

app.use(history());
app.use(staticFileMiddleware);
