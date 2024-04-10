import passport from 'passport';

// Authentication Middleware
const checkAuthentication = (req, res, next) => {
    if (passport.authenticate('google', {scope: ['profile', 'email']})) {
        // If the user is authenticated, proceed to the next middleware
        return next();
    } else {
        // If the user is not authenticated, redirect to the login page or send an error response
        res.redirect('/auth/google');
    }
};

const ensureAuthentication = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/auth/google');
    }
}

// Authorization Middleware
const checkAuthorized = (req, res, next) => {
    // Check if the authenticated user has the necessary permissions
    // You can implement your own logic here based on user roles, permissions, etc.
    if (req.user && req.user.isAdmin) {
        // If the user is authorized, proceed to the next middleware
        return next();
    } else {
        // If the user is not authorized, send a 403 Forbidden response
        res.status(403).send("You are not authorized to access this resource");
    }
};


export default { checkAuthentication, checkAuthorized, ensureAuthentication }