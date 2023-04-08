
const {v4 : uuidv4} = require('uuid')
const route =require('express').Router();
const noteData= require('../db/db.json');
const fs= require('fs');
const userId= uuidv4()



console.log( "our json db has this: ", noteData)


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

route.post('/notes',(req,res) => {
const {title, text} = req.body;
const newNote= {
    title,
    text,
    notes_id: userId
};{
if (title && text){
    fs.readFile('./db/db.json', 'utf8',(err,data) => {
        if (err){
            console.error(err);
        } else {
            const parsedData= JSON.parse(data)
            parsedData.push(newNote)
          fs.writeFile('./db/db.json', JSON.stringify(parsedData, null, 4), writeErr => {
            writeErr? console.error(writeErr):console.info("note written to file system");

          }
          )
        }

    }) 
    const response={
        message: "success",
        body: newNote
    }
    console.log(response)
    res.status(201).json(response)

    }else{
        res.status(500).json('error in posting review');
    }
    
}


});

route.delete('/notes/:id',(req,res) => {
    const requestedId= req.params.id;
    fs.readFile('./db/db.json','utf8', (err, data)=>{
        if (err){
            console.log('error reading file');
        } else{
            const parsedData= JSON.parse(data)
            const delNoteIndex= parsedData.findIndex((note) => note.id == requestedId);
                parsedData.splice(delNoteIndex,1);
                fs.writeFile('./db/db.json', JSON.stringify(parsedData, null, 5), (writeErr) => {
                if (writeErr) {
                console.log("error writing file")
                 } else{ 
                     console.log("note has been deleted");
                     res.send()
                 }
        });
       
    }
})


    });


    
module.exports= route