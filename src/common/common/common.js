// 金额转换 分->元 小数点后两位
export const format_money = (money,type='format') => 
{
    let price = money * 0.01 + '';
    if(price.indexOf('.')<1){
        price = price + '.00'
    }
    return format_price(price,type);
}

function format_price(num,type)
{
    var n = parseFloat(num).toFixed(2);
    if(type=='format'){
        var re = /(\d{1,3})(?=(\d{3})+(?:\.))/g; 
        return n.replace(re, "$1,")
    }else{
        return n
    }
}

// 金额转换 元->分
// yuan:要转换的钱，单位元； digit：转换倍数
export const regYuanToFen = (yuan,digit=100) =>{
    var m=0,
        s1=yuan.toString(),
        s2=digit.toString();
    try{m+=s1.split(".")[1].length}catch(e){}
    try{m+=s2.split(".")[1].length}catch(e){}
    return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
}
