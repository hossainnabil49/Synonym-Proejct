const express = require('express');
const app = express()
const Wordnet = require('./lib/wordnet');
const wordnet = new Wordnet();
let wordbank=[]
let test="1";
const data={array:test}
let checker=false;
    //loads in the static files in the view directory
app.use(express.static("./"));  
app.use(express.json());
app.set('views', './views');
app.set('view engine', 'pug');

    app.get("/",async(req,res)=>{
      res.render("wordSelector",{wordbank:wordbank,checker:checker});
      console.log(wordbank)
    })

    app.post("/",async(req,res)=>{
      
      
      
      let current=req.body.word;
      
      wordnet.open()
      .then(() => wordnet.lookup(current))
      .then((results) => {
        wordbank=[]
        results.forEach((result) => {
        if(result.lemma==current){
          
       
         wordbank.push({id:result.synsetOffset, lemma:result.lemma, synonyms:result.synonyms,desc:result.gloss});
         
          }
      
      
        });
        
          
          
      test=2;
      checker=true;
      res.render("wordSelector",{wordbank:wordbank,checker:checker});
      
      })
      
      .then(() => wordnet.close());
       
      
      
    })
    app.get("/:id",async(req,res)=>{
      let currentWord={}
     console.log(req.params.id)
     Object.keys(wordbank).forEach(key => {
      if(wordbank[key].id==req.params.id){
        currentWord=wordbank[key]

    }
      

    })
    res.render("selectedWord",{currentWord:currentWord})
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