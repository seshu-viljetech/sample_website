const mongoose=require("mongoose")

const userSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  Email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email address'],
  },
  Password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
  },
}, { timestamps: true });

const userModel = mongoose.model('userprofile', userSchema);

module.exports=userModel