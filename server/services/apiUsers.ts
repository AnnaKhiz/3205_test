import { Request, Response } from 'express';
import readFile from "../database";

interface User {
  email: string;
  number: string;
}
export const getUsers = async function (req: Request, res: Response): Promise<void> {
  const body = await req.body;

  const { email, number } = body;

  const data: string = await readFile();
  const result: Array<User> = await JSON.parse(data);

  let userSearch: Array<User> = [];

  try {
    userSearch = result.filter(el => el.email === email && el.number === number);

    if (!userSearch.length) {
      userSearch = result.filter(el => el.email === email);
    }

    setTimeout((): void => {
      res.send( { "result" : userSearch } )
    }, 5000)

  } catch (error) {
    res.send({ "result" : `Catch error: ${error}` })
  }
}
