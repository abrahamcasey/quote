const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));


app.get('/api/quotes/random' , (req , res , next)=>{
const randomElement  = getRandomElement(quotes);
res.send({quote: randomElement});

});


app.get('/api/quotes' , (req , res  , next) =>{
  if(!req.query.hasOwnProperty('person')){
res.send({quotes: quotes});


  }
else{
const personElement = quotes.filter(element => element.person === req.query.person)
res.send({quotes: personElement});
}


});


app.post('/api/quotes' , (req , res ,next)=>{
if(req.query.quote && req.query.person){
  const newQuote  = {quote:req.query.quote , person:req.query.person};
  quotes.push(newQuote);
  res.send({quotes:newQuote});
}
 else{
res.status(400).send();

}


});




app.listen(PORT , ()=>{
  console.log(`Server is listening on ${PORT}`);
});