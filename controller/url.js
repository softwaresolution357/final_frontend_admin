if (process.env.NODE_ENV == 'development') {
  exports.frontendurl = `http://localhost:3000/resetpassword`;
} else {
  exports.frontendurl = `http://www.mylitekart.com/resetpassword`;
}
if (process.env.NODE_ENV == 'development') {
  exports.backendurl = `http://localhost:3000/updatepassword`;
} else {
  exports.backendurl = `http://dashboard.mylitekart.com/updatepassword`;
}
