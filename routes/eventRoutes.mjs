import express from "express";
import ec from "../controllers/eventsController.mjs";
import passport from "passport";


const router = express.Router();

/*** Events Controller */

/* Get Routes */

router.get('/', ec.getAllEvents);
router.get('/:id', ec.getEventById);

/* Post Routes */

router.post('/',  ec.createEvent);

router.patch('/:id', ec.updateEvent);

router.delete('/:id', ec.deleteEvent);

export default router;