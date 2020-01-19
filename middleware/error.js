module.exports = (option) => {
    return async (ctx, next) => {
        try {
            await next();
        } catch (e) {
            console.log(e);
            ctx.render('error', {msg: '002状态错误，原因：xxx'})
        }
    }
};