const axios=require('axios');
const key=process.argv[3];
let val="";
for(let i=4;i<process.argv.length;i++){
    

    val+=process.argv[i]+" ";

}
val=val.trimEnd();
console.log(val);

console.log(val);

const command=process.argv[2];
// console.log(process.argv[2]);
async function sendCommand(){

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



if(command==='put'){
    if(!key || !val){
        console.log("Please Enter valid command");
        process.exit(1);
        


    }


sendCommand();



}
else if(command==='get'){
    // console.log("hello");
    const keyToReturn=key;
    // console.log(keyToReturn);

    sendCommand2(keyToReturn);




    

}
else{

    console.log("enter valid command");
}





