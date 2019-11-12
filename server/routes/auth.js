import express from "express";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { getDB } from "../database";
const auth = express.Router();

auth.get("/google", passport.authenticate("google", {
  scope: ["profile"]
}));

auth.get("/google/callback", passport.authenticate("google"), (req, res) => {
  res.redirect("/");
});

auth.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/welcome");
});

export const setupPassport = (
  app,
  { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL }
) => {
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: GOOGLE_CALLBACK_URL
      },
      async (accessToken, refreshToken, profile, done) => {
        const db = getDB();
        const users = db.collection("users");
        const user = await users.findOne({ googleId: profile.id });
        let userId;

        if (user) {
          userId = user._id;
        } else {
          const insertion = await users.insertOne({
            googleId: profile.id,
            nickname: profile.displayName
          });
          userId = insertion.insertedId;
        }
        done(null, userId);
      }
    )
  );

  passport.serializeUser(async (user, done) => {
    done(null, user);
  });

  passport.deserializeUser(async (user, done) => {
    done(null, user);
  });  
};

export default auth;
