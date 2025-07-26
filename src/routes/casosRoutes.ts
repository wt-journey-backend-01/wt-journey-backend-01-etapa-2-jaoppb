import express from 'express';
import casesController from '../controllers/casosController';

const router = express.Router();

router.get('/casos', casesController.getAllCases);
router.get('/casos/:id', casesController.getCaseById);
router.post('/casos', casesController.createCase);
router.put('/casos/:id', casesController.overwriteCase);
router.patch('/casos/:id', casesController.updateCase);
router.delete('/casos/:id', casesController.deleteCase);

export default router;
