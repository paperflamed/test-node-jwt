import Joi from 'joi';
import userProvider from '../providers/user';
import { OK, UNAUTHORIZED } from 'http-status';
import { compareSync } from 'bcrypt';
import { HttpNotFoundError } from "../helpers/errors";
import { createToken } from "../helpers/jwtToken";

export const registerSchema = {
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
};

export const loginSchema = {
    email: Joi.string().required(),
    password: Joi.string().required()
};

export const login = async (req, res, next) => {
    try {
        const user = await userProvider.findOne({ email: req.query.email });
        if (!user) {
            return next(new HttpNotFoundError());
        }
        const passwordIsValid = compareSync(req.query.password, user.password);
        if (!passwordIsValid) {
            return res.status(UNAUTHORIZED).json({ auth: false, token: null });
        }
        return res.status(OK).json({ auth: true, token: createToken({ id: user._id }) });
    } catch (e) {
        return next(e);
    }
};

export const logout = async (req, res, next) => {
    try {
        return res.status(OK).json({ auth: false, token: null });
    } catch (e) {
        return next(e);
    }
};

export const register = async (req, res, next) => {
    try {
        const user = await userProvider.create({
            email: req.body.email,
            password: req.body.password
        });
        return res.status(OK).json({ auth: true, token: createToken({ id: user._id }) });
    } catch (e) {
        return next(e);
    }
};

export const getUser = async (req, res, next) => {
    try {
        const user = await userProvider.byPrimaryKey(req.userId);
        return res.status(OK).json(user);
    } catch (e) {
        return next(e);
    }
};