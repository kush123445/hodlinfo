
/*fetch( {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "test",
    }),
  }).then(async (response) => {
    const data = await response.text();
    console.log(data)
  });*/
var counter=1;
var table = document.getElementById('table');



var tr = document.createElement('tr');


var td1= document.createElement('td')
var text1 =document.createTextNode("name")

var td2=document.createElement('td')
var text2 =document.createTextNode("last")

var td3=document.createElement('td')
var text3 =document.createTextNode("buy")

var td4=document.createElement('td')
var text4 =document.createTextNode("sell")

var td5=document.createElement('td')
var text5 =document.createTextNode("volumes")

var td6=document.createElement('td')
var text6 =document.createTextNode("base_unit")

var td7=document.createElement('td')
var text7 =document.createTextNode("#")

td1.appendChild(text1);
td2.appendChild(text2);
td3.appendChild(text3);
 td4.appendChild(text4);
td5.appendChild(text5);
td6.appendChild(text6);
td7.appendChild(text7);

tr.appendChild(td7);
tr.appendChild(td1);
tr.appendChild(td2);
tr.appendChild(td3);

tr.appendChild(td4);
tr.appendChild(td5);
tr.appendChild(td6);



 table.appendChild(tr);


  let fetchRes = fetch(
    `http://localhost:5500/data`);
      
            // fetchRes is the promise to resolve
            // it by using.then() method
            fetchRes.then(res =>
                res.json()).then(d => {
                    console.log(d)

                 

                    const newArr = d.map(myFunction)

function myFunction(num) {

console.log(num.name)
console.log(num.buy)
console.log(num.last)
console.log(num.sell)


    
    var tr = document.createElement('tr');


   var td1= document.createElement('td')
   var text1 =document.createTextNode(`${num.name}`)

   var td2=document.createElement('td')
   var text2 =document.createTextNode(`${num.last}`)

   var td3=document.createElement('td')
   var text3 =document.createTextNode(`${num.buy}`)

   var td4=document.createElement('td')
   var text4 =document.createTextNode(`${num.sell}`)

   var td5=document.createElement('td')
   var text5 =document.createTextNode(`${num.volume}`)

   var td6=document.createElement('td')
   var text6 =document.createTextNode(`${num.base_unit}`)

   var td7=document.createElement('td')
   var text7 =document.createTextNode(`${counter++}`)

   td1.appendChild(text1);
   td2.appendChild(text2);
   td3.appendChild(text3);
    td4.appendChild(text4);
   td5.appendChild(text5);
   td6.appendChild(text6);
   td7.appendChild(text7);

   tr.appendChild(td7);
   tr.appendChild(td1);
   tr.appendChild(td2);
   tr.appendChild(td3);
   
   tr.appendChild(td4);
   tr.appendChild(td5);
   tr.appendChild(td6);
  


    table.appendChild(tr);
  

    
   // document.getElementById("tb").appendChild(tr);
} 



                })





const numbers = [65, 44, 12, 4];








       
   


