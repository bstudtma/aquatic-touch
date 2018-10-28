var LocalStrategy = require('passport-local').Strategy;

function checkUser(username, password, done) {
  if (username){
    var users=require(global.usersPath)
    console.log(global.usersPath);
    console.log(username);
    console.log(password);
    console.log(users);

    if (users[username]===password){
      return done(null, username);
    }
  }
  return done(null, false);
  // if (username.valueOf() === 'paul' &&
  //   password.valueOf() === 'carson')
  //   return done(null, username);
  // else
  //   return done(null, false);
}

module.exports = function (passport) {
  passport.serializeUser(function (user, done) {;
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

  passport.use(new LocalStrategy(checkUser));
}
