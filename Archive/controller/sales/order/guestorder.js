const moment = require('moment-timezone');
const order = require('../../../models/sales/order');
const ordercustomer = require('../../../models/user/ordercustomer');
const { invoiceID, orderId } = require('../../../common/common');
const statuscreate = require('../../../models/sales/orderstatus');
const transectioncreate = require('../../../models/sales/transection');
const register = require('../../../models/user/customer');
exports.guestOrderData = async (req, res, next) => {
  const invoice_id = [];
  const invoicecount = await order.findOne().sort({ _id: -1 });
  const ordercount = await order.findOne().sort({ _id: -1 });
  const ref = await transectioncreate.findOne().sort({ _id: -1 });
  let i = 0;
  let j = 0;
  const order_count_value = ordercount != null ? ordercount.order : orderId(0);
  const invoice_count_value = invoiceID(
    invoicecount != null ? invoicecount.invoice.split('/')[3] : 0
  );
  const ref_count_value =
    ref != null ? parseInt(ref.refid) + parseInt(1) : Date.now().toString();

  const {
    name,
    email,
    mobile,
    usertype,
    payment,
    billing,
    shipping,
    city,
    state,
    country,
    pincode,
    invoicedata,
    totalamount,
    orderstatus,
    paymentstatus,
    transection,
    lasttime,
  } = req.body;

  if (payment == 'paytm') {
    const countemail = await register.countDocuments({ email: email });
    const countmobile = await register.countDocuments({ mobile: mobile });
    if (countemail == 0 && countmobile == 0) {
      try {
        const customer_data = {};

        customer_data.name = name;
        customer_data.email = email;
        customer_data.mobile = mobile;
        customer_data.usertype = usertype;
        customer_data.payment = payment;
        customer_data.billing = billing;
        customer_data.shipping = shipping;
        customer_data.city = city;
        customer_data.state = state;
        customer_data.country = country;
        customer_data.pincode = pincode;
        customer_data.deliverdate = lasttime;
        const customer = await ordercustomer.create(customer_data);
        const order_data = [];

        const transection_data = await transectioncreate.create({
          refid: ref_count_value,
          paymentgatway: 'paytm',
          totaldebitamount: totalamount,
          paymentstatus: 'unpaid',
          trxstatus: 'pending',
          date: moment
            .tz(Date.now(), 'Asia/Kolkata')
            .format('DD/MM/YYYY HH:mm:ss'),
        });
        for (const {
          productid,
          unitprice,
          taxamout,
          deliver,
          tax,
          quantity,
          totalamount,
          varient1,
          varient2,
          varient3,
        } of invoicedata) {
          const data = {
            orderdate: moment
              .tz(Date.now(), 'Asia/Kolkata')
              .format('DD/MM/YYYY HH:mm:ss'),
            refid: transection_data._id,
            customerid: customer._id,
            order: parseInt(order_count_value) + parseInt(++i),
            invoice: `${invoice_count_value.split('/')[0]}/${
              invoice_count_value.split('/')[1]
            }/${invoice_count_value.split('/')[2]}/000${
              parseInt(invoice_count_value.split('/')[3]) + parseInt(++j)
            }`,
            productid: productid,
            unitprice: unitprice,
            quantity: parseInt(quantity),
            tax: tax,
            taxamout: taxamout,
            deliver: deliver,
            totalamount: totalamount,
            varient1: varient1,
            varient2: varient2,
            varient3: varient3,
          };
          order_data.push(data);
        }

        const order_fainal_data = await order.insertMany(order_data);

        for (const { _id: id } of order_fainal_data) {
          invoice_id.push(id);
        }
        for (let k = 0; k < order_fainal_data.length; k++) {
          const status_data = await statuscreate.create({
            name: orderstatus,
            currentstatus: 'Your Order has been Placed',
            statusdata: moment
              .tz(Date.now(), 'Asia/Kolkata')
              .format('DD/MM/YYYY HH:mm:ss'),
            description: [
              {
                name: orderstatus,
                lastupdatetime: moment
                  .tz(Date.now(), 'Asia/Kolkata')
                  .format('DD/MM/YYYY HH:mm:ss'),
                description: 'Your Order has been Placed',
              },
            ],
          });
          await order.findByIdAndUpdate(
            { _id: order_fainal_data[k]._id },
            { orderstatusdescription: status_data._id }
          );
        }

        await ordercustomer.findByIdAndUpdate(
          {
            _id: customer._id,
          },
          {
            orderid: invoice_id,
            transection: transection_data._id,
          }
        );

        res.status(200).json({
          success: true,
          refid: transection_data.refid,
        });
      } catch (err) {
        res.status(400).json({
          success: false,
          message: "data doesn't transfer",
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: 'email or mobile number already register',
      });
    }
  } else if (req.body.payment == 'rozorpay') {
    try {
      const customer_data = {};
      customer_data.name = name;
      customer_data.email = email;
      customer_data.mobile = mobile;
      customer_data.usertype = usertype;
      customer_data.payment = payment;
      customer_data.billing = billing;
      customer_data.shipping = shipping;
      customer_data.city = city;
      customer_data.state = state;
      customer_data.country = country;
      customer_data.pincode = pincode;
      customer_data.deliverdate = lasttime;
      const customer = await ordercustomer.create(customer_data);

      const order_data = [];
      transection.date = moment
        .tz(Date.now(), 'Asia/Kolkata')
        .format('DD/MM/YYYY HH:mm:ss');
      const transection_data = await transectioncreate.create(transection);

      for (const {
        productid,
        unitprice,
        taxamout,
        deliver,
        tax,
        quantity,
        totalamount,
        varient1,
        varient2,
        varient3,
      } of invoicedata) {
        const data = {
          orderdate: moment
            .tz(Date.now(), 'Asia/Kolkata')
            .format('DD/MM/YYYY HH:mm:ss'),
          refid: transection_data._id,
          customerid: customer._id,
          order: parseInt(order_count_value) + parseInt(++i),
          invoice: `${invoice_count_value.split('/')[0]}/${
            invoice_count_value.split('/')[1]
          }/${invoice_count_value.split('/')[2]}/000${
            parseInt(invoice_count_value.split('/')[3]) + parseInt(++j)
          }`,
          productid: productid,
          unitprice: unitprice,
          quantity: parseInt(quantity),
          tax: tax,
          taxamout: taxamout,
          deliver: deliver,
          totalamount: totalamount,
          varient1: varient1,
          varient2: varient2,
          varient3: varient3,
        };
        order_data.push(data);
      }

      const order_fainal_data = await order.insertMany(order_data);

      for (const { _id: id } of order_fainal_data) {
        invoice_id.push(id);
      }
      for (let k = 0; k < order_fainal_data.length; k++) {
        const status_data = await statuscreate.create({
          name: orderstatus,
          currentstatus: 'Your Order has been Placed',
          statusdata: moment
            .tz(Date.now(), 'Asia/Kolkata')
            .format('DD/MM/YYYY HH:mm:ss'),
          description: [
            {
              name: orderstatus,
              lastupdatetime: moment
                .tz(Date.now(), 'Asia/Kolkata')
                .format('DD/MM/YYYY HH:mm:ss'),
              description: 'Your Order has been Placed',
            },
          ],
        });
        await order.findByIdAndUpdate(
          { _id: order_fainal_data[k]._id },
          { orderstatusdescription: status_data._id }
        );
      }

      await ordercustomer.findByIdAndUpdate(
        {
          _id: customer._id,
        },
        {
          orderid: invoice_id,
          transection: transection_data._id,
        }
      );

      res.status(200).json({
        success: true,
        refid: transection_data.refid,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: "data doesn't transfer",
      });
    }
  } else if (req.body.payment == 'payumoney') {
    try {
      const customer_data = {};
      customer_data.name = name;
      customer_data.email = email;
      customer_data.mobile = mobile;
      customer_data.usertype = usertype;
      customer_data.payment = payment;
      customer_data.billing = billing;
      customer_data.shipping = shipping;
      customer_data.city = city;
      customer_data.state = state;
      customer_data.country = country;
      customer_data.pincode = pincode;
      customer_data.deliverdate = lasttime;
      const customer = await ordercustomer.create(customer_data);
      const order_data = [];
      transection.date = moment
        .tz(Date.now(), 'Asia/Kolkata')
        .format('DD/MM/YYYY HH:mm:ss');
      const transection_data = await transectioncreate.create(transection);
      for (const {
        productid,
        unitprice,
        taxamout,
        deliver,
        tax,
        quantity,
        totalamount,
        varient1,
        varient2,
        varient3,
      } of invoicedata) {
        const data = {
          orderdate: moment
            .tz(Date.now(), 'Asia/Kolkata')
            .format('DD/MM/YYYY HH:mm:ss'),
          refid: transection_data._id,
          customerid: customer._id,
          order: parseInt(order_count_value) + parseInt(++i),
          invoice: `${invoice_count_value.split('/')[0]}/${
            invoice_count_value.split('/')[1]
          }/${invoice_count_value.split('/')[2]}/000${
            parseInt(invoice_count_value.split('/')[3]) + parseInt(++j)
          }`,
          productid: productid,
          unitprice: unitprice,
          quantity: parseInt(quantity),
          tax: tax,
          taxamout: taxamout,
          deliver: deliver,
          totalamount: totalamount,
          varient1: varient1,
          varient2: varient2,
          varient3: varient3,
        };
        order_data.push(data);
      }

      const order_fainal_data = await order.insertMany(order_data);

      for (const { _id: id } of order_fainal_data) {
        invoice_id.push(id);
      }
      for (let k = 0; k < order_fainal_data.length; k++) {
        await order.findByIdAndUpdate(
          { _id: order_fainal_data[k]._id },
          { orderstatusdescription: status_data._id }
        );
      }

      await ordercustomer.findByIdAndUpdate(
        {
          _id: customer._id,
        },
        {
          orderid: invoice_id,
          transection: transection_data._id,
        }
      );

      res.status(200).json({
        success: true,
        refid: transection_data.refid,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: "data doesn't transfer",
      });
    }
  } else {
    try {
      const countemail = await register.countDocuments({ email: email });
      const countmobile = await register.countDocuments({ mobile: mobile });
      if (countemail == 0 && countmobile == 0) {
        const customer_data = {};
        customer_data.name = name;
        customer_data.email = email;
        customer_data.mobile = mobile;
        customer_data.usertype = usertype;
        customer_data.payment = payment;
        customer_data.billing = billing;
        customer_data.shipping = shipping;
        customer_data.city = city;
        customer_data.state = state;
        customer_data.country = country;
        customer_data.pincode = pincode;
        customer_data.deliverdate = lasttime;
        const customer = await ordercustomer.create(customer_data);
        const order_data = [];

        const transection_data = await transectioncreate.create({
          date: moment
            .tz(Date.now(), 'Asia/Kolkata')
            .format('DD/MM/YYYY HH:mm:ss'),
          refid: ref_count_value,
          paymentgatway: 'COD',
          totaldebitamount: totalamount,
          paymentstatus: 'unpaid',
          trxstatus: 'pending',
        });
        console.log(invoicedata);

        for (const {
          productid,
          unitprice,
          taxamout,
          deliver,
          tax,
          quantity,
          totalamount,
          varient1,
          varient2,
          varient3,
        } of invoicedata) {
          const data = {
            orderdate: moment
              .tz(Date.now(), 'Asia/Kolkata')
              .format('DD/MM/YYYY HH:mm:ss'),
            refid: transection_data._id,
            customerid: customer._id,
            order: parseInt(order_count_value) + parseInt(++i),
            invoice: `${invoice_count_value.split('/')[0]}/${
              invoice_count_value.split('/')[1]
            }/${invoice_count_value.split('/')[2]}/000${
              parseInt(invoice_count_value.split('/')[3]) + parseInt(++j)
            }`,
            productid: productid,
            unitprice: unitprice,
            quantity: parseInt(quantity),
            tax: tax,
            taxamout: taxamout,
            deliver: deliver,
            totalamount: totalamount,
            varient1: varient1,
            varient2: varient2,
            varient3: varient3,
          };
          order_data.push(data);
        }

        const order_fainal_data = await order.insertMany(order_data);

        for (const { _id: id } of order_fainal_data) {
          invoice_id.push(id);
        }
        for (let k = 0; k < order_fainal_data.length; k++) {
          const status_data = await statuscreate.create({
            name: orderstatus,
            currentstatus: 'Your Order has been Placed',
            statusdata: moment
              .tz(Date.now(), 'Asia/Kolkata')
              .format('DD/MM/YYYY HH:mm:ss'),
            description: [
              {
                name: orderstatus,
                lastupdatetime: moment
                  .tz(Date.now(), 'Asia/Kolkata')
                  .format('DD/MM/YYYY HH:mm:ss'),
                description: 'Your Order has been Placed',
              },
            ],
          });
          await order.findByIdAndUpdate(
            { _id: order_fainal_data[k]._id },
            { orderstatusdescription: status_data._id }
          );
        }

        await ordercustomer.findByIdAndUpdate(
          {
            _id: customer._id,
          },
          {
            orderid: invoice_id,
            transection: transection_data._id,
            payentstatus: 'unpaid',
          }
        );

        res.status(200).json({
          success: true,
          refid: transection_data.refid,
        });
      } else {
        res.status(400).json({
          success: false,
          message: 'email or mobile number already register',
        });
      }
    } catch (err) {
      console.log(err);
      res.status(400).json({
        success: false,
        message: "data doesn't transfer",
      });
    }
  }
};
