const express = require('express');
const app = express();

var port = process.env.PORT || 8080;


app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/dist'));


app.get('/', function(req, res) {
    res.render('index');
});

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});