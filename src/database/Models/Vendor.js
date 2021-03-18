import { Schema, model } from 'mongoose';

const vendorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  owner: {
    type: Object,
    required: true,
  },

  products: {
    type: Array,
    default: [],
  },
});

vendorSchema.methods.toJSON = function () {
  if (!this.products.length) return { ...this._doc, totalPrice: 0 };

  const prices = this.products.map((product) => product.prices);
  this.totalPrice = prices.reduce((acc, currentValue) => acc + currentValue);

  return this._doc;
};

export default model('Vendor', vendorSchema);
