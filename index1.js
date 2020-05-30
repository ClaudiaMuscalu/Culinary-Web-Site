const express = require('express')
const app = express()
const port = 3000

var ratingText = require('./rt.json')

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


app.get('/recenzie', (req, res) => {
    
  res.send(ratingText);
})


var fs = require('fs'); 
app.post('/recenzie' , function(req , res){

    console.log("aici");
    
    var date = fs.readFileSync('./rt.json');
    var ob = JSON.parse(date);
    
    // verific daca un anumit utilizator cu acelasi mail a mai oferit o data rating pentru aceasta reteta
    var utiliz = ob.find(function(el){
			return el.reteta == req.body.reteta && el.email == req.body.email;
    });
    
    // daca utilizatorul exista nu ii mai dau voie sa fie adaugat in json
    if(utiliz)
    {
      console.log("Acest utilizator a mai oferit o recenzie deja!")
    }
    else
    {
      ob.push(req.body);
      fs.writeFileSync('./rt.json' , JSON.stringify(ob));
      ratingText = ob;
    }
    res.send({Status:"OK"}); 
})

app.listen(port, () => console.log('Example app listening on port ${port}!')
)