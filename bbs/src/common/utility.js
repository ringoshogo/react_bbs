import * as CommonConst from './commonConst';

export const checkValidity = ( value, rules ) => {
    
    let isValid = true;
    if ( !rules ) {
        return true;
    }

    if ( rules.required ) {
        isValid = value.trim() !== '' && isValid;
    }

    if ( rules.minLength ) {
        isValid = value.length >= rules.minLength && isValid
    }

    if ( rules.maxLength ) {
        isValid = value.length <= rules.maxLength && isValid
    }

    if ( rules.isEmail ) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test( value ) && isValid
    }

    if ( rules.isNumeric ) {
        const pattern = /^\d+$/;
        isValid = pattern.test( value ) && isValid
    }

    return isValid;
}

export const getDateFromString = (dt, userId, type) => {
    const y = dt.getFullYear();
    const m = ("00" + (dt.getMonth()+1)).slice(-2);
    const d = ("00" + (dt.getDate())).slice(-2);
    const h = ("00" + dt.getHours()).slice(-2);
    const M = ("00" + dt.getMinutes()).slice(-2);
    const s = ("00" + dt.getSeconds()).slice(-2);
    const ms = dt.getSeconds();
    switch(type) {
        case CommonConst.POST_ID:
            return ("P" + userId + y + m + d + h + M + s + ms)
        case CommonConst.RES_ID:
            return ("R" + userId + y + m + d + h + M + s + ms)
        default:
            return ("W" + userId + y + m + d + h + M + s + ms)
    }
}

export const getDateYYYYMMDD = (dt) => {
    const y = dt.getFullYear();
    const m = ("00" + (dt.getMonth()+1)).slice(-2);
    const d = ("00" + (dt.getDate())).slice(-2);
    return (y + "/" + m + "/" + d)
}

export const getValFromList = (value, valList) => {
    for (let key in valList) {
        if (valList[key].value == value){ 
            return valList[key].displayValue
        }
    }
    return null;
}