import { Router } from 'express';
import{r_admin,r_trips , r_reports}from '../controllers/admin_controller.js';
// import{r_reports}from'../controllers/admin_controller.js';
var router = Router();

/* GET home page. */

router.get('/', r_admin);

router.get('/trips', r_trips);

router.get('/reports', r_reports);



export default router;
