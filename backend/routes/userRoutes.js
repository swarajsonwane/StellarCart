import express from 'express';

import { authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    getUserById,
    updateUser,
    deleteUser} from '../controllers/userController.js';

import {protect , admin} from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect , admin , getUsers).post(registerUser);
router.route('/auth').post(authUser);
router.post('/logout', logoutUser);
router.route('/profile').get(protect , getUserProfile).put(protect ,updateUserProfile);
router.route('/:id').delete(protect , admin, deleteUser).get(protect , admin,getUserById).put(protect , admin,updateUser);


export default router;