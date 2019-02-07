import Joi from "joi";
import {HttpUnprocessableEntityError} from "./errors";

export const reduceDetails = (errors, detail) => {
  const { path, type, message, context } = detail;
  errors[path] = { type, message, ...context };

  return errors;
};

export const validator = (schema) => {
  return (req, res, next) => {
    if (!schema) {
      return next();
    }
    const value = Object.assign({}, req.query, req.body, req.params);
    return Joi.validate(value, schema, (err) => {
      if (err) {
        const errors = Array.from(err.details).reduce(reduceDetails, {});
        next(new HttpUnprocessableEntityError(err.message, errors));
      }
      next();
    });
  };
};

export default validator;

