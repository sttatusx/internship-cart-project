import jsend from 'jsend';
import express from 'express';
import { VendorModel } from '../database/Models';

const router = express.Router();

// Get all the vendors
router.get('/', async (req, res) => {
  try {
    const vendors = await VendorModel.find({});
    res.send(jsend.success(vendors));
  } catch (err) {
    res.status(500).send(jsend.error({ code: 500, message: err.message }));
    console.error('[VENDORS] Error: ', err.message);
  }
});

// Get one vendor by id
router.get('/:id', async (req, res) => {
  try {
    const vendor = await VendorModel.find({ _id: req.params.id });
    res.send(jsend.success(vendor));
  } catch (err) {
    res.status(500).send(jsend.error({ code: 500, message: err.message }));
    console.error('[VENDORS] Error: ', err.message);
  }
});

// Create a new vendor
router.post('/', async (req, res) => {
  const { name, owner, products } = req.body;
  if (!name || !owner) {
    return res
      .status(400)
      .send(jsend.fail('لطفا اطلاعات غرفه را صحیح وارد کنید.'));
  }

  try {
    const vendor = new VendorModel(req.body);
    await vendor.save();

    res.status(201).send(jsend.success(vendor));
  } catch (err) {
    res.status(500).send(jsend.error({ code: 500, message: err.message }));
    console.error('[VENDORS] Error: ', err.message);
  }
});

// Delete one vendor by id
router.delete('/:id', async (req, res) => {
  try {
    const deletedVendor = await VendorModel.findOneAndDelete({
      _id: req.params.id,
    });

    res.send(jsend.success(deletedVendor));
  } catch (err) {
    res.status(500).send(jsend.error({ code: 500, message: err.message }));
    console.error('[VENDORS] Error: ', err.message);
  }
});

// Update one vendor by id
router.patch('/:id', async (req, res) => {
  const updates = Object.keys(req.body);

  try {
    const vendor = await VendorModel.findById(req.params.id);
    if (!vendor)
      res.status(404).send(jsend.fail('هیچ غرفه‌ای با این شناسه یافت نشد!'));

    updates.forEach((update) => (vendor[update] = req.body[update]));

    await vendor.save();

    res.send(jsend.success(vendor));
  } catch (err) {
    res.status(500).send(jsend.error({ code: 500, message: err.message }));
    console.error('[VENDORS] Error: ', err.message);
  }
});

export default router;
