'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const ApiSchema = new mongoose.Schema(
    {
      method: {
        type: String,
        enum: [ 'GET', 'POST', 'PUT', 'DELETE' ],
        required: true,
      },
      url: { type: String, required: true },
      alias: { type: String },
    },
    {
      timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
      },
    }
  );
  return mongoose.model('Api', ApiSchema);
};
