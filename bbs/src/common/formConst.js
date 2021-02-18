export const expiredDateSelectList = [
    {value: 1, displayValue: "1日"},
    {value: 2, displayValue: "2日"},
    {value: 3, displayValue: "3日"},
    {value: 5, displayValue: "4,5日"},
    {value: 11, displayValue: "1~2週間"},
    {value: 12, displayValue: "2~3週間"},
    {value: 13, displayValue: "3~4週間"},
    {value: 21, displayValue: "1~3ヶ月"},
    {value: 23, displayValue: "3~6ヶ月"},
    {value: 26, displayValue: "6~9ヶ月"},
    {value: 29, displayValue: "9~12ヶ月"},
    {value: 31, displayValue: "1~2年"},
    {value: 32, displayValue: "2~3年"},
    {value: 33, displayValue: "3~5年"},
    {value: 35, displayValue: "5~10年"},
    {value: 39, displayValue: "10年~"},
];

/**
 * 期限切れ後期間リストから値に相当する表示用値を取得する
 * @param {*} value 
 */
export const getExpiredDateFromSelectVal = (value) => {
    for(let key in expiredDateSelectList) {
        if(expiredDateSelectList[key].value == value) {
            return expiredDateSelectList[key].displayValue;
        }
    }
    return null;
 }