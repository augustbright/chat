import express from "express";
import passport from "passport";
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

export default auth;