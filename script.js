const Base_Url ='https://latest.currency-api.pages.dev/v1/currencies';

let dropdown = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("button");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");


for(let select of dropdown) {
    for(currCode in countryList){
    let newOption = document.createElement("option");
        newOption.innerHTML= currCode;
        newOption.value = currCode;
     if(select.name === "from" && currCode === "USD"){
        newOption.selected = "selected";
     } else if(select.name === "to" && currCode === "PKR"){
        newOption.selected = "selected";
     }
        select.appendChild(newOption);
    } 
     select.addEventListener("change",(evt)=>{
     updateFlag(evt.target);
 });  
}

let updateFlag = (element)=>{
   let currCode = element.value;
   let countryCode = countryList[currCode];
   let newSrc =`https://flagsapi.com/${countryCode}/flat/64.png`;
   let img = element.parentElement.querySelector("img");
   img.src = newSrc;
}
 btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    if(amtval === "" || amtval < 0){
        amtval = 1;
        amount.value = "1";
    }
    let URL =`${Base_Url}/${fromCurr.value.toLowerCase()}.json`
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let finalAmt = amtval * rate;
    let msg = document.querySelector(".msg");
    msg.innerHTML = `${amtval} ${fromCurr.value} =  ${finalAmt} ${toCurr.value}`;
    
    
    
 });





