'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const UserSchema = new mongoose.Schema(
    {
      mobile: { type: String, unique: true, required: true },
      password: { type: String, required: true },
      salt: { type: String, required: true },
      username: { type: String, required: true },
      avatar: {
        type: String,
        default: 'https://avatars3.githubusercontent.com/u/14978325',
      },
      extra: { type: mongoose.Schema.Types.Mixed },
      roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }],
    },
    {
      timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
      },
    }
  );
  return mongoose.model('User', UserSchema);
};
