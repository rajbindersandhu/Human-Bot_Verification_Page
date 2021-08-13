const imgArray=["Images/2018_08_10_51126_1533897584._large.jpg",
"Images/a7bcb1fb3dfec9a3e0b516ce4d0aadd0.jpg",
"Images/hOIuY.jpg",
"Images/images(1).jpg",
"Images/images(2).jpg",
"Images/images(3).jpg",
"Images/images.jpg",
"Images/zMoo4.jpg"];

let box = document.querySelectorAll(".imgBox");


let randomImageArray =imgGenerator(imgArray);
let copyIndex = Math.floor(Math.random()*randomImageArray.length);
randomImageArray.push(randomImageArray[copyIndex]);
let shuffleImageArray = shuffle(randomImageArray);


let temp=[];
let i=0;
let j=1;         // this is for elemnts for jArray starting from 1 and going upto 5 
let jArray=[];   // this is to record index for data-ns-test as indexing doesnot follow loop indexing , i.e[1,2,3,4,5]

while(i<box.length){
    if(temp.indexOf(shuffleImageArray[i]) == -1){
        box[i].setAttribute("data-ns-test",`img${j}`);
        box[i].src=`${shuffleImageArray[i]}`;
        temp.push(shuffleImageArray[i]);
        jArray.push(j);
        j++;
    }
    else{
        
        box[i].setAttribute("data-ns-test",`img${jArray[shuffleImageArray.indexOf(shuffleImageArray[i])]}`);  // this is done to get indexing for datd-ns-test which would be same far shuffleImageArray repeated element and its indexOf willl give its first occurance , which would be same for jArray
        box[i].src=`${shuffleImageArray[i]}`;
        
    }
    box[i].setAttribute("id",`imgId${i}`);  
    i++;
}

box.forEach((element)=>{
    element.addEventListener("click" , imgFunction);
});

function imgGenerator(argArray){
    let tempArray = [];
    let index = Math.floor(Math.random()*argArray.length);
    for(let i=0;i<5;i++){
        while(tempArray.indexOf(argArray[index]) !=-1){
            index = Math.floor(Math.random()*argArray.length);
        }
        tempArray.push(argArray[index]);
    }
    return tempArray; 
}

function shuffle(array){
    let tempImgArray=[];
    let tempIndexArray = [];
    let index = Math.floor(Math.random()*array.length);
    for(let i=0;i<array.length;i++){
        while(tempIndexArray.indexOf(index) !=-1){
            index = Math.floor(Math.random()*array.length);
        }
        tempIndexArray.push(index);
        tempImgArray.push(array[index]);
    }
    return tempImgArray;
}

let memroryImgArray=[];
let copyIndexArray=[];
let clickCount = 0;

function imgFunction(){
    let idValue = this.getAttribute("id");
    if(copyIndexArray.indexOf(idValue) == -1){
        copyIndexArray.push(idValue);
        memroryImgArray.push(this);
        clickCount++;
    }
    if(clickCount>0){
        callReset();
        if(clickCount == 2){
            callVerify();
        }
        else if(clickCount > 2){
            callVerify(clickCount);
        }
    }
    
}

function callReset(){
    document.getElementById("reset").style.display = "block";
}
function callVerify(count){
    document.getElementById("btn").style.display = "block";
    if(count>2){
        document.getElementById("btn").style.display = "none";
    }
}

document.getElementById("reset").addEventListener("click", timeToReset);
document.getElementById("btn").addEventListener("click",runVerification);

function timeToReset(){
    document.location.reload();
}
function runVerification(){
    if(memroryImgArray[0].getAttribute("data-ns-test") == memroryImgArray[1].getAttribute("data-ns-test")){
        humanVerfied();
    }
    else{
        invalidVerfication();
    }
}

function humanVerfied(){
    document.querySelector(".verified").style.display="block";
}
function invalidVerfication(){
    document.querySelector(".confused").style.display="block";
}

