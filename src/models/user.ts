import { Schema, model, models } from 'mongoose';
import toJSON from './plugins/toJSON';
const userSchema = new Schema({
  _id: { type: String, required: true },
  email: String,
  username: { type: String, required: true, unique: true },
  hashed_password: String,
},
  {
    _id: false,
    timestamps: true,
    toJSON: { virtuals: true },
  });
// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
export const UserModel = models.users || model("users", userSchema)

