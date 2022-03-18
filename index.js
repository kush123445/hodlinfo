//console.log("bhole");
import idata from  "./model.js";

import fetch from 'node-fetch';
import expresss from 'express';
import "./db.js";
const app = expresss();

import bodyparserr from "body-parser";

//const static= path.join
app.use(bodyparserr.urlencoded(
  {
    extended:true
  }
));
app.use(bodyparserr.json());

app.set("view engine","hbs");

app.use(expresss.static("public"));
var data;

app.get("/data",(req,res)=>
  {
    gett();
    
async function gett() {

  console.log("ram")
  console.log( )

if(await idata.findOne()!=null)
{
  console.log("ytr")
 //await  idata.deleteMany();
  const senddata= await idata.find().limit(10);
  
  console.log(senddata);
  
    
       
    
 

  res.send(senddata);
}
else{
console.log("kbkjv");

  const weather = await fetch(
      "https://api.wazirx.com/api/v2/tickers"
  );
  let response = await weather.json();
  data=response;
//  var i;
var count=0;
//console.log(response)
  for( var i in data)
  {
    console.log(data[i]["open"]);
    count++;
 
  


  try{
   // console.log(req.body);
    const additemm= new idata({ 

      name: data[i]["name"],
      buy:data[i]["buy"],
      sell:data[i]["sell"],
      volume:data[i]["volume"],
      last:data[i]["last"],
      base_unit:data[i]["base_unit"]

        
    })
    const insertdata= await additemm.save().then((insertdata)=>{
         console.log(insertdata);
       // res.json(insertdata);

    }).catch((e)=>{
        console.log(e);
    })
    
    
  
}catch(e){
console.log(e)
}
  }
  console.log(count);
}
}

});



app.get("/",(req,res)=>
{
    
     
  res.render("index.hbs");
});


        
    



app.listen(5500,()=>
{
    console.log("ljhkbkhhghg");
    
});