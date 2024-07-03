import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rememberMe: { type: String, default: false },
    image: { type: String, default: "https://i.ibb.co/4pDNDk1/avatar.png" },
    birthDate: { type: String },
    gender: { type: String },  
    phoneNumber: { type: String },
    profession: { type: String },
    languages: [{ type: String }],
    comments: [],
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },

    agree: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Before saving the new user, encrypt the password.
userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();
    const hashedPassword = await bcrypt.hash(this.password, 12);
    this.password = hashedPassword;
    return next();
  } catch (err) {
    return next(err);
  }
});

const User = mongoose.model("User", userSchema);
export default User;
