estatus="";
objetos=[];
function setup(){
    canvas=createCanvas(400,400);
    canvas.center();
    camara=createCapture(VIDEO);
    camara.size(400,400);
    camara.hide()
    detector=ml5.objectDetector('cocossd',modelocargado);
    document.getElementById("estatus").innerHTML="detectando objetos";
}
function modelocargado(){
    console.log("coco se a cargado");
    estatus=true;
}
function draw(){
    image(camara,0,0,400,400);
    if(estatus!=""){
        rojos=Math.floor(Math.random()*255)+1;
        verdes=Math.floor(Math.random()*255)+1;
        asules=Math.floor(Math.random()*255)+1;
        detector.detect(camara,gotResult);
        for(i=0;i<objetos.length;i++){
            document.getElementById("estatus").innerHTML="objetos detectados";
            document.getElementById("cantidad").innerHTML="objetos detectados"+objetos.length;
            fill(rojos,verdes,asules);
            presision=floor(objetos[i].confidence*100);
            text(objetos[i].label + presision + "%", objetos[i].x-5,objetos[i].y-5)
            noFill();
            stroke(rojos,verdes,asules);
            rect(objetos[i].x,objetos[i].y,objetos[i].width,objetos[i].height);
        }
    }
}
function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objetos=results;
    }
}



