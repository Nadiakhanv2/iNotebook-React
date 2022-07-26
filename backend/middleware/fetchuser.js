var jwt = require("jsonwebtoken");
const JWT_SECRET = "Nadyaisasupersecret";

const fetchuser = (req, res, next) => {
  // Get the user from the jwt token and add id to req object
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    // req.user = data;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
};

module.exports = fetchuser;

// const jwt = require("jsonwebtoken");
// const JWT_SECRET = "Nadiaisasupersecret";

// const fetchuser =  (req, res, next) => {
// // Get the user from jwt token and add id to the request object
//     const token = req.header('auth-token');

//     if (!token) {
//         return res.status(401).send({ error: 'Access denied. No token provided.' });
//     }
//       try {
//          const data = jwt.verify(token, JWT_SECRET);
//          req.user = data.user;
//          next();
//     } catch (error) {
//            res.status(401).send({ error: 'Access denied. No token provided.' });
//     }
// }

// module.exports=fetchuser;
