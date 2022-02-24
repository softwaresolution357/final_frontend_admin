const expree = require('express');
const {admin_auth} =  require('../../middleware/auth');
const { register, admin,SuperUser,UserList,SingleData,ForgotPassword,UpdatePassword,SingleUpdateUser,AdminEmail,AdminMobile,ChangePassword,EditProfile } = require('../../controller/auth/auth');
const user = expree.Router();

user.post('/', admin);
user.post('/register', register);
user.get('/email',AdminEmail)
user.get('/mobile',AdminMobile)
user.get('/superuser',SuperUser);
user.get('/userlist',UserList);
user.post('/forgotpassword',ForgotPassword);
user.post('/updatepassword',admin_auth,UpdatePassword);
user.post('/change-password',admin_auth,ChangePassword);
user.put('/edit-profile',admin_auth,EditProfile);
user.route('/:id').get(SingleData).post(SingleUpdateUser)
module.exports = user;
