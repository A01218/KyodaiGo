let mapDiv, focusImg,  battleDiv, quizDiv, question, opt1, opt2, opt3, opt4, quizResult, nextButton, getButton, backButton, encounterLog;
let correctAns, wrongAns;

let currentZoom = 19;
let gmap, mark;
let intervalFunc;
let myPos;

let focusedMermaid;
let mermaidLv;
let mermaids = [];
let mermaidsAll = [];
let mermaidMark = []; 
let captured = [];
let quizzes = [];
let quiz;

let difficulty, escapeTurns;

function quizFunc(quiz) {
    let numArr = [0, 1, 2, 3]
    let randomArr = []

    for(let i = 0; i < 4; i++) {
        let randomIndex = Math.floor( Math.random()*numArr.length );
        let randomNum = numArr[randomIndex];
        randomArr[i] = randomNum;
        numArr = numArr.filter( function(number) {
            return number !== randomNum
        } )
    }

    console.log(randomArr) //ランダムな整数配列 0にあたる選択肢が正解

    question = document.getElementById("question");
    opt1 = document.getElementById("opt1");
    opt2 = document.getElementById("opt2");
    opt3 = document.getElementById("opt3");
    opt4 = document.getElementById("opt4");

    question.innerText = quiz.question;
    opt1.innerText = quiz.options[randomArr[0]];
    opt2.innerText = quiz.options[randomArr[1]];
    opt3.innerText = quiz.options[randomArr[2]];
    opt4.innerText = quiz.options[randomArr[3]];

}

function quizReload() {
    mermaidLv = Object.keys(mermaids).find(key => mermaids[key].includes(focusedMermaid));
    let quizArr = difficulty[mermaidLv];
    if(correctAns === quizArr.length) {
        getButton.hidden = false;
        encounterLog.innerText = "クイズを出してこないようだ…。" + focusedMermaid.name + "と仲良くなった！";
    }else if(wrongAns === escapeTurns[mermaidLv]) {
        backButton.hidden = false;
        encounterLog.innerText = focusedMermaid.name + "に逃げられた。"
    }else {
        encounterLog.innerText = "野生の" + focusedMermaid.name + "が現れた!";
        quiz = quizzes[quizArr[correctAns]][Math.floor( Math.random()*quizArr[correctAns].length )];
        console.log(quiz) //ランダムに選ばれたクイズの情報
        quizFunc(quiz);
        quizDiv.hidden = false;
    }
    console.log(mermaidLv);
    console.log(quizArr[correctAns]);
}

function answerFunc() {
    let selectedOption = document.querySelector('input[name="group1"]:checked');
    let label = document.querySelector('label[for="' + selectedOption.id + '"]');
    
    if(selectedOption) {
        if(label.textContent === quiz.options[0]){
            correctAns++;
            quizResult.innerText = "正解！";
        }else if(label.textContent !== quiz.options[0]) {
            wrongAns++;
            quizResult.innerText = "残念!";
        }
        console.log(label.textContent, quiz.options[0]); //選んだtext, 正解のtext
        console.log(correctAns, wrongAns); //現在の正解数, 不正解数

        quizDiv.hidden = true;
        quizResult.hidden = false;
        nextButton.hidden = false;
        selectedOption.checked = false;
    }
}

function nextButtonClick() {
    quizReload();
    quizResult.hidden = true;
    nextButton.hidden = true;
}

function getButtonClick() {
    captured[focusedMermaid.number-1] = focusedMermaid;
    battleDiv.hidden = true;
    getButton.hidden = true;
    mapDiv.hidden = false;
    mermaidMark[focusedMermaid.number-1].setVisible(false);
    
    console.log("get!" + focusedMermaid.number) //get! キャラ名
    console.log(captured); //これまでに捕まえたキャラの情報
}

function backButtonClick() {
    battleDiv.hidden = true;
    backButton.hidden = true;
    mapDiv.hidden = false;

    console.log("miss!" + focusedMermaid.number) //miss! キャラ名
    console.log(captured); //これまでに捕まえたキャラの情報
}

function loadMermaids() {
    const req = new XMLHttpRequest();                 
    req.addEventListener("readystatechange", () => {        
        if(req.readyState === 4 && req.status === 200) {    
            mermaids = JSON.parse(req.responseText);        
        }
    });
    req.open("GET", "mermaids.json");               
    req.send();                                     
}

function loadQuizzes() {
    const req = new XMLHttpRequest();                 
    req.addEventListener("readystatechange", () => {        
        if(req.readyState === 4 && req.status === 200) {    
            quizzes = JSON.parse(req.responseText);        
        }
    });
    req.open("GET", "quizzes.json");               
    req.send();    
}

function displayData(lat, lng, accu) {
    var txt = document.getElementById("txt");
    txt.innerHTML = "緯度, 経度 :" + lat + ", " + lng + "<br>"
    + "精度 :" + accu;
}

