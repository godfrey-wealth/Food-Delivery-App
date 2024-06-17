
import jwt from "jsonwebtoken";

import color from "colors";


// Auth Middleware

const AuthMiddleware = async (req, res, next) => {
   

        const {token} = req.headers;

        // check if token not exist

        if (!token) {
            console.log(color.bgRed("Token Not Found"));
            return res.status(401).json({ success: false, message: "Unauthorized, pls login Again" });
        }


        try {

        const token_decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.body.userId = token_decoded.id;
        next();

    }
        catch (error) {

            console.log(color.bgRed("Invalid Token"));
            return res.status(401).json({ success: false, message: "Unauthorized, invalid Token" });

        }


}

export default AuthMiddleware;