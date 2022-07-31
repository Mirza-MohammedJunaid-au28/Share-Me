function errorDisplay(req, res){
    console.log(req.body);
    res.render('userexists');
}

module.exports = {errorDisplay}