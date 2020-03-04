const express = require('express')
const app = express()
const port = 3000

var blogText = require('./bd.json')

app.use(express.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, access-control-allow-origin")
    next();
  });

app.get('/', (req, res) => res.send('Hello World!'))
app.post('/', (req, res) => {

    res.send({Status:"OK"});
})


app.get('/blog', (req, res) => {
    
  res.send(blogText);
})


var fs = require('fs'); 
app.post('/blog' , function(req , res){
    var date = fs.readFileSync('./bd.json');
    var ob = JSON.parse(date);
    ob.push(req.body);
    fs.writeFileSync('./bd.json' , JSON.stringify(ob));
    blogText = ob;
    res.send({Status:"OK"});
})

app.listen(port, () => console.log('Example app listening on port ${port}!')
)