var express = require('express'),
    router = express.Router();

/* Logic  */
router.get('/', function (req, res) {
  res.write('Hello World!');
  if(req.user)
    res.write('User authenticated: ' + req.user)
  else
    res.write('user not authenticated yet, go \<a href=\'/login\'\>here\<\/a\>')
  res.end();
});

router.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/fail.html',
                                   failureFlash: false })
);
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

/* Module settings */
module.exports = router;