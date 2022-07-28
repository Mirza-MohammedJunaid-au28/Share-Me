function renderDashboard(req,res){
    console.log(req.headers.authorization);
    res.status(200).render('dashboard')
}
/* function renderDashboard(req,res){
    res.render('dashboard');
} */

module.exports = {renderDashboard}