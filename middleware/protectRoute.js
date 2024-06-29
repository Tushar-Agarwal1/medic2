import jwt from "jsonwebtoken";
import User from "../Model/user.model.js";

const protectRoute = async (req, res, next) => {
	try {
		const token = req.cookies.jwt;// we cant get the cookie without  using cookie parser

		if (!token) {
			return res.status(401).json({ error: "Unauthorized - No Token Provided" });
		}

		const decoded = jwt.verify(token, "Tanisha");

		if (!decoded) {
			return res.status(401).json({ error: "Unauthorized - Invalid Token" });
		}

		//const user1 = await User.findById(decoded.userId)
		//console.log("user after decoding ",user1)
		const user = await User.findById(decoded.userId).select("-password"); //we are takin user id and removing its password from it

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		req.user = user;  //in request we have send our current user

		next();
	} catch (error) {
		console.log("Error in protectRoute middleware: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export default protectRoute;