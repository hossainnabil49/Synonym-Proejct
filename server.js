const express = require('express');
const app = express()
const Wordnet = require('./views/wordnet');
const wordnet = new Wordnet();
let wordbank=[]
    //loads in the static files in the view directory
app.use(express.static("./"));  
app.use(express.json());
app.set('views', './views');
app.set('view engine', 'pug');

    app.get("/",async(req,res)=>{
      res.render("wordSelector.pug");
    })

    app.post("/",(req,res)=>{
      
      console.log(req.body.word);
      
      let current=req.body.word;
      
      wordnet.open()
      .then(() => wordnet.lookup(current))
      .then((results) => {
        wordbank=[]
        results.forEach((result) => {
        if(result.lemma==current){
          
       
         wordbank.push({ lemma:result.lemma, synonyms:result.synonyms,desc:result.gloss});
         
          }
      
      
        });
        
      res.render("wordSelector.pug");
      console.log(wordbank);
      
      })
      
      .then(() => wordnet.close());
      
      
      
      
    })

    app.listen(3000);
    console.log("Server Running at PORT 3000  CNTL-C to quit");
    console.log("To Test");
    console.log("http://localhost:3000/");

    function submit(word){
        
        let current=word;
         wordbank=[];
      wordnet.open()
      .then(() => wordnet.lookup(current))
      .then((results) => {
        
        results.forEach((result) => {
        if(result.lemma==current){
          
       
         wordbank.push({ lemma:result.lemma, synonyms:result.synonyms,desc:result.gloss});
         
          }
      
      
        });
        
        console.log(wordbank)
      
      })
      
      .then(() => wordnet.close());
      
      
      }