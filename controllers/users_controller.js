const User=require('../models/user');

module.exports.profile=function(req,res){
  User.findById(req.params.id,function(err,user){
    return  res.render('../views/users',{
      profile_user:user
    })
      
    
  })
  
}
module.exports.signUp=function(req,res){
if(req.isAuthenticated()){
 return res.redirect(`/users/profile/${req.user.id}`)
}

  return res.render('../views/user_sign_up',{
    title:"Codeial| Sign Up"
  });
}
module.exports.signIn=function(req,res){


  if(req.isAuthenticated()){
      let id=req.user.id
      return res.redirect(`/users/profile/${id}`)
    
   
  }

  return res.render('../views/user_sign_in',{
    title:"Codeial| Sign In"
  });
}
module.exports.create=function(req,res){
  if(req.body.password!=req.body.confirm_password){
    return res.redirect('back');
  }
  User.findOne({email:req.body.email},function(err,user){
    if(err){
      console.log('error in finding user in signing up');
      return;
    }
    if(!user){
      User.create(req.body,function(err,user){
        if(err){
          console.log('error in creating user ');
      return;
        }
        return res.redirect('/users/sign-in');
      })
    }else{
      return res.redirect('back');
    }
  })
}
module.exports.createSession=function(req,res){
  // User.findOne({email:req.body.email},function(err,user){
  //   id=user._id;
  //   return res.redirect(`/users/profile/${id}`);
  // })
  return res.redirect(`/users/profile/${req.user.id}`);
}

module.exports.destroySession=function(req,res){
  req.logout(function(err){
    if(err){
      return err;
    }
  })
  return res.redirect('/');
}

module.exports.update=function(req,res){
  // if(req.user.id==req.)
  User.findOneAndUpdate({id:req.body.id},req.body,function(err,user){
    return res.redirect('back');
  })
}