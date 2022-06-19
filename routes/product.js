const express = require('express');

const router = express.Router();

const { getProducts } = require("../controllers/getProducts");
const { postProducts } = require("../controllers/postProducts");
const { updateProducts } = require("../controllers/updateProducts");
const { deleteProducts } = require("../controllers/deleteProducts");



router.get('/', getProducts);
router.post('/', postProducts);
router.put('/', updateProducts);
router.delete('/', deleteProducts);

module.exports = router;