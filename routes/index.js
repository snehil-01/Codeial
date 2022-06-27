const express=require('express');
const router=express.Router();
const homecontroller=require('../controllers/home_controller');
// const usercontroller=require('../controllers/users_controller');


router.get('/',homecontroller.home);
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));


console.log('router loaded');
 module.exports=router;
  