
let express = require('express')
let app = express()
let port = 3000;

app.get('/', function (req, res) {
 res.send('hello world')
});

app.listen(port, () => {
   console.log(`Express.JS Server is running on http://localhost:${port}`)
});
