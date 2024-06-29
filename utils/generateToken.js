import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
	const token = jwt.sign({ userId }, "medic", {  // Pass userId directly as an object
		expiresIn: "15d",
	});
	console.log(token)

	res.cookie("jwt", token, {
		maxAge: 15 * 24 * 60 * 60 * 1000, // Millisec
		httpOnly: true, // prevent XSS attacks cross-site scripting attacks (doesnt let js to access it)
		sameSite: "strict", // CSRF attacks cross-site request forgery attacks

	});
};

export default generateTokenAndSetCookie;
