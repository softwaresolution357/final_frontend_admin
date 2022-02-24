const cancelrefundreplace = require('../../models/catlog/cancel_refund_replace');
exports.CancelDetails = async (req, res, next) => {
  const cancelData = await cancelrefundreplace.find().populate({
    path: 'orderid',
    model: 'order',
    select: 'name',
    populate: [
      { path: 'refid', model: 'transection' },
      { path: 'customerid', model: 'ordercustomer' },
      { path: 'productid', model: 'products' },
      { path: 'orderstatusdescription', model: 'orderstatus' },
    ],
  });
  for (const {
    cancelby: cancelby,
    orderid: orderid,
    ordertype: ordertype,
    reason: reason,
    description: description,
    lastupdatetime: lastupdatetime,
  } of cancelData) {
    const data = {
      cancelby: cancelby,
    };
  }
};
