import express from 'express';
import casesController from '../controllers/casosController';

const router = express.Router();

router.get('/casos', casesController.getAllCases);

export default router;
