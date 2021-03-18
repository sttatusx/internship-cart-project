import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  stock: {
    type: Number,
    default: 1,
  },

  price: {
    type: String,
    required: true,
  },

  primaryPrice: {
    type: String,
    required: false,
  },

  photo: {
    type: Object,
    default: {},
  },

  vendor: {
    type: Object,
    required: true,
  },
});

export default model('Product', productSchema);
