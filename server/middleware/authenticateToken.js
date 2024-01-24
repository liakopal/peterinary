// middleware/authenticateToken.js
// const jwt = require('jsonwebtoken');

// const authenticateToken = (req, res, next) => {
//   // Log the incoming request path and headers
//   console.log(`Incoming request to ${req.path} with headers:`, req.headers);

//   // Check for the token in both the Authorization header and cookies
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1] || req.cookies.token;
  
//   if (!token) {
//     console.warn("No token provided, access denied.");
//     return res.status(401).json({ success: false, message: "Access Denied: No token provided" });
//   }

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) {
//       console.error("Token verification error:", err.message);
//       return res.status(403).json({ success: false, message: "Token is invalid" });
//     }
//     console.log("Token verified successfully. Decoded JWT:", user);
//     req.user = { userId: user.userId };
//     next();
//   });
// };

// module.exports = authenticateToken;

const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  // Log the incoming request path and headers
  console.log(`Incoming request to ${req.path} with headers:`, req.headers);

  // Check for the token in both the Authorization header and cookies
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1] || req.cookies.token;

  console.log('Received token:', token); // Debugging the received token
  
  if (!token) {
    console.warn("No token provided, access denied.");
    return res.status(401).json({ success: false, message: "Access Denied: No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      console.error("Token verification error:", err.message);
      return res.status(403).json({ success: false, message: "Token is invalid" });
    }
    console.log("Token verified successfully. Decoded JWT:", decodedToken);
    
    // Set user information from the decoded token
    req.user = { 
      userId: decodedToken.userId, 
      role: decodedToken.role,  // Add this line to include the role
      username: decodedToken.username // Optionally include the username if needed
    };
    
    // Log the extracted user information
    console.log("Authenticated user:", req.user.role);

    next();
  });
};

module.exports = authenticateToken;
