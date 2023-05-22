// authController.js

// Controller for the "/signup" route
const renderSignup = (req, res, next) => {
    res.render("signup");
  };
  
  // Controller for the "/login" route
  const renderLogin = (req, res, next) => {
    res.render("login");
  };
  

  

  
  export { renderSignup, renderLogin };
  