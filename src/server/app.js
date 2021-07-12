const {response, request} = require("express");
const express = require("express");
const app = express();
const port = 3000;

app.get('/', (request, response) => {
    response.send("HEllo world");
});


/*
app.get('/products/:id?', (request, response) =>{
    const pid = request.params["id"];
    const amount = request.query.amount;

    response.send(`Radi id ${pid}, amount: ${amount}`);

})*/

app.listen(port,()=>{
    console.log("Listen at http:localhost:"+port);
});