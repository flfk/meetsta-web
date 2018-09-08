import validator from 'validator';
// Email

const isNameFirst = input => {
  if (validator.isEmpty(input)) {
    return { isValid: false, errorMessage: 'First name is required.' };
  }
  return { isValid: true, errorMessage: null };
};

const isEmail = input => {
  if (validator.isEmpty(input)) {
    return { isValid: false, errorMessage: 'Email is required.' };
  }

  if (!validator.isEmail(input)) {
    return { isValid: false, errorMessage: 'Please enter a valid email address' };
  }
  return { isValid: true, errorMessage: null };
};

const validate = {};
validate.isNameFirst = isNameFirst;
validate.isEmail = isEmail;

export default validate;
