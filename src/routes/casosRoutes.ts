import express from 'express';
import casesController from '../controllers/casosController';

const router = express.Router();

router.get('/casos', casesController.getAllCases);
router.get('/casos/:id', casesController.getCaseById);
router.post('/casos', casesController.createCase);
router.put('/casos/:id', casesController.updateCase);

export default router;
