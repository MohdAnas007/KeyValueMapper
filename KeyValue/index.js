
const express=require('express');
const PORT=8000;
const app=express();
const fs=require('fs');
app.use(express.json());
 function checkKey(key){
    const file=fs.readFileSync('key.txt','utf-8');
    const word=file.trim().split('\n');
    // console.log(word);

    for(let x of word){
        if(x===key){
            return true;

        }
    }

    return false;

 }




app.post('/postvalue',(req,res)=>{
    const {key,val}=req.body;
    // console.log(key,val); 
    // check here if the key is already present or not 
    if(checkKey(key)){
        res.status(400).json({"message":"key is already present"});
        return ;

    }

    fs.writeFile('key.txt',`${key}\n`,{flag:'a',encoding:'utf-8'},(err)=>{console.log(err);});
    fs.writeFile('values.txt',`${String(val)}\n`,{flag:'a',encoding:'utf-8'},(err)=>{console.log(err);});
        
        
        
        
        
        
    res.status(201).json({
    "message":"key value recieved",
    "key":key,
    "value":val


   });
  


  

   
})

app.get('/getkey/:somekey',(req,res)=>{
    const key=req.params.somekey;
    // console.log(key);

    // console.log(key);    
    let file1=fs.readFileSync('key.txt','utf-8');
    file1=file1.trim().split('\n');

    let file2=fs.readFileSync('values.txt','utf-8');
    file2=file2.trim().split('\n');

    let index=-1;
    for(let i=0;i<file1.length;i++){
        if(file1[i]===key){
            index=i;
            break;

        }
    }
    if(index==-1){
        res.status(400).json({"message":"key not present "});
        return;

    }
    else{
            let valToReturn=file2[index];
            valToReturn=valToReturn.trim();

    // console.log(valToReturn);
            res.status(201).send(`value is -> ${valToReturn}`);
            return;

    }
    



   
    // console.log(file1,file2);
    res.status(500).json({"message":"server error"});

})



app.listen( PORT,()=>{

    console.log("Server started");
})