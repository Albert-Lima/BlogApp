module.exports = {
    eAdmin: function(req, res, next){
        if(req.isAuthenticated() && res.user.eAdmin == 1){
            return next()
        }
        req.flash("error_msg", "Você precisa ser admin"  )
        res.redirect("/")
    },
}