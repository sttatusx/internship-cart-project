import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  address: {
    type: [Object],
    default: [],
  },

  cart: {
    type: [Object],
    default: [],
  },
});

userSchema.pre('save', async function (next) {
  try {
    // this refers to the user
    this.password = await bcrypt.hash(this.password, 8);
  } catch (err) {
    console.error('[Bcrypt] Error: ', err.message);
  }

  next();
});

userSchema.methods.toJSON = function () {
  this._doc.password = undefined;
  return this._doc;
};

export default model('User', userSchema);
