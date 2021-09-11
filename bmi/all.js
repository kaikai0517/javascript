
var bmi =0;
var result=document.getElementById('result');
var btn=document.querySelector(".btn");
var condition ="";
var color="";
var height=0;
var weight=0;
var Today=new Date();
var date="";
var obj={};
var data = JSON.parse(localStorage.getItem('listData'))||[];
var card = document.querySelector(".col-md-8");
btn.addEventListener("click",count,false);
card.addEventListener("click",toggleDone,false);
updateList(data);
function count(){
    height = document.getElementById('height').value;
    weight = document.getElementById('weight').value;
    bmi = weight/((height/100)**2);
    bmi = bmi.toFixed(2);
    date=Today.getDate()+"-"+(Today.getMonth()+1)+"-"+Today.getFullYear();   
    choose(bmi);
}
function choose(bmi){
    if(bmi<18.5){
        condition = "體重過輕";
        color ="#31BAF9";
    }
    else if(18.5<=bmi&&bmi<24){
        condition = "理想";
        color ="#86D73F";
    }
    else if(24<=bmi&&bmi<27){
        condition = "體重過重";
        color ="#FF982D";
    }
    else if(27<=bmi&&bmi<30){
        condition = "輕度肥胖";
        color ="#FF6C03";
    }
    else if(30<=bmi&&bmi<35){
        condition = "中度肥胖";
        color ="#FF6C03";
    }
    else if(bmi>35){
        condition = "重度肥胖";
        color ="#FF1200";
    }
    showBmi(bmi,color,condition);
}
function showBmi(bmi,color,condition){
    if(condition!=""){
        result.innerHTML='<div class="result  text-center"><p class="h3 mb-0">'+bmi+'</p><small>BMI</small></div><div class="text h3">'+condition+'</div>';
        document.querySelector(".result").style.border="6px solid "+color+"";
        document.querySelector(".result").style.color=""+color+"";
        document.querySelector(".text").style.color=""+color+"";
        store();
    }
}
function store(){
    obj ={
        condition: condition,
        bmi: bmi,
        height: height,
        weight: weight,
        date: date,
        color: color,
    };
    if(obj.condition!=""){
    data.push(obj);
    updateList(data);
    localStorage.setItem("listData",JSON.stringify(data));
}
}
function updateList(items){
    var str ="";
    for(var i=0; i<items.length; i++){
        str +='<div class="card my-4 py-2" style="border-left:6px solid'+data[i].color+'"><div class="card-body d-flex justify-content-between align-items-center pb-0"><p>'+data[i].condition+'</p><p><span>BMI</span> '+data[i].bmi+'</p><p><span>weight</span> '+data[i].weight+'kg</p><p><span>height</span> '+data[i].height+'cm</p><span class="align-self-center mb-3">'+data[i].date+'</span><a data-index="'+i+'" class="btn mb-3 text-white" href="#" role="button" style="background-color:'+data[i].color+'">刪除</a></div></div>';
    } 
    card.innerHTML= str ;
}

function toggleDone(e){
    e.preventDefault;
    if(e.target.nodeName !== 'A'){return};
     var index =e.target.dataset.index;
    data.splice(index,1);
    localStorage.setItem("listData",JSON.stringify(data));
    updateList(data);
}