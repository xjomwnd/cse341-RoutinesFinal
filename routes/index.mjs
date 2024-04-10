import express from "express";
import indexController from "../controllers/routerController.mjs";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json" assert { type: "json" };
import users from "./userRoutes.mjs";
import events from "./eventRoutes.mjs";
import timers from "./timerRoutes.mjs";
import routines from "./routineRoutes.mjs";
import auth from "./authRoutes.mjs";
import authHandler from "../handlers/authHandler.mjs";
import passport from "passport";

const router = express.Router();

swaggerDocument.securityDefinitions = {
  OAuth2: {
    type: 'oauth2',
    authorizationUrl: 'https://accounts.google.com/o/oauth2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
    flow: 'accessCode',
    scopes: {
      profile: "",
      email: ""
    },
  },
};

/*** Docs */
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

/*** Home */
router.get('/', /*#swagger.tags=['Home']*/ indexController.getIndex);

/*** Auth */
router.use('/auth', /*#swagger.tags=['Auth']*/ auth);


/*** Users */
router.use('/users', authHandler.checkAuthentication, authHandler.ensureAuthentication, /*#swagger.tags=['Users']*/ users);

/*** Events */
router.use('/events', authHandler.checkAuthentication, authHandler.ensureAuthentication, /*#swagger.tags=['Events']*/ events);

/*** Timers */
router.use('/timers', timers /*#swagger.tags=['Timers']*/);

/*** Routines */
router.use('/routines', routines /*#swagger.tags=['Routines']*/);

export default router;