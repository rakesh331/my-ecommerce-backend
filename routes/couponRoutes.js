const express = require('express');
const Coupon = require('../models/Coupon');
const { validateCoupon } = require('../validators/couponValidator'); // Import the validation function

const router = express.Router();

// Add a new coupon
router.post('/', async (req, res) => {
  const { error } = validateCoupon(req.body); // Validate the incoming data
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const { code, discount, expirationDate } = req.body;
    const newCoupon = new Coupon({ code, discount, expirationDate });
    await newCoupon.save();
    res.status(201).json(newCoupon);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a coupon
router.put('/:id', async (req, res) => {
  const { error } = validateCoupon(req.body); // Validate the incoming data
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const { code, discount, expirationDate } = req.body;
    const updatedCoupon = await Coupon.findByIdAndUpdate(
      req.params.id,
      { code, discount, expirationDate },
      { new: true }
    );
    if (!updatedCoupon) return res.status(404).json({ message: 'Coupon not found' });
    res.status(200).json(updatedCoupon);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all coupons
router.get('/', async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.status(200).json(coupons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a coupon
router.delete('/:id', async (req, res) => {
  try {
    const deletedCoupon = await Coupon.findByIdAndDelete(req.params.id);
    if (!deletedCoupon) return res.status(404).json({ message: 'Coupon not found' });
    res.status(200).json({ message: 'Coupon deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
