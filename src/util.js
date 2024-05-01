import CryptoJS from 'crypto-js';
import { API_KEY } from './config';

export const formatToCurrency = (money, region, currency) => {
    return Intl.NumberFormat(region, {
      style: "currency",
      currency,
    })
      .format(money)
      .replace("UZS", "")
      .replace(".00", "")
      .trim();
};

  
function reformatPhoneNumber(phoneNumber) {
    // Remove all non-numeric characters from the input string
    const cleanedNumber = phoneNumber.replace(/\D/g, '');
  
    // // Check if the cleaned number starts with the country code '998'
    // if (cleanedNumber.startsWith('998')) {
    //   // If it starts with '998', remove the country code and return the rest of the number
    //   return cleanedNumber.slice(3);
    // }
  
    // If the cleaned number doesn't start with '998', return it as is
    return '+'+cleanedNumber;
  };


function generateHMAC(data, timestamp){
    const message = data!=null?`${JSON.stringify(data)}${timestamp}`:`${timestamp}`
    const hmac = CryptoJS.HmacSHA256(message, API_KEY);
    return hmac.toString(CryptoJS.enc.Hex);
};
  
function getCurrentEpochTime(){
    return Math.floor(new Date().getTime() / 1000);
}

  
function dateFormatter(date){
  const year = date.getFullYear()
  let month = date.getMonth() + 1
  if (month < 10) {
      month = `0${month}`
  }
  let day = date.getDate()
  if (day < 10) {
      day = `0${day}`
  }
  return `${year}-${month}-${day}`
};

export {reformatPhoneNumber, dateFormatter, getCurrentEpochTime, generateHMAC};
