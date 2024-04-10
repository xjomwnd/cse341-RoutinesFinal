import express from 'express';
import rc from '../controllers/routinesController.mjs';


const router = express.Router();

/*** Routines Controller */

/* Get Routes */

router.get('/', /*#swagger.tags=["Routines"]*/ rc.getAllRoutines);
router.get('/:id', /*#swagger.tags=["Routines"]*/ rc.getRoutineById);

/* Post Routes */

router.post('/', /*#swagger.tags=["Routines"] #swagger.start='routines'*/ rc.createRoutine);

router.patch('/:id', /*#swagger.tags=["Routines"] */ rc.updateRoutine);

router.delete('/:id', /*#swagger.tags=["Routines"]*/ rc.deleteRoutine);

export default router