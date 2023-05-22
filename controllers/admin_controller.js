const r_admin = (req, res, next) => {
    res.render('admin');
  };

  const r_trips = (req, res, next)=> {
    res.render('trips');
  };

  const r_reports = (req, res, next)=> {
    res.render('reports-admin');
  }
  const r_cust = (req, res, next)=> {
    res.render('customers-admin');
  }
  
  export { r_admin,r_trips , r_reports , r_cust};