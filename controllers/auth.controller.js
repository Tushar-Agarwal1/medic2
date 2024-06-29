import User from "../Model/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import otpgen from "otp-generator";
import sendmail from "../utility/sendMail.js";
import sendNotification from "../utility/sendNotification.js"
import jwt from "jsonwebtoken"

export const signUp = async (req, res) => {
	try {
		console.log("aya hai kuch")
		const { fullName, email, password, confirmPassword, role } = req.body;
		console.log(req.body);

		if (password !== confirmPassword) {
			return res.status(400).json({ error: "Passwords don't match" });
		}

		const user = await User.findOne({ email });

		if (user) {
			return res.status(400).json({ error: "Username already exists" });
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		//https://avatar.iran.liara.run/public/job/farmer/male


		const boyProfilePic = ``;
		const girlProfilePic = ``;
		const otp = otpgen.generate(4, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
		//console.log(otp);


		const newUser = new User({
			fullName,
			email,
			password: hashedPassword, // Assigning password directly without hashing
			role,
			profilePic: role === "Doctor" ? boyProfilePic : girlProfilePic,
			verified: false,
			otp
		});

		console.log(newUser);




		if (newUser) {
			// Generate JWT token here
			generateTokenAndSetCookie(newUser._id, res);
			await newUser.save();
			sendmail(newUser.email, "verification mail", "Verified your account by entering this otp", otp);

			res.status(201).json({
				_id: newUser._id,
				fullName: newUser.fullName,
				email: newUser.email,
				profilePic: newUser.profilePic,
			});
		} else {
			res.status(400).json({ error: "Invalid user data" });
		}
	} catch (err) {
		console.log("Error in signup:", err);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ error: "Invalid user" });
		}
		const isPasswordCorrect = await bcrypt.compare(password, user.password);

		if (!isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid username or password" });
		}
		// console.log(user);
		if (!user.verified) {
			res.status(400).json({ error: "user not verified" });
		}

		generateTokenAndSetCookie(user._id, res);

		res.status(200).json({
			_id: user._id,
			fullName: user.fullName,
			username: user.username,
			profilePic: user.profilePic,
		});
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const logout = (req, res) => {
	//console.log("logout");
	try {
		//res.cookie("jwt", "", { maxAge: 0 });  //this sets value of cookie named jwt as "" and its maxage as 0 ,setting it 0 means deleting it
		res.cookie("jwt", "",).status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};
export const verifyAccount = async (req, res) => {
	//console.log(req.cookies);
	//console.log((req.body);

	const decoded = jwt.verify(req.cookies.jwt, 'medic');
	const user = await User.findById(decoded.userId);
	console.log(user);
	if (req.body.otp == user.otp) {
		user.verified = true;
		user.save();
		sendNotification(user.email, "Account created", "Your account has been created please login to use Medic", "");
		res.send("verified");
	} else {



		res.send("kar toh raha hoon");
	}


}