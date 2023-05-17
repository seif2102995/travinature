import { Router } from 'express';
var router = Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('map');
});

// router.get('/argentina', function(req, res, next) {
//   res.render('argentina');
// });

// router.get('/egypt', function(req, res, next) {
//   res.render('eg');
// });
export default router;
