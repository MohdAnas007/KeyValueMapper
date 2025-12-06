
const express=require('express');

const {Connection}=require('./connection/connection');

const PORT=8000;
const app=express();
const fs=require('fs');
app.use(express.json());
//  function checkKey(key){
//     const file=fs.readFileSync('key.txt','utf-8');
//     const word=file.trim().split('\n');
//     // console.log(word);

//     for(let x of word){
//         if(x===key){
//             return true;

//         }
//     }

//     return false;

//  }




app.post('/postvalue',async (req,res)=>{
    const {key,val}=req.body;
    // console.log(key,val); 
    // check here if the key is already present or not 
    // console.log(key,val);
   


    
    
    const result2=await Connection(`SELECT COUNT(*) FROM store WHERE "Key"=$1`,[key]);
    if(parseInt(result2.rows[0].count)>0){
        console.log(result2.rows.length);
        res.status(400).json({"message":"key is already present"});
        return ;

    }
    else {
         const query =`INSERT INTO store("Key","Value") VALUES($1,$2)`;
         const params=[key,val];
         const result =await Connection(query,params);
         console.log("value added successfully");
         res.status(201).json({"message":"value added"});
         return ;



    }

})

app.get('/getkey/:somekey',async (req,res)=>{
    const key=req.params.somekey;
    const query=`SELECT * FROM store WHERE "Key"=$1 `;
    const params=[key];
    const result= await Connection(query,params);
    console.log(result.rows);
    if(result.rows.length==0){
        res.status(404).json({"message":"key not found"});
        return ;


    }
    else{
        res.status(201).json({value:result.rows[0].Value});
        return;

    }

})



app.listen( PORT,()=>{

    console.log("Server started");
})