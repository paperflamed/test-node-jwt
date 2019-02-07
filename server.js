import express from 'express';
import bodyParser from 'body-parser';
import routes from'./app/routes/index';
import { HttpBadRequestError } from './app/helpers/errors';
const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use('/', routes);

// Catch 404 and forward to error handler
app.use((req, res, next) => next(new HttpBadRequestError()));

// Error handler
app.use((err, req, res, next) => {
    const { status, code, message, details } = err;
    console.error(err);
    res.status(status || 500).json({ code, message, details });
});

app.listen(port, () => {
});