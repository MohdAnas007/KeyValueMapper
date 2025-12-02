const { time } = require("console");
const axios=require('axios');

// console.log(random);
async function sendCommand2(keyToReturn) {
    try{
        const res=await axios.get(`http://localhost:8000/getkey/${keyToReturn}`);
        console.log(res.data);

    }
    catch (err){
        if(err.response){
            console.log(err.response.data);
            console.log("status code",err.response.status);
        }

    }
    
}
async function sendCommand(key,val){

    try{
        const res=await axios.post(`http://localhost:8000/postvalue`,{key,val})
        // console.log(res);
        console.log(res.data);
        // console.log(res);
        console.log("success");
    }
    catch (err){
       if(err.response){
        console.log(err.response.data);
        console.log("status code",err.response.status);
        


       }
    }
}
function key(){
    return "Key"+(Math.floor(Math.random()*5456));

}
function val(){

    return Math.floor(Math.random()*100);
}
// post api 
function ReqtoSelect(){
    const n=Math.random();
    if(n<0.45){
        return true;

    }

    return false;

}
async function TestApi(test=50){
   
    let start=Date.now();
    for(let i=0;i<test;i++){

       
        
         if(ReqtoSelect()){
                const value=val();
                const keys=key();
                await  sendCommand(keys,value);
         }
         else{
            const keys=key();
            await sendCommand2(keys);
         }
       


    }
    let end=Date.now();
   const timetaken=(end-start)/1000;
   console.log("time taken ",timetaken.toFixed(2));
   console.log("Request/sec",(test/timetaken).toFixed(2));

}
TestApi(10000*2);
