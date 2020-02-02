var mongoose= require('mongoose');

var Camp= require('./models/campground');

var Comment= require('./models/comment');

var data=[
            {
                name:'Testing image 1',
                image:'https://farm8.staticflickr.com/7285/8737935921_47343b7a5d.jpg', 
                description:'This is a wonderful Granite ground launch for camp-X project'
            },
            {
                name:'Testing image 2',
                image:'https://farm4.staticflickr.com/3211/3062207412_03acc28b80.jpg', 
                description:'This is a wonderful Granite ground launch for camp-X project'
            }
        ]

function seedDB(){
    Camp.remove({}, function(err){
    if(err){
        console.log('Error')
    }
    else{
        console.log('All records deleted....');
        data.forEach(function(seed){
        Camp.create(seed, function(err, camp){
            if(err){
                console.log('Error');
            }else{
                console.log('Records added!!');
                Comment.create({
                    text:'She is beautiful',
                    author:'Shankar'
                }, function(err, comment){
                    if(err){
                        console.log('Error');
                    }else{
                        camp.comments.push(comment);
                        camp.save();
                        console.log('created new comment');
                    }
                })
            }
            
        })
       })
    }
    });
    
    
}

module.exports= seedDB;
