import {encode, decode} from './cryptoConst';

export const setLocalStorage = (key, data) => {
    localStorage.setItem(key, encode(String(data)));
}

export const getLocalStorage = (key) => {
    const data = localStorage.getItem(key);
    return data===null || data===undefined ? null : decode(localStorage.getItem(key));
}