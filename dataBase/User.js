const mongoose = require('mongoose');
const rolesEnum = require("../configs/roles.enum");
const { oauthService } = require('../services');

const secureFields = ['password'];

const UserScheme = new mongoose.Schema({
  firstName: { type: String, trim: true, default: '' },
  lastName: { type: String, trim: true, default: '' },
  email: { type: String, trim: true, lowercase: true, required: true, unique: true },
  age: { type: Number },
  password: { type: String, required: true, default: "" },
  role: { type: String, enum: Object.values(rolesEnum), default: rolesEnum.USER }
},
{
  timestamps: true,
  versionKey: false,
  toJSON: {
    virtuals: true,
    transform: function(doc, ret) {
      for (const field of secureFields) {
        delete ret[field];
      }

      return ret;
    }
  },
  toObject: {
    virtuals: true,
    transform: function(doc, ret) {
      for (const field of secureFields) {
        delete ret[field];
      }

      return ret;
    }
  }
});

UserScheme.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`.trim();
});

UserScheme.virtual('mainPhoto', {
  ref: 'User_Avatar',
  localField: '_id',
  foreignField: '_user_id',
  justOne: true,
  options: {
    sort: { updatedAt: -1 }
  }
});

UserScheme.pre(/^find/, function() {
  this.populate('mainPhoto');
});

UserScheme.statics = { // for schema
  myFirstStatic() {
    console.log(this); // this - schema
  },

  async saveUserWithHashPassword(userObject) {
    const hashPassword = await oauthService.hashPassword(userObject.password);

    return this.create({ ...userObject, password: hashPassword });
  }
};

UserScheme.methods = { // for document
  myFirstMethod() {
    console.log(this); /// this - document
  },

  async checkIsPasswordsSame(passwordToCheck) {
    await oauthService.checkPasswords(this.password, passwordToCheck);
  }
};

module.exports = mongoose.model('User', UserScheme);
