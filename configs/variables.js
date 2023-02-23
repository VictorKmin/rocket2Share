module.exports = {
  PORT: process.env.PORT || 3000,
  FRONTEND_URL: process.env.FRONTEND_URL || 'https://handlebarsjs.com/examples/builtin-helper-each-block.html',
  MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/rocket',
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'access_secret',
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'refresh_secret',

  NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL,
  NO_REPLY_EMAIL_PASS: process.env.NO_REPLY_EMAIL_PASS,
  SEND_GRID_API_KEY: process.env.SEND_GRID_API_KEY,

  S3_REGION: process.env.S3_REGION,
  S3_BUCKET: process.env.S3_BUCKET,
  AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
  AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,

  TWILIO_ACC_SID: process.env.TWILIO_ACC_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  TWILIO_PHONE: process.env.TWILIO_PHONE,

  CORS_WHITE_LIST: process.env.CORS_WHITE_LIST || 'http://localhost:3000;http://localhost:4200'
};
