function reformatPhoneNumber(phoneNumber) {
    // Remove all non-numeric characters from the input string
    const cleanedNumber = phoneNumber.replace(/\D/g, '');
  
    // // Check if the cleaned number starts with the country code '998'
    // if (cleanedNumber.startsWith('998')) {
    //   // If it starts with '998', remove the country code and return the rest of the number
    //   return cleanedNumber.slice(3);
    // }
  
    // If the cleaned number doesn't start with '998', return it as is
    return cleanedNumber;
  };

export default reformatPhoneNumber;
