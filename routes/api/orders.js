const router = require('express').Router();
const middelwares = require('../middlewares');
const { check, validationResult } = require('express-validator');
const { Order } = require('../../dbConfg');

// GET - Obtain all the orders
router.get('/', middelwares.isAdmin, middelwares.checkToken, async (req, res) => {
    console.log(req.usuarioId);
    const orders = await Order.findAll();
    res.status(200).json(orders);
});

// GET - Obtain an order
router.get('/:orderId', middelwares.isAdmin, middelwares.checkToken,  async (req, res) => {
    const order = await Order.findOne({ where: { id: req.params.orderId } });
    res.status(200).json(order);
});

// POST - Make an Order
router.post('/', middelwares.checkToken, 
        [check('order_description', 'You have to add a product to your order').not().isEmpty(),
        check('payment_method', 'You have to insert payment method').not().isEmpty(), 
        check('order_amount', 'You have to insert the amount').not().isEmpty()],
        async (req, res) => {
            
            const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errores: errors.array() })
         }

        const order = await Order.create(req.body);
        res.status(200).json(order);
})

// PUT - Edit an order
router.put('/:orderId', middelwares.isAdmin, middelwares.checkToken, async (req, res) => {
    await Order.update(req.body, {
        where: { id: req.params.orderId}
    })
    res.status(200).json({ success: 'The order was edited successfully.' })
})

// DELETE - Delete an order
router.delete('/:orderId', middelwares.isAdmin, middelwares.checkToken, async (req, res) => {
    await Order.destroy({
        where: {id: req.params.orderId}
    });
    res.status(200).json({success: 'The order was deleted successfully.'})
})


module.exports = router;
