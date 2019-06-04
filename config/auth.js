module.exports = {
    ensureAuthenticated: function(res, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        req.flash('error_msg', 'Por favor autentifique-se para entrar');
        res.redirect('/login');
    }
}