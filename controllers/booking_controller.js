// mapController.js

// Controller for the "/" route
const renderMap = (req, res, next) => {
    res.render("map");
  };
  
  // Controller for the "/egypt" route
  const renderEgypt = (req, res, next) => {
    res.render("eg");
  };
  
  // Controller for the "/argentina" route
  const renderArgentina = (req, res, next) => {
    res.render("argentina");
  };
  
  export { renderMap, renderEgypt, renderArgentina };
  