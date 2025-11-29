const joi = require("joi");

const BanquetValidation = (req, res, next) => {

  const schema = joi.object({
    name: joi.string().min(3).max(100).required(),
    BanquetName: joi.string().required(),
    ownerEMail: joi.string().email().required(),
    capacity: joi.string().required(), // or joi.number()
    description: joi.string().min(0).max(100),
    mobileNo: joi.string().min(10).max(20).required(),
    location: joi.string().required(),
    type: joi.string().required(),
    charge: joi.string().min(1).max(100), // <-- FIXED
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "bad request", error });
  }

  next();
};
module.exports = BanquetValidation;
