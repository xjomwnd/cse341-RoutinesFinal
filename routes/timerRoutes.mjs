import express from "express";
import tc from "../controllers/timersController.mjs";


const router = express.Router();

/*** Timers Controller */

/* Get Routes */

router.get('/', /*#swagger.tags=["Timers"]*/tc.getAllTimers);
router.get('/:id', /*#swagger.tags=["Timers"]*/tc.getTimerById);

/* Post Routes */

router.post('/', /*#swagger.tags=["Timers"] #swagger.start='timers'*/tc.createTimer);

router.patch('/:id', /*#swagger.tags=["Timers"] */tc.updateTimer);

router.delete('/:id', /*#swagger.tags=["Timers"]*/tc.deleteTimer);

export default router;