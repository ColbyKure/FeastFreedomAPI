const mongoose = require('mongoose');
const validator = require('email-validator');
//const Kitchen = require('../../controllers/kitchenController');
//const item = require('../item/itemSchema');
//const { schema } = require('../item');
//const items = require('../item/index.js');

const ValidateEmail = (value) => {
    return validator.validate(value);
};

const EmailUnique = async (value) => { //uhhh unique email works, but not here...
    console.log("inside unique email")
    console.log("looking for " + value);
    //const count = await mongoose.model('users').countDocuments({ email: value});
    let count = await mongoose.model('kitchens').countDocuments({ Email: value });
    console.log(`Found ${count} emails with value: ${value}`);
    return count === 0;
};

module.exports = new mongoose.Schema({
    KitchenName: {
        type: String,
        unique: true,
        required: [true, 'Please enter a UserName.'],
        minlength: [5, 'UserName must have at least 5 characters.'],
        maxlength: [30, 'UserName connot have over 30 characters.']
    },
    Email: {
        type: String,
        required: [true, 'Please enter an Email.'],
        index: true,
        unique: true,
        validate: [
            {validator: ValidateEmail, message: `{VALUE} is an invalid email address`},
            {validator: EmailUnique, message: `{VALUE} is already in use`}
        ]
    },
    Password: {
        type: String,
        required: [true, 'Please enter a Password.'],
        minlength: [5, 'Password must have at least 5 characters.'],
        maxlength: [30, 'Password connot have over 30 characters.'],
    },
    KitchenType: {
        type: String,
    },
    WorkingDays: {
        type: String,
    },
    OpenTime: {
        type: String,
    },
    CloseTime: {
        type: String,
    },
    ImagePath: {
        type: String,
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'items'
    }]
});
