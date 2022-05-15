const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET_TOKEN;

const verifyUser = (req, res, next) => {
	const token = req.header("auth-token");
	if (!token) return res.status(400).send("access denied");

	try {
		const verifiedUser = jwt.verify(token, JWT_SECRET);
		req.user = verifiedUser;
		next();
	} catch (err) {
		res.status(400).send("invalid token");
	}
};

module.exports.verifyUser = verifyUser;