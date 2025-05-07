// validateFields.js
function validateUserFields(data) {
    const errors = {};
  
    if (!data.Name || data.Name.trim() === "") {
      errors.Name = "Name is required";
    }
  
    if (!data.Email || data.Email.trim() === "") {
      errors.Email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(data.Email)) {
      errors.Email = "Email is invalid";
    }
  
    if (!data.Password) {
      errors.Password = "Password is required";
    } else if (data.Password.length < 6) {
      errors.Password = "Password must be at least 6 characters";
    }
  
    if (!data.CnfrmPassword) {
      errors.CnfrmPassword = "Confirm Password is required";
    } else if (data.Password !== data.CnfrmPassword) {
      errors.CnfrmPassword = "Passwords do not match";
    }
  
    return errors;
  }
  
  module.exports = validateUserFields;
  