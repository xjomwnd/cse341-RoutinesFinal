import express from "express";
import uc from "../controllers/usersController.mjs";


const router = express.Router();

/*** Users Controller */

/* Get Routes */

router.get('/', /*#swagger.tags=["Users"]*/uc.getAllUsers);
router.get('/:id', /*#swagger.tags=["Users"]*/uc.getUserById);

/* Post Routes */

router.post('/', /*#swagger.tags=["Users"] #swagger.start='users'*/uc.createUser);

router.patch('/:id', /*#swagger.tags=["Users"] */uc.updateUser);

router.delete('/:id', /*#swagger.tags=["Users"]*/uc.deleteUser);

export default router;