const express=require('express');
const router=express.Router();
const usercontroller=require('../controllers/users_controller');
// const signUpcontroller=require('../controllers/users_controller');
// const signINcontroller=require('../controllers/users_controller');
const passport=require('passport');

router.get('/profile/:id',passport.checkAuthentication,usercontroller.profile);
router.get('/sign-up',usercontroller.signUp);
router.get('/sign-in',usercontroller.signIn);
router.post('/create',usercontroller.create);
// passport as a middleware
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'}
),usercontroller.createSession);
router.get('/sign-out',usercontroller.destroySession);
router.post('/update/:id',passport.checkAuthentication,usercontroller.update);
module.exports=router;