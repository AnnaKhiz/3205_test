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

  // let timeoutId = null;
  let userSearch = []

  try {
    const userByEmail = result.filter(el => el.email === email);

    if (!userByEmail.length) {
      userSearch = []
    } else {
      const user = userByEmail.filter(el => el.number === number);

      if (!user.length) {
        userSearch = userByEmail
      } else {
        userSearch = user
      }


    }

    setTimeout(() => {
      res.send( { "result" : userSearch } )
    }, 5000)

  } catch (error) {
    res.send({ "result" : `Catch error: ${error}` })
  }


  // try {
  //   const user = result.filter(el => el.email === email && el.number === number)
  //   setTimeout(() => {
  //     res.send( { "result" : user } )
  //   }, 5000)
  // } catch (error) {
  //   res.send({ "result" : `Catch error: ${error}` })
  // }

  // clearTimeout(timeoutId)

})

const jsonBodyParser = express.json();
app.use(jsonBodyParser);


app.use('/users', router);

const staticFileMiddleware = express.static(path.join(__dirname, '../dist'));
app.use(staticFileMiddleware);

app.use(history());
app.use(staticFileMiddleware);
