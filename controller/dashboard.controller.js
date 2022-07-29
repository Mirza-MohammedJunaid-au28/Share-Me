function renderDashboard(req,res){
    res.status(200).render('dashboard',{
        name : req.name,
        email : req.email
    })
}

module.exports = {renderDashboard}