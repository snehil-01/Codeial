const Post=require('../models/post');
const User=require('../models/user');
module.exports.home=async function(req,res){
   
//    console.log(req.cookies);
//    res.cookie('user_id',25);
// Post.find({},function(err,posts){
//     if(err){console.log('error in fetching posts'); return;}
    
//     return res.render('../views/home',{
//         title:'Codeial | Home',
//         posts:posts,
//         // user:user
//     });
// })
// try{
//     // populate the user of each post
//    let posts = await Post.find({})
//    .sort('-createdAt')
//    .populate('user')

//    .populate({
//        path: 'comments',
//        populate: {
//            path: 'user'
//        }
//    });

//    let users = await User.find({});

//    return res.render('../views/home', {
//        title: "Codeial",
//        posts:  posts,
//        all_users: users
//    });

// }catch(err){
//    console.log('Error', err);
//    return;
// }

Post.find({})
.populate('user')
.populate({
    path: 'comments',
    populate: {
        path: 'user'
    }
})
.exec(function(err, posts){

    User.find({}, function(err, users){
        return res.render('home', {
            title: "Codeial | Home",
            posts:  posts,
            all_users: users
        });
    });

   
})

}

