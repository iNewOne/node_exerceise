// 引入路由中间件
const Router = require('koa-router');
let userRouter = new Router();
let userController = require('../Controllers/user');
require('../models/db');
userRouter
    .get('/user/register', userController.showRegister)
    .post('/user/check-username', userController.checkUsername)
    .post('/user/do-register', userController.doRegister)
    .post('/user/do-login', userController.doLogin)
    .get('/user/get-pic', userController.getPic)
    .get('/user/logout', userController.logout)
    .get('/user/login', async ctx => {
        // let { req } = ctx;
        // let host = req.connect.remoteAddress ||
        //     req.socket.remoteAddress ||
        //     req.connect.socket.remoteAddress;
        ctx.render('login', {
            host: '127.0.0.1:8888'
        });
    });


module.exports = userRouter;
