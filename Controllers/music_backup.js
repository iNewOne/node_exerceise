const musicModel = require('../models/music');
const path = require('path');
module.exports = {
    // 添加音乐，接收参数
    addMusic: async (ctx, next) => {
        // console.log(ctx.request.files);
        // console.log('++++++++++++++++++++++++++');
        // console.log(ctx.request.body);
        /**
         * 1. 获取字符串数据
         * 2. 获取文件  ---> 保存文件的网络路径 方便public请求返回
         *             ---> 保存文件的绝对路径也可以，但是麻烦
         *             歌词可选
         * 3. 插入数据到数据库
         * 4. 响应报文
         */
        let { title, singer, time } = ctx.request.body;
        let saveSingObj = {
            title, singer, time
        };
        let { file, filelrc } = ctx.request.files;

        if (!file) {
            ctx.throw('歌曲必须上传');
            return ;
        }
        saveSingObj.file = '/public/files/' + path.parse(file.path).base;

        saveSingObj.filelrc = 'no file lrc';
        if (filelrc) {
            saveSingObj.filelrc = '/public/files/' + path.parse(filelrc.path).base;
        }

        saveSingObj.uid = 1;

        let result = await musicModel.addMusicByObj(saveSingObj);
        ctx.body = {
            code: '001',
            msg: result.message
        };
    }
};