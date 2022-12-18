const jwt = require("jsonwebtoken");
const authenticateRequest = (req, res, next) => {
  // console.log(req.path);
  // const nonSecurePaths = [
  //   "/",
  //   "/Auth/login",
  //   "/Auth/signup",
  //   "/Product/unsold_products/:id",
  //   "/Product/get_product_by_id/:id",
  // ];
  // if (nonSecurePaths.includes(req.path)) return next();

  const authHeader = req.headers.authorization;
  console.log(authHeader);
  if (authHeader) {
    try {
      const token = authHeader.split(" ")[1];
      const user = jwt.verify(token, process.env.JWT_SECRET);
      req.user = user;
      next();
    } catch (e) {
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(401);
  }
};
module.exports = authenticateRequest;
