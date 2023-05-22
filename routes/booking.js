import { Router } from "express";
import { renderMap, renderEgypt, renderArgentina } from '../controllers/booking_controller.js'


const router = Router();

router.get("/", renderMap);

router.get("/egypt",renderEgypt );

router.get("/argentina", renderArgentina );







export default router;
