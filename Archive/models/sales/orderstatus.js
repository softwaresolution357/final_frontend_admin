const mongoose = require('mongoose');

const orderStatus = new mongoose.Schema({
  name: {
    type: String,
  },
  currentstatus: {
    type: String,
  },
  statusdata: {
    type: String,
  },
  lastupdatetime: {
    type: String,
  },
  deliverdate: {
    type: String,
  },
  description: [
    {
      name: {
        type: String,
      },
      lastupdatetime: {
        type: String,
      },
      description: {
        type: String,
      },
    },
  ],
  createDate: { type: Date, default: Date.now() },
});

module.exports = mongoose.model('orderstatus', orderStatus);
