module.exports = async (ctx, next) => {
    if (ctx.url.startsWith('/user')) {
        await next();
        return;
    }
    if (!ctx.session.user) {
        // ctx.url = '/user/login';
        ctx.body = `
            <div>
                没有登录，请先去登录<a href="/user/login">登录</a>
            </div>
        `;
        return ;
    }
    await next();
};