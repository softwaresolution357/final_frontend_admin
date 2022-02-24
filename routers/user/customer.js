const express = require('express');
const { update } = require('../../middleware/auth');
const { admin_auth, } = require('../../middleware/auth');
const {
  registerUser,
  login,
  updateWishList,
  updateCartList,
  updatecartremovewishlist,
  removeCartItem,
  removeWishListItem,
  updateNewsletter,
  changepassword,
  updateProfile,
  updateAddress,
  updateAddressStatus,
  editingbillingshipping,
  ResetYourPassword,
  ForgotPassword,
  AddAddress,
  EditAddress,
  editCustomerAddress,
} = require('../../controller/user/customeruser');
const {
  getGuestCustomer,
  getRegisteruser,
  singlegetGuestCustomer,
  singlegetRegisteruser
} = require('../../controller/user/userlist');
const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(login);
router.put('/forgotpassword', update, ForgotPassword);
router.route('/resetyourpassword').post(ResetYourPassword);
router.route('/guestuser').get(admin_auth,getGuestCustomer);
router.route('/guestuser/:id').get(admin_auth,singlegetGuestCustomer);
router.route('/registeruser').get(admin_auth,getRegisteruser);
router.route('/registeruser/:id').get(admin_auth,singlegetRegisteruser);
router.post('/wishlist', update, updateWishList);
router.post('/cartlist', update, updateCartList);
router.post('/addaddress', update, AddAddress);
router.get('/editaddress/:id', update, EditAddress);
router.post('/addtocartremovewishlist', update, updatecartremovewishlist);
router.post('/editcustomeraddress/:id', update, editCustomerAddress);
router.post('/removefromcart', update, removeCartItem);
router.post('/removefromwishlist', update, removeWishListItem);
router.post('/newsletter', update, updateNewsletter);
router.post('/changepassword', update, changepassword);
router.post('/updateprofile', update, updateProfile);
router.post('/updateaddress', update, updateAddress);
router.post('/updatestatus', update, updateAddressStatus);
router.put('/editingbillingshipping/:id', update, editingbillingshipping);
module.exports = router;
