import jsend from 'jsend';
import express from 'express';
import { ProductModel } from '../database/Models';

const router = express.Router();

// Get all the products
router.get('/', async (req, res) => {
  try {
    const products = await ProductModel.find({});
    res.send(jsend.success(products));
  } catch (err) {
    res.status(500).send(jsend.error({ code: 500, message: err.message }));
    console.error('[PRODUCTS] Error: ', err.message);
  }
});

// Get one product by id
router.get('/:id', async (req, res) => {
  try {
    const product = await ProductModel.find({ _id: req.params.id });
    res.send(jsend.success(product));
  } catch (err) {
    res.status(500).send(jsend.error({ code: 500, message: err.message }));
    console.error('[PRODUCTS] Error: ', err.message);
  }
});

// Create a new product
router.post('/', async (req, res) => {
  const { title, vendor, price } = req.body;
  if (!title || !price || (!vendor && typeof vendor !== Object)) {
    return res
      .status(400)
      .send(jsend.fail('لطفا اطلاعات محصول را صحیح وارد کنید.'));
  }

  try {
    const product = new ProductModel(req.body);
    await product.save();

    res.status(201).send(jsend.success(product));
  } catch (err) {
    res.status(500).send(jsend.error({ code: 500, message: err.message }));
    console.error('[PRODUCTS] Error: ', err.message);
  }
});

// Delete one product by id
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await ProductModel.findOneAndDelete({
      _id: req.params.id,
    });

    res.send(jsend.success(deletedProduct));
  } catch (err) {
    res.status(500).send(jsend.error({ code: 500, message: err.message }));
    console.error('[PRODUCTS] Error: ', err.message);
  }
});

// Update one product by id
router.patch('/:id', async (req, res) => {
  const updates = Object.keys(req.body);

  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product)
      res.status(404).send(jsend.fail('هیچ محصولی با این شناسه یافت نشد!'));

    updates.forEach((update) => (product[update] = req.body[update]));

    await product.save();

    res.send(jsend.success(product));
  } catch (err) {
    res.status(500).send(jsend.error({ code: 500, message: err.message }));
    console.error('[PRODUCTS] Error: ', err.message);
  }
});

export default router;
