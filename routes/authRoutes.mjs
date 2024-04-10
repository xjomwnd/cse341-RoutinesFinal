import express from 'express'
import passport from 'passport'

const router = express.Router()


router.get('/', async (req, res) => { res.send('This function requires an option') });
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { successRedirect: '/success', failureRedirect: '/login-failure' }));

router.get('/success', (req, res) => {
    res.send("Login successful");
});

router.get('/login-failure', (req, res) => {
    res.status(401).send("Google authentication failed");
});

router.get('/logout', (req, res, next) => {
    req.logout((error) => {
        if (error) { return next(error) }
        console.log(error);
        res.redirect('/')
    })
})

export default router;