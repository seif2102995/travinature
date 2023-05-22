const r_home = (req, res, next) => {
    console.log("index.js: GET /");
    res.render("home");
  };

  const r_about = (req, res, next)=> {
    res.render("about", { title: "Signup page", errors: [] });
  };

  
  export {r_about , r_home};