const db = require('./db');
module.exports = {
    addMusicByObj: async (songInfo) => {
        return await db.q(
            "insert into musics (title, singer, time, file, filelrc, uid) value (?, ?, ?, ?, ?, ?)",
            Object.values(songInfo));
    },
    updateMusic: async (songInfo) => {
        return await db.q('update musics set title=?,singer=?,time=?,file=?,filelrc=?,uid=? where id=?',Object.values(songInfo))
    },
    deleteMusicById: async (songId) => {
        return await db.q('delete from musics where id = ?', songId);
    },
    findMusicById: async (songId) => {
        return await db.q('select * from musics where id = ?', songId);
    },
    findMusicByUid: async (uid) => {
        return await db.q('select * from musics where uid = ?', uid);
    }
};