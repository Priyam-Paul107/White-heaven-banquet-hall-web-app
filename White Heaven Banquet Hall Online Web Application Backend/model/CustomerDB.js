const { required } = require("joi");
const mongoose = require("mongoose");
const autoIncrement=require('mongoose-sequence')(mongoose);
mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log("Connected to mongoose");
  })
  .catch((err) => {console.log("Can't connect to database" + err)});

const customerSchema = new mongoose.Schema({
email:{
    unique:true,
    type:String,
    required:true,
},
password:{
    type:String,
    required:true,
},
role:{
type:String,
required:true,
},
name:{
  type:String,
  required:true
},
address:{
  type:String,

},
mobileNo:{
type:String,
required:true,
},
profileImage: { path:{type: String},filename:{type:String} }
},{timestamps:true});
customerSchema.plugin(autoIncrement,{inc_field:"customerId"});
const customerModal = mongoose.model("Customer",customerSchema);
module.exports=customerModal;
