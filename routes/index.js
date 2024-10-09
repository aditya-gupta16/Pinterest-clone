var express = require('express');
var router = express.Router();

const userModel = require('./users')
const postModel = require('./post');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
passport.use(new localStrategy(userModel.authenticate()));
const upload = require('./multer');
const post = require('./post');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index')
});

router.get('/feed', function(req, res, next) {
  res.render('feed')
});

router.get('/login', function(req, res, next) {
  res.render('login', {error: req.flash('error')});

});

router.post('/upload', upload.single("file"), async function(req, res, next) {
    if(!req.file){
      return res.status(404).send("no files were given")

    }
    const user =  await userModel.findOne({username: req.session.passport.user});
    const post = await postModel.create({
      image: req.file.filename,
      imageText: req.body.filecaption,
      user: user._id
    })

    user.posts.push(post._id)
    await user.save()
    res.send("file already uploaded")
});


router.get('/profile', isLoggedIn, async function(req, res, next) {
   
    const user = await userModel.findOne({
      username: req.session.passport.user
    })
    .populate("posts")
    res.render('profile', {user})
   
    
});

router.post('/register', function(req, res) {
    const userData = new userModel ({
      username: req.body.username,

      email: req.body.email,
  
      fullname: req.body.fullname,
    
      db:{
        type: String
      },
    
    })
    userModel.register(userData, req.body.password)
    .then(function(){
      passport.authenticate("local")(req, res, function(){
        res.redirect('/profile');

      });
    })
});

router.post('/login',passport.authenticate("local",{
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true

}),function(req, res, next) { 
});

router.get('/logout', function(req, res){
  req.logout(function(err){
    if (err){return next (err);}
    res.redirect('/');
  })
})

function isLoggedIn(req, res, next){
   if(req.isAuthenticated()) {return next()} 
   res.redirect('/')
   
}


module.exports = router;






// router.get('/register', function(req, res, next) {
//   res.render('index')
// });

// router.get('/alluser', async function(req, res, next) {
//     let user = await userModel
//     .findOne({
//       _id: "66fa59f238110aa90beb8a35"}) 
//     .populate('posts')
//     res.send(user);
// });

// router.get('/usercreate', async function(req, res) {
//    let usercreated =  await userModel.create({
//     username: "uuaditya",
//     fullname: "aditya gupta",
//     email: "adityaggg@gmail.com",
//     password: "aditya@123",
//     posts: []
//    })
//    res.send(usercreated);
// });

// router.get('/postcreate', async function(req, res) {
//     let postcreated = await postModel.create({
//       postText: "aditya",
//       user: "66fa59f238110aa90beb8a35"
//     })

//     let postcreatedd = await postModel.create({
//       postText: "adityaa",
//       user: "66fa59f238110aa90beb8a35"
//     })

    
//     let postcreateddd = await postModel.create({
//       postText: "adityaa",
//       user: "66fa59f238110aa90beb8a35"
//     })



//     let user =  await userModel.findOne({
//       _id: "66fa59f238110aa90beb8a35"
//     })

//     user.posts.push( postcreated._id);
//     await user.save();
//     res.send("done");

  
// });