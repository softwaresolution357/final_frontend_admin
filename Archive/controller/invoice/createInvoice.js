const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

exports.createInvoice = async (path, customer, transection, symbole) => {
  let doc = await new PDFDocument({ size: 'A4', margin: 50 });
  generateHeader(doc);
  generateCustomerInformation(doc, customer, transection);
  generateInvoiceTable(doc, invoice, transection);
  generateFooter(doc);

  doc.pipe(fs.createWriteStream(path));
  doc.end();
};

function generateHeader(doc) {
  doc
    .image(path.join(__dirname, '../../public/logo.png'), 50, 45, { width: 50 })
    .fillColor('#444444')
    .fontSize(20)
    .text('myLitekart Pvt. Ltd.', 110, 57)
    .fontSize(10)
    .text('myLitekart Pvt. Ltd.', 200, 50, { align: 'right' })
    .text('Spectrume', 200, 65, { align: 'right' })
    .text('Berhampur, Ganjam, 760001', 200, 80, { align: 'right' })
    .moveDown();
}

function generateCustomerInformation(doc, customer, transection) {
  doc.fillColor('#444444').fontSize(20).text('Invoice', 50, 160);

  generateHr(doc, 185);

  const customerInformationTop = 200;

  doc
    .fontSize(10)
    .text('Ref Id:', 50, customerInformationTop)
    .font('Helvetica-Bold')
    .text(transection.refid, 150, customerInformationTop)
    .font('Helvetica')
    .text('Transection Date:', 50, customerInformationTop + 15)
    .text(transection.date, 150, customerInformationTop + 15)

    .font('Helvetica-Bold')
    .text('Billing Address', 250, customerInformationTop)
    .text(customer.name, 250, customerInformationTop + 15)
    .font('Helvetica')
    .text(customer.billing, 250, customerInformationTop + 30)
    .text(
      customer.city + ', ' + customer.state + ', ' + customer.country,
      250,
      customerInformationTop + 45
    )
    .font('Helvetica-Bold')
    .text('Shipping Address', 400, customerInformationTop)
    .text(customer.name, 400, customerInformationTop + 15)
    .font('Helvetica')
    .text(customer.shipping, 400, customerInformationTop + 30)
    .text(
      customer.city + ', ' + customer.state + ', ' + customer.country,
      400,
      customerInformationTop + 45
    )
    .moveDown();

  generateHr(doc, 255);
}

function generateInvoiceTable(doc, invoice) {
  let i;
  const invoiceTableTop = 330;

  doc.font('Helvetica-Bold');
  generateTableRow(
    doc,
    invoiceTableTop,
    'SL. No.',
    'Item',
    'Unit',
    'Deli.',
    'Qty',
    'Tax',
    'Tax Amount',
    'Line Total'
  );
  generateHr(doc, invoiceTableTop + 20);
  doc.font('Helvetica');

  for (i = 0; i < invoice.length; i++) {
    const item = invoice[i];
    const position = invoiceTableTop + (i + 1) * 30;
    generateTableRow(
      doc,
      position,
      i + 1,
      item.productid.name,
      item.unitprice,
      item.quantity,
      item.deliver,
      item.tax,
      item.taxamout,
      item.totalamount
    );

    generateHr(doc, position + 20);
  }

  // const subtotalPosition = invoiceTableTop + (i + 1) * 30;
  // generateTableRow(
  //   doc,
  //   subtotalPosition,
  //   '',
  //   '',
  //   'Subtotal',
  //   '',
  //   formatCurrency(invoice.subtotal)
  // );

  // const paidToDatePosition = subtotalPosition + 20;
  // generateTableRow(
  //   doc,
  //   paidToDatePosition,
  //   '',
  //   '',
  //   'Paid To Date',
  //   '',
  //   formatCurrency(invoice.paid)
  // );

  // const duePosition = paidToDatePosition + 25;
  // doc.font('Helvetica-Bold');
  // generateTableRow(
  //   doc,
  //   duePosition,
  //   '',
  //   '',
  //   '',
  //   '',
  //   'Balance Due',
  //   '',
  //   formatCurrency(invoice.subtotal - invoice.paid)
  // );
  doc.font('Helvetica');
}

function generateFooter(doc) {
  doc.fontSize(10).text('invoice copy of myLitekart Pvt. Ltd.', 50, 780, {
    align: 'center',
    width: 500,
  });
}

function generateTableRow(
  doc,
  y,
  SL,
  item,
  unitCost,
  quantity,
  tax,
  taxamount,
  lineTotal
) {
  doc
    .fontSize(5)
    .text(SL, 50, y)
    .text(item, 70, y)
    .text(unitCost, 200, y)
    .text(quantity, 300, y, { align: 'center' })
    .text(tax, 330, y)
    .text(tax, 370, y)
    .text(taxamount, 400, y)
    .text(lineTotal, 0, y, { align: 'right' });
}

function generateHr(doc, y) {
  doc.strokeColor('#aaaaaa').lineWidth(1).moveTo(50, y).lineTo(550, y).stroke();
}
