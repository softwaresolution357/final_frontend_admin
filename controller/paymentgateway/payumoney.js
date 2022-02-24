
var jsSHA = require('jssha');

exports.payUmoney = async (req, res, next) => {
 console.log(req.body)
    var pd = req.body;
          var hashString =
            'kK86GBbE' + // Merchant Key
            '|' +
            pd.txnid +
            '|' +
            pd.amount +
            '|' +
            pd.productinfo +
            '|' +
            pd.firstname +
            '|' +
            pd.email +
            '||||||'+
            pd.mobile +'|||||' +
            'W1r8MOfCAk'; // Your salt value
          var sha = new jsSHA('SHA-512', 'TEXT');
          sha.update(hashString);
          var hash = sha.getHash('HEX');
          res.status(200).json({
            success: true,
            key: 'kK86GBbE',
            txnid: pd.txnid, 
            hash: hash,
          });
        }
  
   

