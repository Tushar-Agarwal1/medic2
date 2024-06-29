import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		fullName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			minlength: 6,
		},
		role: {
			type: String,
			required: true,
			enum: ["Doctor", "Patient"],
		},
		profilePic: {
			type: String,
			default: "",
		},
		verified: {
			type: Boolean,
			default: false,
		},
		otp: {
			type: String
		}
		// createdAt, updatedAt => Member since <createdAt>

	}, { timestamps: true }

);

const User = mongoose.model("User", userSchema);

export default User;