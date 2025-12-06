const { Pool }=require('pg');
const pool=new Pool({
    host:"localhost",
    port:'5432',
    user:'Anas',
    password:'Anas48',
    database:'KeyValue'
})

async function Connection(query,params=[]) {

    try{
      const client=await pool.connect();
      console.log("connected to postgres");
      
      const res=await client.query(query,params);
    //   console.log("query result-->");

      client.release();

    return res;
      
    }
    catch(err){
        console.log(err);
    }
    
}

module.exports={Connection};
