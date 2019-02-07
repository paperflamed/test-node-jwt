import { Router } from 'express';
import { verifyToken } from "../helpers/jwtToken";
import validate from '../helpers/validate';
import {
    getUser,
    register,
    logout,
    login,
    loginSchema,
    registerSchema
} from "../controllers/auth";

const routes = Router();

routes.route('/register').post(validate(registerSchema), register);
routes.route('/login').get(validate(loginSchema), login);
routes.route('/logout').get(verifyToken, logout);
routes.route('/info').get(verifyToken, getUser);

module.exports = routes;