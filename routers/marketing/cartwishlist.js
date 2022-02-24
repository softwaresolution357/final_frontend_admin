const app = require('express');
const { admin_auth, } = require('../../middleware/auth');
const router = app.Router();
const { getCartWishlist } = require('../../controller/marketing/cartwishlist');
router.route('/').get(getCartWishlist);

module.exports = router;
