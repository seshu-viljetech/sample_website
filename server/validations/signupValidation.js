// validateFields.js
function validateUserFields(data) {
    const errors = {};
  
    if (!data.userName || data.userName.trim() === "") {
      errors.name = "Name is required";
    }
  
    if (!data.email || data.email.trim() === "") {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
      errors.email = "Email is invalid";
    }
    if (!data.phone || data.phone.trim() === "") {
      errors.phone = "Phone Number is required";
    } else if (!/^\d{10}$/.test(data.phone)) {
      errors.phone = "Phone Number is invalid";
    }
    
    if (!data.city || data.city.trim() === "") {
      errors.city = "City is required";
    }
    if (!data.password) {
      errors.password = "Password is required";
    } else if (data.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

  
    return errors;
  }
  
  module.exports = validateUserFields;
  