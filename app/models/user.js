import mongoose from "../../config/db";
import { compareSync, genSalt, hash } from 'bcrypt';

const SALT_WORK_FACTOR = 11;

export const encryptPassword = (password) => new Promise((resolve, reject) => {
    genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) {
            return reject(err);
        }
        hash(password, salt, (errHash, hash) => {
            if (errHash) {
                return reject(errHash);
            }
            resolve(hash);
        });
    });
});

export const UserSchema = new mongoose.Schema({
    "email": {
        type: String,
        index: { unique: true }
    },
    "updated_at": Date,
    "created_at": {
        type: Date,
        default: Date.now
    },
    "password": String,
}, {
    versionKey: false
});

UserSchema.pre('save', async function (next) {
    const user = this;
    user.updatedAt = Date.now;
    if (user.isModified('password')) {
        user.password = await encryptPassword(user.password);
    }

    return next();
});

UserSchema.methods.checkPassword = function (password) {
    return compareSync(password, this.password);
};

UserSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        return {
            email: ret.email,
            id: ret._id
        };
    }
});

export const DB_MODEL_USER = 'User';

/**
 * @typedef {Model} User
 * @property {String} email
 * @property {String} id
 */
export default mongoose.db.model(DB_MODEL_USER, UserSchema);
