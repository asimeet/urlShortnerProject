const express = require('express');
const path = require('path');
const port = 4400;
const app = express();
// // Set the default views directory to html folder
app.set('views', path.join(__dirname, 'src/views'));

// // Set the folder for css & java scripts
app.use(express.static(path.join(__dirname,'src/assets')))

// Set the view engine to ejs
app.set('view engine', 'ejs');

app.use('/home', (req,res,next) =>{
    res.render('home');
    next();
});

app.listen(port, () => {
  console.log(`Server is running at localhost:${port}`);
});