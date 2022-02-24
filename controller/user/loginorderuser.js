const invNum = require('invoice-number');
const path = require('path');
const orders = require('../../models/sales/order');
const ordercustomer = require('../../models/user/ordercustomer');
const invoice = require('../../models/sales/invoice');
const { createInvoice } = require('../invoice/createInvoice');
const register = require('../../models/user/customer');
const address = require('../../models/user/address');
exports.loginOrderUser = async (req, res, next) => {
  if (req.id != 0) {
    const {
      pincode,
      state,
      city,
      country,
      usertype,
      billing,
      shipping,
      order,
    } = req.body;
    const data = {};
    const registercustomerdata = {};
    const orderdata = [];
    const invoicedata = [];
    const count = await invoice.countDocuments();
    const countinvoice = parseInt(1) + parseInt(count);
    const year = new Date();

    const month = year.getMonth() + 1;

    const invoicedate =
      year.getFullYear() + '/' + month + '/' + 'ABC00' + countinvoice;
    const userdata = await register.findById({ _id: req.id });
    if (!userdata) {
      res.status(400).json({
        success: false,
        message: "you are n't a valid user",
      });
    }
    data.name = userdata.name;
    data.mobile = userdata.mobile;
    data.email = userdata.email;
    data.order = order;
    data.invoice = invNum.InvoiceNumber.next(invoicedate);
    data.pincode = pincode;
    data.state = state;
    data.city = city;
    data.country = country;
    data.usertype = 'register';
    data.billing = billing;
    data.shipping = shipping;
    const addressdata = await address.create({
      billing: data.billing,
      shipping: data.shipping,
      addressid: req.id,
    });

    const findaddress = await register.findOne({ _id: req.id });

    const updateaddressdata = {};
    // const updateaddressvalue = [];
    console.log(findaddress.address.length);
    if (findaddress.address.length != 0) {
      findaddress.address.push(addressdata.id);
      updateaddressdata.address = findaddress.address;
      updateaddressdata.order = findaddress.order;
    } else {
      const updateaddressvalue = [];

      updateaddressvalue.push(addressdata.id);
      updateaddressdata.address = updateaddressvalue;
    }

    await register.findOneAndUpdate(req.id, updateaddressdata, {
      new: true,
    });
    const customer = await ordercustomer.create(data);
    if (!customer) {
      res.status(400).json({
        sucess: false,
        message: "Order can't placed",
      });
    }
    for (let i = 0; i < req.body.orderdata.length; i++) {
      const ordervalue = {};
      ordervalue.customerid = req.id;
      ordervalue.procuctid = req.body.orderdata[i].id;
      ordervalue.prductname = req.body.orderdata[i].name;
      ordervalue.order = req.body.orderdata[i].order;
      // ordervalue.orderdate = req.body.orderdata[i].date;
      ordervalue.payment = req.body.orderdata[i].payment;
      ordervalue.amount = req.body.orderdata[i].amount;
      orderdata.push(ordervalue);
    }
    const orderfainaldata = await orders.insertMany(orderdata);
    if (!orderfainaldata) {
      res.status(400).json({
        sucess: false,
        message: "Order can't placed",
      });
    }
    for (let i = 0; i < req.body.invoicedata.length; i++) {
      const invoicevlaue = {};
      invoicevlaue.order = orderfainaldata[i].order;
      invoicevlaue.ordercustomer = req.id;
      invoicevlaue.productname = req.body.invoicedata[i].name;
      invoicevlaue.invoicenumber = invNum.InvoiceNumber.next(invoicedate);
      invoicevlaue.unitprice = req.body.invoicedata[i].unitprice;
      invoicevlaue.taxamout = req.body.invoicedata[i].taxamout;
      invoicevlaue.quantity = req.body.invoicedata[i].quantity;
      invoicevlaue.deliver = req.body.invoicedata[i].deliver;
      invoicevlaue.deliver = req.body.invoicedata[i].delivertex;
      invoicevlaue.tax = req.body.invoicedata[i].tax;
      invoicedata.push(invoicevlaue);
    }
    const invoicefainaldata = await invoice.insertMany(invoicedata);
    if (!invoicefainaldata) {
      res.status(400).json({
        sucess: false,
        message: "Order can't placed",
      });
    }
    const filepath = path.join(__dirname, 'invoice', order + '.pdf');
    if (invoicefainaldata) {
      generateInVoice(customer, invoicefainaldata, orderfainaldata, filepath);
    }
    res.status(202).json({
      success: true,
      customer: customer,
      invoice: invoicedate,
      order: orderfainaldata,
    });
  } else {
    res.status(400).json({
      success: false,
      message: "you are n't a valid user ",
    });
  }
};
const generateInVoice = (
  customer,
  invoicefainaldata,
  orderfainaldata,
  filepath
) => {
  const items = [];
  const invoice = {
    shipping: {
      name: customer.name,
      address: customer.shipping,
      city: customer.city,
      state: customer.state,
      country: customer.country,
      postal_code: customer.pincode,
    },
    items: items,
    subtotal: 8000,
    paid: 0,
    invoice_nr: 1234,
  };

  createInvoice(invoice, filepath);
};
