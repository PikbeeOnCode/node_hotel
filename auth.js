const passport = require("passport");
const Person = require("./models/person"); // capital P for model
const LocalStrategy = require("passport-local").Strategy;

passport.use(
    new LocalStrategy(
        { usernameField: "userName" }, // tell passport to use "userName" field instead of default "username"
        async (userName, password, done) => {
            try {
                // console.log(`Received credentials: userName=${userName}, password=${password}`);

                // find user by userName only (not password, since it's hashed)
                const user = await Person.findOne({ userName });
                if (!user) {
                    return done(null, false, { message: "Incorrect username" });
                }

                // compare plain password with hashed password
                const isPasswordMatch = await user.comparePassword(password);
                if (!isPasswordMatch) {
                    return done(null, false, { message: "Incorrect password" });
                }

                // success
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    )
);

module.exports = passport;
