const { readFile } = require("../database");

async function getUsers(req, res) {
  const { email, number } = req.body;

  const data = await readFile();
  const result = await JSON.parse(data);

  let userSearch = [];

  try {
    userSearch = result.filter(el => el.email === email && el.number === number);

    if (!userSearch.length) {
      userSearch = result.filter(el => el.email === email);
    }

    setTimeout(() => {
      res.send( { "result" : userSearch } )
    }, 5000)

  } catch (error) {
    res.send({ "result" : `Catch error: ${error}` })
  }
}

module.exports = {
  getUsers
}
