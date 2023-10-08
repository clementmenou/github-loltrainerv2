const express = require('express');

// express app
const app = express();

// register view engine
app.set('view engine', 'ejs');
// app.set('views', 'folder') // if you want to put views in a folder which isn't names "views"

// listen for requests
// The code is read up to down, if a get correspond, it sendfile
// "use" correspond to every url left
app.listen(3000);

app.get('/', (req, res) => {
    // res.sendFile('./server/index.html', { root: __dirname}); // with express
    res.render('index') // with ejs
});

app.get('/about', (req, res) => {
    // res.sendFile('./server/about.html', { root: __dirname});
    res.render('about') // with ejs
});

app.get('/about-us', (req, res) => {
    // res.redirect('/about');
    res.render('about') // with ejs
});

app.use((req, res) => {
    // res.sendFile('./server/404.html', { root: __dirname });
    res.status(404).render('404') // with ejs
});