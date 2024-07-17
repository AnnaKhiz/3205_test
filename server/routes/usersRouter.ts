import { getUsers } from "../services/apiUsers";
import { Router } from 'express';

import express from 'express';
const router: Router = express.Router();
import { checkEmail, checkNumber } from "../middlewares/checkAuth";

router.post('/', checkEmail, checkNumber, getUsers);

export default router


