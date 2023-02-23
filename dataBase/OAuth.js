const mongoose = require('mongoose');

const OAuthScheme = new mongoose.Schema({
  accessToken: { type: String, trim: true, required: true },
  refreshToken: { type: String, trim: true, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
},
{
  timestamps: true,
  versionKey: false,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

OAuthScheme.virtual('testUser', {
  ref: 'User',
  localField: 'user',
  foreignField: '_id'
});

OAuthScheme.pre(/^find/, function() {
  this.populate('user');
  this.populate('testUser');
});

module.exports = mongoose.model('OAuth', OAuthScheme);
