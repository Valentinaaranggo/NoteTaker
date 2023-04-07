const express= require('express');
const path= require('path');

const app= express();
const PORT= process.env.port || 3001; //base route

app.use(express.static('public')); // middleware to serve static files in public folder
app.use(express.json());


app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html'))); // serves index.html file to / route

app.get('/notes',(req, res) => 
    res.sendFile(path.join(__dirname,'public/notes.html'))
);


app.listen(PORT,()=>
  console.log(`app is listening at http://localhost:${PORT}`)
  );