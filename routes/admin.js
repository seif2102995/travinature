import { Router } from 'express';
var router = Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin');
});

router.get('/trips', function(req, res, next) {
  res.render('trips');
});

router.get('/reports', function(req, res, next) {
  res.render('reports-admin');
});


export default router;
