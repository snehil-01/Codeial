const Comment=require('../models/comment')
const Post=require('../models/post')

module.exports.create=function(req,res){
    Post.findById(req.body.post,function(err,post){
        if(post){
            Comment.create({
                content:req.body.content,
                user:req.user._id,
                post:req.body.post
            },function(err,comment){
                if(err){console.log('error in creating a post');return;}
                post.comments.push(comment);
                post.save();
                return res.redirect('/')
            })
        }
    })
    
}

module.exports.destroy=function(req,res){
    Comment.findById(req.params.id,function(err,comment){
        if(err){
           console.log('error hain');
           return res.redirect('back'); 
        }
        if(comment.user==req.user.id){
        let postId=comment.post;
        comment.remove();
       /* Post.findById(id,function(err,post){
            if(post){
           let ind=post.comments.indexOf(req.params.id);
           post.comments.splice(ind,1);
            }
            return res.redirect('back');
        })*/
        
        Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}},function(err,post){
            return res.redirect('back');
        })
        }else{
            return res.redirect('back');
        }
    })
}
