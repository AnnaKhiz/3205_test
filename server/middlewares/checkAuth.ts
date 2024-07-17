import { Request, Response, NextFunction } from 'express';

export const checkEmail = function (req: Request, res: Response, next: NextFunction):  void | Response<object> {
  const { email } = req.body;

  if (!email || email.trim().replace(' ', '') === '') {
    return res.status(400).send({ "result": "Empty email field" });
  }

  const pattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!pattern.test(email)) {
    return res.status(400).send({ "result": "Wrong email format" });
  }

  next();
}

export const checkNumber = function (req: Request, res: Response, next: NextFunction):  void | Response<object> {
  const { number } = req.body;

  if (!number || number.trim().replace(' ', '') === '') {
    req.body.number = '';
    return next();
  }

  const pattern: RegExp = /^[0-9]*$/;

  if (!pattern.test(number)) {
    return res.status(400).send({ "result": "Wrong number format" });
  }

  next();
}
