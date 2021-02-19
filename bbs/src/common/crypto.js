import * as crypto from 'crypto';
import {KEY, ALGORITHM} from './cryptoConst';

export const setLocalStorage = (key, data) => {
    localStorage.setItem(key, encode(String(data)));
}

export const getLocalStorage = (key) => {
    const data = localStorage.getItem(key);
    return data===null || data===undefined ? null : decode(localStorage.getItem(key));
}

const encode = data => {    
    // 16byteのランダム値を生成する
    const iv = crypto.randomBytes(16);

    // 暗号器作成
    const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);

    // dataをバイナリにして暗号化
    const encData = cipher.update(Buffer.from(data));

    // 末端処理 & 先頭にivを付与し、バイナリにbase64(文字列)にして返す
    return Buffer.concat([iv, encData, cipher.final()]).toString('base64');

}

const decode = data => {
    // 受け取った暗号化文字列をバイナリに変換
    const buff = Buffer.from(data, 'base64');

    // iv値である、先頭16byteを取り出す
    const iv = buff.slice(0, 16);

    // iv値以降の、暗号化データを取り出す
    const encData = buff.slice(16);

    // 復号器作成
    const decipher = crypto.createDecipheriv(ALGORITHM, KEY, iv);

    // 暗号化データを復号化
    const decData = decipher.update(encData);

    // 末端処理 ＆ バイナリを文字列に戻す
    return Buffer.concat([decData, decipher.final()]).toString('utf8');
}