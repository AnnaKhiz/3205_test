const path = require('path');
const express = require('express')
const app = express();
const router = express.Router();
const PORT = 3000;
const {readFile} = require('./database')
const history = require('connect-history-api-fallback');

app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});


router.post('/', async (req, res, next) => {

  const { email, number } = req.body
  console.log(email, number)

  const data = readFile();
  const result = JSON.parse(data)

  try {
    const user = result.filter(el => el.email === email || el.number === number)
    res.send( { "result" : user } )
  } catch (error) {
    res.send({ "result" : "Users not found" })
  }

})

const jsonBodyParser = express.json();
app.use(jsonBodyParser);


app.use('/users', router);

const staticFileMiddleware = express.static(path.join(__dirname, '../dist'));
app.use(staticFileMiddleware);

app.use(history());
app.use(staticFileMiddleware);
