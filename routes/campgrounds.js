//campground ROUTES
var express= require("express");
var router= express.Router();
var Camp= require("../models/campground");
var User= require("../models/user");
var middleware= require("../middleware");

router.get('/', function(req, res){
   //call all the campgrounds from the DB

   Camp.find({}, function(err, allcampgrounds){
       if(err){
           console.log('Something Went Wrong')
       }
       else{
           console.log('Camps Found!!');
            res.render('campgrounds/index',{campgrounds: allcampgrounds});
       }
   })
  
})

router.post('/', middleware.ifLogged, function(req,res){
    //get data from form and add to the array
   var name= req.body.place;
   var image= req.body.imageurl;
   var desc= req.body.description;
   var author={
       id:req.user._id,
       username:req.user.username
   }
   var newCampground= {name: name, image: image, description: desc, author:author}
   
   Camp.create(
       newCampground
   , function(err, camp){
       if(err){
           console.log('Error!!!')
       }else{
           req.flash("success","You successfully added a new campground!!");
           res.redirect('/campgrounds');
       }
       
   })
    
});

router.get('/new',middleware.ifLogged, function(req, res){
    res.render('campgrounds/newcampgrounds',{})
});

router.get('/:id', function(req, res){
    //find the campground using the provided ID..
    var campid= req.params.id;
    //render show template with that campground..
    Camp.findById({_id:campid}).populate('comments').exec( function(err, campdetails){
        if(err){
            console.log('Error')
        }else{
            console.log(campdetails)
            res.render('campgrounds/show',{campdetails : campdetails, campid:campid});
        }
    })
    
});

//Edit Campgrounds
 router.get('/:id/edit',middleware.checkTheuser, function(req, res){
       Camp.findById(req.params.id, function(err, camp){
                 res.render('campgrounds/editcampgrounds',{camp:camp});
         })
 });
 
//update Campgrounds

router.put('/:id',middleware.checkTheuser, function(req, res){
    Camp.findByIdAndUpdate(req.params.id, req.body.campgrounds,{new: true}, function(err,camp){
        if(err){
            console.log('Error in Update');
        }else{
            
            res.redirect('/campgrounds/'+req.params.id);
            
        }
    })
  
 })
 
router.delete('/:id',middleware.checkTheuser, function(req,res){
    Camp.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log('error while deleting')
        }else{
           
            res.redirect('/campgrounds');
        }
    })
})



module.exports= router;