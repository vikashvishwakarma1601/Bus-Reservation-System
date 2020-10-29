const mongoose = require('mongoose')
const crypto = require('crypto')

let UserSchema = new mongoose.Schema({
    Email: { type: String, required: true, trim: true },
    UserPassword: { type: String, required: true },
    Name: { type: String, required: true },
    Mobile: { type: String, required: true, trim: true, maxlength: 10 },
    Age:{type: Number,maxlength:2,trim:true},
    Gender: { type: String, required: true, trim: true }
})


UserSchema
    .virtual("Password")
    .set(function (password) {
        this._password = password
        this.UserPassword = this.securePassword(password)
    })
    .get(function () {
        return this._password;
    })




UserSchema.methods = {
    
    authenticate: function (plainpassword) {
        return this.securePassword(plainpassword) === this.UserPassword;
    },
    securePassword: function (plainpassword) {
        return crypto.createHmac('sha256', "secret-key")
            .update(plainpassword)
            .digest('hex');
    },
    updateUserPassword:function(){
        return thsi.UserPassword = crypto.createHmac('sha256', "secret-key").update(plainpassword).digest('hex');
    }
}

let User = mongoose.model('User', UserSchema);


module.exports = User;