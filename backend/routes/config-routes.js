const {Router} = require("express");

const configRouter = new Router();

// @desc   Get paypal secrete clientID
// @route  GET /api/config/paypal
// @access Public
configRouter.get("/paypal", (req, res) => {
    return res.send(process.env.PAY_PAL_SECRET);
});


module.exports = configRouter;
