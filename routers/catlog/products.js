const express = require('express');
const { update } = require('../../middleware/auth');
const {
  postProducts,
  dropdown,
  getPrduct,
  updateStatus,
  singleProduct,
  postSingleProduct,
  InlineProductediting,
  codupdateStatus,
  deletedProducts,
} = require('../../controller/catlog/produts');
const { admin_auth, } = require('../../middleware/auth');
const {
  home,
  product,
  Brands,
  Fotters,
  Information,
  Contact,
  ListAddress,
  ProfileData,
} = require('../../controller/home');
const {
  frontendsingleProduct,
  relatedPrduct,
  BuyNow,
} = require('../../controller/singleproduct');
const {
  LestSticky,
  CollectionProduct,
  CollectionInformation,
} = require('../../controller/fainalcollection');
const { commonDataFetch } = require('../../controller/commondatafetch');
const { CartDataFetch } = require('../../controller/cartdatafetch');
const { WishDataFetch } = require('../../controller/wishdatafetch');
const router = express.Router();

router.route('/').get(getPrduct).post(postProducts);

router.get('/dropdown', dropdown);
router.get('/home', home);
router.get('/home/leststicky', LestSticky);
router.get('/home/listaddress', update, ListAddress);
router.get('/home/profiledata', update, ProfileData);
router.get('/home/brands', Brands);
router.get('/home/fotters', Fotters);
router.get('/home/collectioninformation/:type/:slug', CollectionInformation);
router.get('/home/product/:product', product);
router.get('/home/information/:slug', Information);
router.get('/home/contact', Contact);
router.get('/singleproduct/:slug', frontendsingleProduct);
router.get('/singleproduct/relatedproduct/:category', relatedPrduct);
router.get('/collection/:slug', CollectionProduct);
router.get('/commondatafetch', commonDataFetch);
router.get('/cartdatafetch', CartDataFetch);
router.get('/wishdatafetch', WishDataFetch);
router.get('/fetcbuynowproduct/buynow', BuyNow);

router
  .route('/:id')
  .get(singleProduct)
  .put(postSingleProduct)
  .delete(deletedProducts);
router.put('/inlineediting/:id', InlineProductediting);
router.put('/statusupdate/:id', updateStatus);
router.put('/codupdate/:id', codupdateStatus);

module.exports = router;
