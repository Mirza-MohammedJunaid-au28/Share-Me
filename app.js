const express = require('express');
const { engine } = require('express-handlebars');
const cookieParser = require('cookie-parser')
const router = require('./routes/router');
const app = express();
const port = process.env.PORT || 3000;

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static('uploads'));
app.use(router)

app.listen(port,()=>{
    console.log(`[ Listning at PORT ${port} ] . . .`);
})