import { Router } from "express";
import {r_about , r_home} from '../controllers/auth_controller.js'

const router = Router();

// GET home page
router.get("/", r_home );

router.get("/about", r_about );




export default router;
