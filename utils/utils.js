import BigNumber from 'bignumber.js'
const $thousands = (num) => {
	let str = num.toString();
	let reg = str.indexOf(".") > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g;
	return str.replace(reg,"$1,");
}

const $getBigNumberPrice = (price, decimal) => {
	return new BigNumber(price).multipliedBy(new BigNumber(10).pow(decimal))
}

const $getDividedByBigNum = (Bignumber, decimal) => {
	return Bignumber.dividedBy(new BigNumber(10).pow(decimal)).toNumber()
}

const $isBitUid = (tel) => {
	let myreg=/^[a-zA-Z]([a-zA-Z0-9]){5,24}$/;
	if (!myreg.test(tel)) {
		return false;
	} else {
		return true;
	}
}

const $isPassword = (tel) => {
	let myreg= /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$@$!%*#?&]{6,24}$/;
	if (!myreg.test(tel)) {
		return false;
	} else {
		return true;
	}
}

const $priceNum = (num) => {
	let myreg= /^(\d|[1-9]\d+)(\.\d+)?$/;
	if (!myreg.test(num)) {
		return false;
	} else {
		return true;
	}
}

const toNonExponential = (num) => {
  if(num){
    let m = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/);
    return num.toFixed(Math.max(0, (m[1] || '').length - m[2]));
  }else{
    return 0
  }
  
}

export default {
	$isBitUid,
	$isPassword,
	$priceNum,
	$getDividedByBigNum,
	$getBigNumberPrice,
	$thousands,
	toNonExponential
}