import jsend from 'jsend';
import express from 'express';
import { UserModel, ProductModel } from '../database/Models';

const router = express.Router();

// Get all the users
router.get('/', async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.send(jsend.success(users));
  } catch (err) {
    res.status(500).send(jsend.error({ code: 500, message: err.message }));
    console.error('[USERS] Error: ', err.message);
  }
});

// Get one user by id
router.get('/:id', async (req, res) => {
  try {
    const users = await UserModel.find({ _id: req.params.id });
    res.send(jsend.success(users));
  } catch (err) {
    res.status(500).send(jsend.error({ code: 500, message: err.message }));
    console.error('[USERS] Error: ', err.message);
  }
});

// Create a new user
router.post('/', async (req, res) => {
  const { name, email, password, cart } = req.body;
  if (!name || !email || !password || !cart) {
    return res
      .status(400)
      .send(jsend.fail('لطفا اطلاعات کاربر را صحیح وارد کنید.'));
  }

  // Check if the user already exists
  if ((await UserModel.find({ email })).length) {
    return res
      .status(400)
      .send(jsend.fail('کاربری با این ایمیل از قبل وجود دارد.'));
  }

  try {
    const user = new UserModel({ name, email, password, cart });
    await user.save();

    res.status(201).send(jsend.success(user));
  } catch (err) {
    res.status(500).send(jsend.error({ code: 500, message: err.message }));
    console.error('[USERS] Error: ', err.message);
  }
});

// Delete one user by id
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await UserModel.findOneAndDelete({
      _id: req.params.id,
    });

    res.send(jsend.success(deletedUser));
  } catch (err) {
    res.status(500).send(jsend.error({ code: 500, message: err.message }));
    console.error('[USERS] Error: ', err.message);
  }
});

// Update one user by id
router.patch('/:id', async (req, res) => {
  const updates = Object.keys(req.body);

  try {
    const user = (await UserModel.findById(req.params.id)) || {};
    if (!user)
      res.status(404).send(jsend.fail('هیچ کاربری با این شناسه یافت نشد!'));

    updates.forEach((update) => (user[update] = req.body[update]));

    await user.save();

    res.send(jsend.success(user));
  } catch (err) {
    res.status(500).send(jsend.error({ code: 500, message: err.message }));
    console.error('[USERS] Error: ', err.message);
  }
});

// Add product to cart
router.patch('/:id/assign', async (req, res) => {
  const { productId } = req.body;
  if (!productId || !req.params.id) {
    return res
      .status(400)
      .send(jsend.fail('اطلاعات وارد شده صحیح یا کامل نیست.'));
  }

  try {
    // Check if the user already exists
    const user = await UserModel.findById(req.params.id);
    const product = await ProductModel.findById(productId);

    if (!user || !product) {
      return res
        .status(400)
        .send(jsend.fail('کاربر یا محصولی با این شناسه وجود ندارد.'));
    }

    // Add product to cart!
    user.cart.push(product)
    
    await user.save()

    res.send(jsend.success(user));
  } catch (err) {
    res.status(500).send(jsend.error({ code: 500, message: err.message }));
    console.error('[USERS] Error: ', err.message);
  }
});

// Delete product from cart
router.patch('/:id/reject', async (req, res) => {
  const { productId } = req.body;
  if (!productId || !req.params.id) {
    return res
      .status(400)
      .send(jsend.fail('اطلاعات وارد شده صحیح یا کامل نیست.'));
  }

  try {
    // Check if the user already exists
    const user = await UserModel.findById(req.params.id);
    const product = await ProductModel.findById(productId);

    if (!user || !product) {
      return res
        .status(400)
        .send(jsend.fail('کاربر یا محصولی با این شناسه وجود ندارد.'));
    }

    // Remove product from cart!
    const productIndex = user.cart.findIndex((product) => product._id === productId)
    user.cart.splice(productIndex, 1)
    
    await user.save()

    res.send(jsend.success(user));
  } catch (err) {
    res.status(500).send(jsend.error({ code: 500, message: err.message }));
    console.error('[USERS] Error: ', err.message);
  }
});

export default router;
