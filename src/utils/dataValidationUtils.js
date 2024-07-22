// emailValidator.js

// Function to validate email address
function validateEmail(email) {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
}

// Function to validate phone number (Australian format)
function validatePhoneNumber(phone) {
  // Australian phone numbers: landlines are 10 digits starting with 02, 03, 07, or 08.
  // Mobiles are 10 digits starting with 04.
  const re = /^(\+61[-.\s]?)?(\(?0[2|3|4|7|8]\)?[-.\s]?)?[0-9]{8}$/;
  return re.test(String(phone));
}

// Function to validate zip code (Australian format)
function validateZipCode(zip) {
  // Australian postcodes are 4 digits.
  const re = /^\d{4}$/;
  return re.test(String(zip));
}

// Function to validate URL
function validateURL(url) {
  const re = /^(https?:\/\/)?([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})(\/\S*)?$/;
  return re.test(String(url).toLowerCase());
}

// Function to validate date (YYYY-MM-DD format)
function validateDate(date) {
  const re = /^\d{4}-\d{2}-\d{2}$/;
  if (!re.test(String(date))) return false;
  const d = new Date(date);
  const dNum = d.getTime();
  return dNum && d.toISOString().slice(0, 10) === date;
}

// Function to validate credit card number (basic validation)
function validateCreditCard(card) {
  const re =
    /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})$/;
  return re.test(String(card).replace(/\s+/g, ""));
}

// Exporting the functions
module.exports = {
  validateEmail,
  validatePhoneNumber,
  validateZipCode,
  validateURL,
  validateDate,
  validateCreditCard,
};
