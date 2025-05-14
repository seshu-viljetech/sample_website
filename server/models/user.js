const mongoose=require("mongoose")

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
  },
  phone:{
    type:Number,
    required:[true,"Phone number is required"]
  },
  city:{
    type:String,
    required:true
  }
}, { timestamps: true });

const userModel = mongoose.model('userprofile', userSchema);

module.exports=userModel