const express=require('express');
const {userById,allUsers,getUser,updateUser,deleteUser,hasAuthorization}=require('../controllers/user');
const { requireSignin } = require('../controllers/auth');


const router=express.Router();



router.get('/users',allUsers);
router.get('/user/:userId',requireSignin,getUser);
router.put('/user/:userId',requireSignin,hasAuthorization,updateUser);
router.delete('/user/:userId',requireSignin,hasAuthorization,deleteUser);

//any app containing :userId , our app will first execute userByID()
router.param("userId",requireSignin,userById)



module.exports=router;

