'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const RoleSchema = new mongoose.Schema(
    {
      alias: { type: String },
      permissions: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Permission' },
      ],
    },
    {
      timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
      },
    }
  );
  return mongoose.model('Role', RoleSchema);
};
