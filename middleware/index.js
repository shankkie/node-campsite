var Camp= require("../models/campground");
var Comment= require("../models/comment");
var middlewareObj={};

middlewareObj.ifLogged= function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","You need to be logged in to do that!!");
    res.redirect('/login');
}

middlewareObj.isAuthorised= function(req, res, next){
     if(req.isAuthenticated()){
         Comment.findById(req.params.comment_id, function(err, campcomment){
                if(err){
                    res.redirect('back');
                }else{
                    if(campcomment.author.id.equals(req.user._id)){
                       next()
                    }
                    else{
                        req.flash("error","You dont have permission to do this..")
                        res.redirect('back');
                    }
                    
                }
            })
    }else{
        req.flash("error","You need to be logged in to do this..")
        res.redirect('/login');
    }
    
}



middlewareObj.checkTheuser= function(req,res,next){
     if(req.isAuthenticated()){
        Camp.findById(req.params.id, function(err, camp){
             if(err){
                 res.redirect("back");
             }else{
                 if(camp.author.id.equals(req.user._id)){
                     next();
                 }
                 else{
                     req.flash("error","You dont have permission to do this..")
                     res.redirect("back");
                 }
             }
        });
     }else{
         res.redirect("back");
     }
   
}

module.exports= middlewareObj;