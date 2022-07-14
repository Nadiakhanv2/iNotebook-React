const jwt = require("jsonwebtoken");
const JWT_SECRET = "Nadiaisasupersecret";

const fetchuser =  (req, res, next) => {
// Get the user from jwt token and add id to the request object
    const token = req.header('auth-token');

    if (!token) {
        return res.status(401).send({ error: 'Access denied. No token provided.' });
    }
      try {
         const data = jwt.verify(token, JWT_SECRET);
         req.user = data.user;
         next();
    } catch (error) {
           res.status(401).send({ error: 'Access denied. No token provided.' });
    }
}


module.exports=fetchuser;