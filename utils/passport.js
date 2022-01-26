const passport = require('passport');
const { Strategy:LocalStrategy } = require('passport-local');
const { Strategy:JwtStrategy, ExtractJwt } = require('passport-jwt');
const UserModel = require('../src/models/User');
const bcrypt = require('bcryptjs');

passport.use(
  new LocalStrategy(
      {usernameField: 'email',passwordField:'password'},
    async (email, password, done) => {
      try {
        const user = await UserModel.findOne({ email: email });

        if (!user) {
          return done(null, false);
        }

        if (bcrypt.compareSync(password,user.password)) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (error) {
          console.log(error);
        return done(error, false);
      }
    },
  ),
);

passport.use(
  new JwtStrategy(
    {
      secretOrKey: process.env.SECRET_KEY || 'secret',
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
    },
    async (payload, done) => {
      const user = await UserModel.findById(payload.id);

      if (user) {
        done(null, user);
        return;
      }

      done(null, false);
    },
  ),
);

passport.serializeUser((user, done) => {
    console.log(user);
  done(null, user?._id,user?.email);
});

passport.deserializeUser((id, done) => {
  UserModel.findById(id, (err, user) => {
    done(err, user);
  });
});

module.exports = passport