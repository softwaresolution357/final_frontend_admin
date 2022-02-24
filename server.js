// Third  Party Library
const cors = require('cors');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
var device = require('express-device');
const ejs = require('ejs');
const colors = require('colors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const morgaon = require('morgan');
const fileupload = require('express-fileupload');
const errorHandler = require('./middleware/error');
// const cookiesMiddleware = require('universal-cookie-express');
const category = require('./routers/catlog/category');
const adminuser = require('./routers/auth/auth');
const brands = require('./routers/catlog/brand');
const products = require('./routers/catlog/products');
const customer = require('./routers/user/customer');
const gallery = require('./routers/gallery/gallery');
const pincodefileupload = require('./routers/system/pincode');
const service = require('./routers/cms/service');
const blog = require('./routers/cms/blog');
const informantionpage = require('./routers/cms/information');
const home = require('./routers/cms/home');
const productReview = require('./routers/user/productreview');
const order = require('./routers/sales/order');
const currency = require('./routers/system/currency');
// const informantionpage = require('./routers/system/informantion');
const integration = require('./routers/system/integration');
const invoice = require('./routers/sales/invoice');
const general = require('./routers/system/general');
const payment = require('./routers/system/payment');
const cartwishlist = require('./routers/marketing/cartwishlist');
const subscription = require('./routers/marketing/subscription');
const newsletter = require('./routers/marketing/newsletter');
const coupouns = require('./routers/marketing/coupouns');
const sms = require('./routers/marketing/sms');
const contactus = require('./routers/marketing/contactus');
const sizes = require('./routers/catlog/sizes');
const reviews = require('./routers/catlog/reviews');
const addcolors = require('./routers/catlog/colors');
const newproducts = require('./routers/cms/newproduct');
const payUmoney = require('./routers/paymentygatway/payUmoney');
const rozorpay = require('./routers/paymentygatway/rozorpay');
const paytm = require('./routers/paymentygatway/paytm');
const transection = require('./routers/sales/transection');
const status = require('./routers/catlog/status');
const homepage = require('./routers/frontpage/home');
const uploadfile = require('./routers/catlog/fileupload');
const frontend = require('./routers/frontend');
const cancel = require('./routers/sales/cancel');
const adminfrontend = require('./routers/adminfrontend');
const report= require('./routers/report/report')
const usercount= require('./routers/cms/usercount')
const test = require('./routers/test')
const megamenu=  require('./routers/cms/megamenu')
const blogmenu=  require('./routers/cms/blogmenu')
const blogreview = require('./routers/cms/blogreview')
// App Configuration file
const app = express();
app.use(cookieParser());
dotenv.config({ path: './config/config.env' });

const PORT = process.env.PORT || 5000;
const MongoDb = require('./config/db');

if (process.env.NODE_ENV === 'development') {
  app.use(morgaon('dev'));
}
//dababase Connection

MongoDb();
app.use(cors());
app.use(express.json());
app.use(fileupload());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(device.capture());
 
device.enableViewRouting(app);
app.use(express.static(path.join(__dirname, '/public')));
// Router Configuration
app.use('/api/v1/category', category);
app.use('/api/v1/admin', adminuser);
app.use('/api/v1/brand', brands);
app.use('/api/v1/product', products);
app.use('/api/v1/gallery', gallery);
app.use('/api/v1/customer', customer);
app.use('/api/v1/pincode', pincodefileupload);
app.use('/api/v1/review', productReview);
app.use('/api/v1/order', order);
app.use('/api/v1/currency', currency);
app.use('/api/v1/transection', transection);
app.use('/api/v1/integration', integration);
app.use('/api/v1/invoice', invoice);
app.use('/api/v1/general', general);
app.use('/api/v1/payment', payment);
app.use('/api/v1/colors', addcolors);
app.use('/api/v1/subscription', subscription);
app.use('/api/v1/newsletter', newsletter);
app.use('/api/v1/coupouns', coupouns);
app.use('/api/v1/sms', sms);
app.use('/api/v1/contactus', contactus);
app.use('/api/v1/service', service);
app.use('/api/v1/blog', blog);
app.use('/api/v1/information', informantionpage);
app.use('/api/v1/home', home);
app.use('/api/v1/reviews', reviews);
app.use('/api/v1/cartwishlist', cartwishlist);
app.use('/api/v1/newproducts', newproducts);
app.use('/api/v1/sizes', sizes);
app.use('/api/v1/payumoney', payUmoney);
app.use('/api/v1/rozorpay', rozorpay);
app.use('/api/v1/paytm', paytm);
app.use('/api/v1/status', status);
app.use('/api/v1/homepage', homepage);
app.use('/api/v1/uploadfile', uploadfile);
app.use('/api/v1/frontend', frontend);
app.use('/api/v1/adminfrontend', adminfrontend);
app.use('/api/v1/cancel', cancel);
app.use('/api/v1/report',report)
app.use('/api/v1/usercount',usercount)
app.use('/api/v1/megamenu',megamenu)
app.use('/api/v1/blogmenu',blogmenu)
app.use('/api/v1/blogreview',blogreview)
app.use('/test',test)
app.use(errorHandler);

//Server Configuration

const server = app.listen(PORT, () => {
  console.log(`Server is running ${PORT}`.yellow.bold);
});

//Handel unhandeled request
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  server.close(() => {
    process.exit(1);
  });
});
