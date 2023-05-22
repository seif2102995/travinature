const r_admin = (req, res, next) => {
    res.render('admin');
  };

  const r_trips = (req, res, next)=> {
    res.render('trips');
  };

  const r_reports = (req, res, next)=> {
    res.render('reports-admin');
  }
  
  export { r_admin,r_trips , r_reports};