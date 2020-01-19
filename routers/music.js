const Router = require('koa-router');
const musicController = require('../Controllers/music');
let musicRouter = new Router();

musicRouter
    // 添加的请求行为在restful中，更好的请求规则
    // 要求添加 => post
    .get('/music/add', async ctx => {
        ctx.render('add');
    })
    .get('/music/edit', musicController.showEdit)
    .get('/music/index', musicController.showIndex)
    .post('/music/add-music', musicController.addMusic)
    .put('/music/update-music', musicController.updateMusic)
    .delete('/music/del-music', musicController.deleteMusic)
;

module.exports = musicRouter;
