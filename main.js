
p1="";
p2="";

var web= document.getElementById("web1");

Webcam.set({
    width:360,
    height: 250,
    image_format:"png",
    png_quality:100
});

Webcam.attach("#web1");

function take(){
    Webcam.snap(function(data_uri){
        document.getElementById("preveiw").innerHTML= "<img id='photo' src='"+data_uri+"'>'";
    } );
}

classifier= ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/pSHL1-Qkv/model.json", modelLoaded);

function modelLoaded(){
      console.log("model loaded");
}

function speak(){
    lbphoto = window.speechSynthesis;
    data1= "the first prodiction is"+p1;
    data2= " and the second prodiction is"+p2;

    thisp = new SpeechSynthesisUtterance( data1 + data2);
    lbphoto.speak(thisp);
}

function check(){
    img1 = document.getElementById("photo");
    classifier.classify(img1 , gotresult);
    speak();
}

function gotresult(error , result){
    if (error) {
        console.error(error);
    }

    else{
        console.log(result);
        p1= result[0].label;
        p2= result[1].label;
        document.getElementById("e1").innerHTML=p2;
        document.getElementById("e2").innerHTML=p2;

        if (p1 == "nice") {
            document.getElementById("e1").innerHTML= p1+"'<span>'&#128076;'</span>'";
            document.getElementById("e2").innerHTML= p2+"'<span>'&#128076;'</span>'";
        }

        else if (p1 == "good") {
            document.getElementById("e1").innerHTML= p1+"'<span>'&#128077;'</span>'";
            document.getElementById("e2").innerHTML= p2+"'<span>'&#128077;'</span>'";
        }

        else if (p1 == "bad") {
            document.getElementById("e1").innerHTML= p1+"'<span>'&#128078;'</span>'";
            document.getElementById("e2").innerHTML= p2+"'<span>'&#128078;'</span>'";
        }

        else if (p1 == "up") {
            document.getElementById("e1").innerHTML= p1+"'<span>'&#128070;'</span>'";
            document.getElementById("e2").innerHTML= p2+"'<span>'&#128070;'</span>'";
        }

        else if (p1 == "down") {
            document.getElementById("e1").innerHTML= p1+"'<span>'&#128071;'</span>'";
            document.getElementById("e2").innerHTML= p2+"'<span>'&#128071;'</span>'";
        }
    
    }

    
}