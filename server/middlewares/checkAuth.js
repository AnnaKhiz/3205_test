function checkEmail(req, res, next) {
  const { email } = req.body;

  if (!email || email.trim().replace(' ', '') === '') {
    return res.status(400).send({ "result": "Empty email field" });
  }

  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!pattern.test(email)) {
    return res.status(400).send({ "result": "Wrong email format" });
  }

  next();
}

function checkNumber(req, res, next) {
  const { number } = req.body;

  if (!number || number.trim().replace(' ', '') === '') {
    req.body.number = '';
    return next();
  }

  const pattern = /^[0-9]*$/;

  if (!pattern.test(number)) {
    return res.status(400).send({ "result": "Wrong number format" });
  }

  next();
}

module.exports = { checkEmail, checkNumber }
