import {getValFromList} from './utility';

export const sexList = [
    {value: 0, displayValue: "不明"},
    {value: 1, displayValue: "男性"},
    {value: 2, displayValue: "女性"},
];

export const getSex = (value) => {
    return getValFromList(value, sexList);
};

export const ageList = [...Array(100)].map((_, i) => {
    return {
        value: (new Date().getFullYear() - 100) + i,
        displayValue: (new Date().getFullYear() - 100) + i
    }
});

export const getAge = (value) => {
        if (15 >= value) return "10代前半";
        else if(25 >= value) return "20代前半";
        else if(30 >  value) return "20代後半";
        else if(35 >= value) return "30代前半";
        else if(40 >  value) return "30代後半";
        else if(45 >= value) return "40代前半";
        else if(50 >  value) return "40代後半";
        else if(55 >= value) return "50代前半";
        else if(60 >  value) return "50代後半";
        else if(65 >= value) return "60代前半";
        else if(70 >  value) return "60代後半";
        else if(75 >= value) return "70代前半";
        else if(80 >  value) return "70代後半";
        else if(85 >= value) return "80代前半";
        else if(90 >  value) return "80代後半";
};