function placeMermaids() {
    focusImg = document.getElementById("focusImg");  
    battleDiv = document.getElementById("battle");
    encounterLog = document.getElementById("encounterLog");
    quizDiv = document.getElementById("quizDiv");
    quizResult = document.getElementById("result");
    nextButton = document.getElementById("nextButton")
    getButton = document.getElementById("getButton");
    backButton = document.getElementById("backButton");

    mermaidsAll = [...mermaids.Lv0, ...mermaids.Lv1, ...mermaids.Lv2, ...mermaids.Lv3, ...mermaids.LvLegend]

    for(let i = 0; i < mermaidsAll.length; i++) {
        let mermaid = mermaidsAll[i];
        let mermaidNum = mermaid.number;
        let img = "./imgs/" + mermaid.img;
        let pos = new google.maps.LatLng(mermaid.lat, mermaid.lng); 
        let icon = {                                 
            url: img,                   
            scaledSize: new google.maps.Size(60, 60)    
        };
        mermaidMark[mermaidNum-1] = new google.maps.Marker({   
            map: gmap,                       
            position: pos,                  
            icon: icon,                              
            // title: mermaid.name,
            optimized: false,              
        });
        mermaidMark[mermaidNum-1].addListener("click", ()=>{
            focusedMermaid = mermaid
            console.log("focus!"+mermaidNum);
            focusImg.src = img;
            mapDiv.hidden = true;
            correctAns = 0;
            wrongAns = 0;
            quizReload();
            battleDiv.hidden = false;
        })
    }
}

function updateMap() {

    navigator.geolocation.watchPosition((position)=>{
        let lat= position.coords.latitude;
        let lng = position.coords.longitude;
        let accu = position.coords.accuracy;
        myPos = new google.maps.LatLng(lat, lng);
    
        displayData(lat, lng, accu);
    }, (error) => {                               
    }, {
        enableHighAccuracy: true                   
    })
    
    gmap.setCenter(myPos);
    mark.setPosition(myPos);
    
    if(gmap.getZoom() < 19) {
        gmap.setZoom(19)
    }
}

async function initMap() {

    loadMermaids();
    loadQuizzes();

    difficulty = {
        Lv0:      [],
        Lv1:      ["A"],
        Lv2:      ["A", "B"],
        Lv3:      ["A", "B", "C"],
        LvLegend: ["A", "B", "C", "C", "D"]
    }
    escapeTurns = {
        Lv0:      1,
        Lv1:      8,
        Lv2:      5,
        Lv3:      3,
        LvLegend: 1
    }

    mapDiv = document.getElementById("map");

    navigator.geolocation.getCurrentPosition((position)=>{
        let lat= position.coords.latitude;
        let lng = position.coords.longitude;
        let initPos = new google.maps.LatLng(lat, lng)

        gmap = new google.maps.Map(mapDiv, {
            center: initPos,
            zoom: currentZoom,
            tilt: 37.5,
            mapId: "206221e9066e4473",
            disableDefaultUI: true,
            zoomControl: true,
        })

        mark = new google.maps.Marker({
            map: gmap,
            position: initPos,
        })
        
        google.maps.event.addListener(gmap, 'zoom_changed', function(){
            let newZoom = gmap.getZoom();
            deltaTilt = (newZoom - currentZoom)*10
    
            gmap.setTilt(gmap.getTilt() + deltaTilt)
            currentZoom = newZoom
            
            if(newZoom < 19) {
                gmap.setZoom(19);
            }

            console.log(gmap.getZoom(), gmap.getTilt())
        })

        const buttons = [
            ["左を向く", "rotate", -20, google.maps.ControlPosition.LEFT_CENTER],
            ["右を向く", "rotate", 20, google.maps.ControlPosition.RIGHT_CENTER],
            ["上を向く", "tilt", 20, google.maps.ControlPosition.TOP_CENTER],
            ["下を向く", "tilt", -20, google.maps.ControlPosition.BOTTOM_CENTER],
        ];
        
        buttons.forEach(([text, mode, amount, position]) => {
            const controlDiv = document.createElement("div");
            const controlUI = document.createElement("button");
        
            controlUI.classList.add("ui-button");
            controlUI.innerText = `${text}`;
            controlUI.addEventListener("click", () => {
                adjustMap(mode, amount);
            });
            controlDiv.appendChild(controlUI);
            gmap.controls[position].push(controlDiv);
        });
        
        const adjustMap = function (mode, amount) {
            switch (mode) {
                case "tilt":
                    gmap.setTilt(gmap.getTilt() + amount);
                    break;
                case "rotate":
                    gmap.setHeading(gmap.getHeading() + amount);
                    break;
                default:
                    break;
            }
        };

        placeMermaids();

        intervalFunc = window.setInterval(updateMap, 500);

    }, (error) => {                                   
    }, {
        enableHighAccuracy: true                   
    })

}