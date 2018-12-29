'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const PermissionSchema = new mongoose.Schema(
    {
      alias: { type: String },
      apis: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Api' }],
    },
    {
      timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
      },
    }
  );
  return mongoose.model('Permission', PermissionSchema);
};
