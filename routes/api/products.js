const router = require('express').Router();
const middelwares = require('../middlewares');
const { check, validationResult } = require('express-validator');
const { Product } = require('../../dbConfg');

// GET - Obtain all the products
router.get('/', async (req, res) => {
    console.log(req.usuarioId);
    const products = await Product.findAll();
    res.status(200).json(products);
});

// GET - Obtain a product
router.get('/:productId', async (req, res) => {
    const product = await Product.findOne({ where: { id: req.params.productId } });
    res.status(200).json(product);
});

// POST - Add a product
router.post('/', middelwares.isAdmin, middelwares.checkToken,
        [check('product_name', 'The name of the product cannot be empty').not().isEmpty(),
        check('product_price', 'The price cannot be empty').not().isEmpty()],
        async (req, res) => {

            const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errores: errors.array() })
         }
    const product = await Product.create(req.body);
     res.status(200).json(product);
})

// PUT - Edit a product
router.put('/:productId', middelwares.isAdmin, middelwares.checkToken, async (req, res) => {
    await Product.update(req.body, {
        where: { id: req.params.productId}
    })
    res.status(200).json({ success: 'The product was edited successfully' })
})


// DELETE - Delete a product
router.delete('/:productId', middelwares.isAdmin, middelwares.checkToken, async (req, res) => {
    await Product.destroy({  where: {id: req.params.productId}});
    res.status(200).json({success: 'The product was deleted successfully'})
})

module.exports = router;
