const Koa = require('koa');
const musicRouter = require('./routers/music');
const userRouter = require('./routers/user');
const session = require('koa-session');
const formidable = require('koa-formidable');
const checkLogin = require('./middleware/checkLogin');
// 创建服务器
let app = new Koa();
let {appPort, viewsDir, staticDir, uploadDir} = require('./config');

app.listen(appPort, () => {
    console.log(`服务器启动在${appPort}端口`);
});

// 模板渲染
const render = require('koa-art-template');
render(app, {
    root: viewsDir,
    extname: '.html',
    debug: process.env.NODE_ENV !== 'production' // 不压缩混淆
});

// 中间件使用列表 app.use

// 优雅的处理异常
let rewriteUrl = require('./middleware/rewriteUrl');
let error = require('./middleware/error');
// 重写url
app.use(rewriteUrl(require('./rewriteUrlConfig')));
app.use(error());

// 处理静态资源
app.use(require('koa-static')(staticDir));

// 处理session
// 基于test字符串进行签名的计算，保证数据不被篡改
app.keys = ['test'];
let store = {
    storage: {},
    set(key, session) {
        this.storage[key] = session;
    },
    get(key) {
        return this.storage[key];
    },
    destroy(key) {
        delete this.storage[key];
    }
};
app.use(session({store: store}, app));

// 鉴权
app.use(checkLogin);

// 必须在每次请求挂载新的数据与视图的桥梁
app.use(async (ctx, next) => {
    // 在session之后
    ctx.state.user = ctx.session.user;
    await next();
});

// 处理请求体数据 ctx.request.body
// app.use(bodyParser());
// 处理文件及字符串
app.use(formidable({
    // 设置上传目录
    uploadDir: uploadDir,
    // 默认根据文件算法生成hash字符串作为文件名，无后缀
    keepExtensions: true
}));

app.use(userRouter.routes());
app.use(musicRouter.routes());

app.use(userRouter.allowedMethods());
// 中间件使用列表 结束