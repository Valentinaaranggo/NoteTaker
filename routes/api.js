
const {v4 : uuidv4} = require('uuid')
const route =require('express').Router();
const noteData= require('../db/db.json');
const fs= require('fs');
const userId= uuidv4()
const path= require('path');
const { send } = require('process');



console.log( "our json db has this: ", noteData)


//get request to serve db in json
route.get('/notes', (req, res) =>{

    fs.readFile('./db/db.json', 'utf8',(err,data) => {
        if (err){
            console.error(err);
        }
        else{
            const parsedData=JSON.parse(data);
            res.json(parsedData);
        }
    })

});

//post request for a new note
route.post('/notes',(req,res) => {
const {title, text} = req.body;
var id= userId;
const newNote= {
    title,
    text,
    id
};
    fs.readFile('./db/db.json', 'utf8',(err,data) => {
        if (err){
            console.error(err);
        } else {
            const parsedData= JSON.parse(data)
            parsedData.push(newNote)
          fs.writeFile('./db/db.json', JSON.stringify(parsedData, null, 5), writeErr => {
            writeErr? console.error(writeErr): console.log("note written to file system");

          }
          );
          res.send()
        }

    }) 
  
    });
 
//delete request to delete a note
route.delete('/notes/:id',(req,res) => {
    const requestedId=req.params.id
   for (var i=0; i< noteData.length; i++){
    var note=noteData[i];
    
    if (note.id=== requestedId){
        noteData.splice(i,1);
        fs.writeFile('./db/db.json', JSON.stringify(noteData, null, 5) , err => {
            if (err){
             console.log(err)
             }else{
                console.log("object deleted");
                res.send();
             } 
            
        });
    }
   }
           
    
       
    });



    
module.exports= route