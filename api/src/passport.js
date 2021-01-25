require("dotenv").config();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const BearerStrategy = require("passport-http-bearer").Strategy;
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const { User } = require("./db.js");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const {
  JWT_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  API_URL,
} = process.env;

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password", session: false },
    async (email, password, done) => {
      const user = await User.findOne({ where: { email: email } });
      if (!user) return done(null, false);
      if (!user.isMailVerified) return done(null, false);
      if (!user.compare(password)) return done(null, false);
      const {
        id,
        givenName,
        familyName,
        email: userEmail,
        photoURL,
        isAdmin,
      } = user;
      return done(null, {
        id,
        givenName,
        familyName,
        email: userEmail,
        photoURL,
        isAdmin,
      });
    }
  )
);

passport.use(
  new BearerStrategy((token, done) => {
    jwt.verify(token, JWT_SECRET, function (err, user) {
      if (err) return done(err);
      return done(null, user ? user : false);
    });
  })
);

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `${API_URL}/auth/google/callback`,
      session: false,
    },
    async (accessToken, refreshToken, profile, done) => {
      //Check if the user already exists (by googleId o email)
      let user = await User.findOne({
        where: {
          [Op.or]: [
            { googleId: profile.id },
            { email: profile.emails[0].value },
          ],
        },
      });
      //If it doesnt exist we create one
      if (!user)
        user = await User.create({
          googleId: profile.id,
          email: profile.emails[0].value,
          isAdmin: false,
          isMailVerified: true,
          givenName: profile.name.givenName,
          familyName: profile.name.familyName,
          photoUrl: profile.photos[0].value,
        });

      return done(null, user);
    }
  )
);

module.exports = passport;
