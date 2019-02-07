import mongoose from 'mongoose';
import {config} from 'dotenv';

config();

mongoose.Promise = Promise;

mongoose.db = mongoose.createConnection(process.env.DB_URI);

export default mongoose;
