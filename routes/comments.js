var express= require("express");
var router= express.Router({mergeParams: true});
var Camp= require("../models/campground");
var Comment= require("../models/comment");
var middleware= require("../middleware")

router.get('/comment/new',middleware.ifLogged, function(req,res){
    var campid= req.params.id;
    console.log(campid);
    Camp.findById({_id:campid}, function(err, camp){
        if(err){
            console.log('Error');
        }else{
            
            res.render('comments/newcomment',{campground: camp});
        }
    })
});

router.post('/comments',middleware.ifLogged, function(req,res){
    var campId= req.params.id;
    var commentData= req.body.comment;
    Camp.findById({_id: campId}, function(err, campground){
        if (err){
            console.log('Error');
        }else{
            Comment.create(commentData , function(err, comment){
                if(err){
                    
                }else{
                    comment.author.id= req.user._id;
                    comment.author.username= req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    console.log(comment);
                    res.redirect('/campgrounds/'+ campground._id);
                }
            })
        }
        
    })
    
});

router.get('/comment/:comment_id/edit',middleware.isAuthorised, function(req, res){
    Comment.findById(req.params.comment_id, function(err, campcomment){
        res.render('comments/editcomment',{comment:campcomment, campgroundId: req.params.id });
    })
});

router.put('/comment/:comment_id',middleware.isAuthorised, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, camp){
        if(err){
            res.redirect("back");
        }else{
            req.flash("success","You succesfully edited your comment!!");
            res.redirect('/campgrounds/'+req.params.id);
        }
    })
})
    
router.delete('/comment/:comment_id',middleware.isAuthorised, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err, comment){
        if(err){
            res.render('back');
        }else{
            req.flash("success","You successfully deleted the comment!!");
            res.redirect('/campgrounds/'+req.params.id)
        }
    })
})




module.exports= router;