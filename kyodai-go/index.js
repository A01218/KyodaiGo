let moveButton, startPart, profilePart, bookPart, cardPart;

let startNameInput;
let startButton;

let gmap, mark;
let currentZoom = 19;
let myLat, myLng, myPos;
let mapInterval;
let placedMarks = [];

let mapPartDisplay;
let mapDiv, battleDiv;
let profileButton, escapeButton, focusImg, encounterLog, quizDiv;
let question, opt1, opt2, opt3, opt4, quizResult;

let editButton;
let profileImg, profileNameText, profileNameInput;
let creditNum = 0;
let myDegree;aa

let focusedMark;
let focusedObj;
let charas;
let allCharas = [];
let capturedCharas = [];
let tatekans;
let capturedTatekans = [];
let quizzes;
let quiz;
let correctAns, wrongAns;

let bgBox, bgCircles, bgLogo;

let appearance, difficulty, escapeTurns, credits, degrees;

let click1Sound, click2Sound, click3Sound, click4Sound, correctSound, wrongSound, getObjSound, getCreditSound;
// let encounterSound

// 管理者調整
function adjustment() {
    appearance = {
        radius:       50,
        number:       4,
        intervalSec:  [10, 20],
        stayMin:      [0.5,1],
        rate: {
            tatekan:  47,
            Lv1:      37,
            Lv2:      12.5,
            Lv3:      3,
            LvLegend: 0.5
        }
    };
    difficulty = {
        tatekan:  [],
        Lv1:      ["A"],
        Lv2:      ["A", "B"],
        Lv3:      ["A", "B", "C"],
        LvLegend: ["A", "B", "C", "D"]
    };
    escapeTurns = {
        tatekan:  1,
        Lv1:      4,
        Lv2:      3,
        Lv3:      2,
        LvLegend: 1
    };
    credits = {
        bachelor: {
            tatekan:  0,
            Lv1:      1,
            Lv2:      2,
            Lv3:      5,
            LvLegend: 8
        },
        master: {
            tatekan:  0,
            Lv1:      0,
            Lv2:      1,
            Lv3:      2,
            LvLegend: 3
        },
        doctor: {
            tatekan:  0,
            Lv1:      0,
            Lv2:      0,
            Lv3:      1,
            LvLegend: 2
        },
    };
    degrees = {
        bachelor: 140,
        master: 30,
        doctor: 20,
    };
};

// キャラとタテカンとクイズの情報をjsonファイルから入手
(function() {
    const req = new XMLHttpRequest();                 
    req.addEventListener("readystatechange", () => {        
        if(req.readyState === 4 && req.status === 200) {    
            charas = JSON.parse(req.responseText);
            allCharas = [...charas.Lv1, ...charas.Lv2, ...charas.Lv3, ...charas.LvLegend];
            console.log("jsonファイルからのキャラの情報の取得が完了");
            initFunc();
        }else {
            console.error("jsonファイルからのキャラの情報の取得に失敗");
        };
    });
    req.open("GET", "charas.json", true);               
    req.send();
})();

(function() {
    const req = new XMLHttpRequest();                 
    req.addEventListener("readystatechange", () => {        
        if(req.readyState === 4 && req.status === 200) {    
            tatekans = JSON.parse(req.responseText);        
            console.log("jsonファイルからのタテカンの情報の取得が完了");
            initFunc();
        }else {
            console.error("jsonファイルからのタテカンの情報の取得に失敗");
        };
    });
    req.open("GET", "tatekans.json", true);               
    req.send();
})();

(function() {
    const req = new XMLHttpRequest();                 
    req.addEventListener("readystatechange", () => {        
        if(req.readyState === 4 && req.status === 200) {    
            quizzes = JSON.parse(req.responseText);        
            console.log("jsonファイルからのクイズの情報の取得が完了");
            initFunc();
        }else {
            console.error("jsonファイルからのクイズの情報の取得に失敗");
        };
    });
    req.open("GET", "quizzes.json", true);               
    req.send();    
})();

// オープニングシーンを開始
function startOpening() {
    document.getElementById("firstPage").style.display = "none";
    setTimeout(function() {
        const colorsLogo = document.getElementById("colorsLogo");
        colorsLogo.classList.add("opaque");
        setTimeout(function() {
            colorsLogo.classList.remove("opaque");
            setTimeout(function() {
                const openingScene = document.getElementById("openingScene");
                openingScene.style.opacity = 0;
                setTimeout(function() {
                    openingScene.style.display = "none";
                }, 1500)
            }, 2800);
        }, 3500);
    }, 1500);
};

// マップ上にオブジェクトマークを配置
function placeMark(i) {
    let {radius, intervalSec, stayMin, rate} = appearance;
    function randomPos() {
        let r = Math.random()*radius;
        let theta = (Math.random()*360)*(Math.PI/180);
        let R = 6371008;
        let lat = myLat + (Math.floor((r*Math.sin(theta)*180)/(R*Math.PI)*10000000))/10000000;
        let lng = myLng + Math.floor((r*Math.cos(theta)*180)/(R*Math.cos(myLat*(Math.PI/180))*Math.PI)*10000000)/10000000;
        
        return [lat, lng];
    };
    function randomObj() {
        let num = Math.floor(Math.random()*1000);
        if(num < rate.tatekan*10) {
            return "tatekan";
        }else if(num < (rate.tatekan + rate.Lv1)*10) {
            return "Lv1";
        }else if(num < (rate.tatekan + rate.Lv1 + rate.Lv2)*10) {
            return "Lv2";
        }else if(num < (rate.tatekan + rate.Lv1 + rate.Lv2 + rate.Lv3)*10) {
            return "Lv3";
        }else{
            return "LvLegend";
        };
    };
    function randomNum(min, max) {
        return Math.random()*(max - min) + min;
    };
    
    let intervalTime = randomNum(intervalSec[0], intervalSec[1])*1000;
    let stayTime = randomNum(stayMin[0], stayMin[1])*60*1000;
    console.log(intervalTime, stayTime);

    setTimeout(function() {
        let pos = randomPos();
        let diff = randomObj();
        let obj;
        let content = document.createElement("img");
        content.className = "obj-mark";
        if(diff === "tatekan") {
            obj = tatekans[Math.floor(Math.random()*(tatekans.length))];
            content.src = "./imgs/tatekans/" + obj.img;
        }else{
            obj = charas[diff][Math.floor(Math.random()*(charas[diff].length))];
            content.src = "./imgs/charas/" + obj.img;
        };
        let mark = new google.maps.marker.AdvancedMarkerElement({
            map: gmap,
            position: new google.maps.LatLng(pos[0], pos[1]),
            content: content,
        });
        placedMarks[i] = {
            pos,
            obj,
            mark,
        };

        mark.addListener("click", function() {
            objMarkClick(placedMarks[i]); 
        });

        setTimeout(function() {
            content.classList.add("stay");
        }, 500);

        console.log("出現", placedMarks)
        
        let placedMark = placedMarks[i];
        
        setTimeout(function() {
            content.classList.remove("stay");
            setTimeout(function() {
                if(placedMarks[i] === placedMark) {
                    placedMarks[i].mark.setMap(null);
                    placedMarks[i] = null;
                    console.log("消滅", placedMarks)
                    placeMark(i);
                };
            }, 700);
        }, stayTime);
    }, intervalTime);
};

// マップとオブジェクトの更新(0.5s, 移動毎)
function updateMap() {
    gmap.setCenter(myPos);
    mark.setPosition(myPos);
    
    if(gmap.getZoom() < 19) {
        gmap.setZoom(19);
    };
};

function updateObjs() {
    navigator.geolocation.watchPosition((position)=>{
        myLat = position.coords.latitude;
        myLng = position.coords.longitude;
        myPos = new google.maps.LatLng(myLat, myLng);

        // console.log("シルエットの更新")
        // for(let i = 0; i < placedMarks.length; i++) {
        //     let mark = placedMarks[i].mark;
        //     if(mark) {
        //         let distance = google.maps.geometry.spherical.computeDistanceBetween(myPos, mark.position);
        //         let objClass = mark.content.classList;
        //         if(objClass.contains("silhoette") && distance <= 50) {
        //             objClass.remove("silhoette");
        //             mark.addListener("click", function() {
        //                 objMarkClick(placedMarks[i]);
        //             });
        //         }else if(!objClass.contains("silhoette") && distance > 50) {
        //             objClass.add("silhoette");
        //             google.maps.event.clearListeners(mark, "click");
        //         };
        //     };
        // };

        for(let i = 0; i < placedMarks.length; i++) {
            if(placedMarks[i]) {
                let distance = google.maps.geometry.spherical.computeDistanceBetween(myPos, mark.position);
                if(distance > 50) {
                    content.classList.remove("stay");
                    placedMarks[i].mark.setMap(null);
                    placedMarks[i] = null;
                    console.log("消滅", placedMarks)
                    placeMark(i);
                };
            };
        };
    }, () => {
        console.log("位置情報の取得に失敗");                        
    }, {
        enableHighAccuracy: true               
    });
};

// オブジェクトがキャラかタテカンかとキャラレベルを識別
function identifyObj(obj) {
    let kind, diff;
    if(obj.hasOwnProperty("type")) {
        kind = "chara"
        for(let i = 0; i < Object.keys(charas).length; i++) {
            if(Object.values(charas)[i].find(chara => chara.number === obj.number)) {
                diff = Object.keys(charas)[i];
            };
        };
    }else {
        kind = "tatekan";
        diff = "tatekan";
    };
    return [kind, diff];
};

// オブジェクトマークをクリックすると呼び出される関数
function objMarkClick(placedMark) {
    console.log("focus!"+placedMark.obj.number);
    focusedMark = placedMark;
    focusedObj = placedMark.obj;
    correctAns = 0;
    wrongAns = 0;
    moveButton.style.display = "none";
    profileButton.style.display = "none";
    const tiltDivs = document.getElementsByClassName("tilt-div");
    const rotateDivs = document.getElementsByClassName("rotate-div");
    for(let i = 0; i < 2; i++) {
        tiltDivs[i].style.display = "none";
        rotateDivs[i].style.display = "none";
    };
    const overlayStyle = document.getElementById("transparentOverlay").style;
    overlayStyle.display = "block";

    clearInterval(mapInterval);
    const position = new google.maps.LatLng(placedMark.pos[0], placedMark.pos[1]);
    gmap.panTo(position);
    function zoomIn() {
        if(currentZoom < 23) {
            currentZoom += 0.3;
            gmap.setZoom(currentZoom);
            setTimeout(zoomIn, 50);
        }else {
            overlayStyle.opacity = 1;
            setTimeout(function() {
                escapeButton.style.display = "flex";
                battleDiv.style.display = "flex";
                quizReload();
                if(identifyObj(focusedObj)[0] === "chara") {
                    focusImg.src = "./imgs/charas/" + focusedObj.img;
                    encounterLog.innerText = "野生の " + focusedObj.name + " が現れた!";
                    encountFunc(400, 1700);
                }else if(identifyObj(focusedObj)[0] === "tatekan") {
                    focusImg.src = "./imgs/tatekans/" + focusedObj.img;
                };
                setTimeout(function() {
                    focusImg.classList.add("bounce");
                }, 450);
                // encounterSound.play();
                overlayStyle.opacity = 0;
                setTimeout(function() {
                    overlayStyle.display = "none";
                    profileButton.style.display = "block";
                    for(let i = 0; i < 2; i++) {
                        tiltDivs[i].style.display = "block";
                        rotateDivs[i].style.display = "block";
                    };
                    mapInterval = setInterval(updateMap, 500);
                    currentZoom = 20;
                    gmap.setZoom(currentZoom);
                }, 150);
            }, 500);
        };
    };
    zoomIn();
};

// ログがaミリ秒後にbミリ秒間だけ表示
function encountFunc(a, b) {
    setTimeout(function() {
        encounterLog.classList.add("opaque");
        setTimeout(function() {
            encounterLog.classList.remove("opaque");
        }, b);
    }, a);
};

// クイズのリローディング
function quizReload() {
    const charaLv = identifyObj(focusedObj)[1];
    const quizArr = difficulty[charaLv];
    console.log(charaLv);
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
    
        question.innerText = quiz.question;
        opt1.innerText = quiz.options[randomArr[0]];
        opt2.innerText = quiz.options[randomArr[1]];
        opt3.innerText = quiz.options[randomArr[2]];
        opt4.innerText = quiz.options[randomArr[3]];
    };
    if(correctAns === quizArr.length) {
        escapeButton.style.display = "none";
        quizDiv.style.display = "none";
        if(identifyObj(focusedObj)[0] === "chara") {
            setTimeout(function() {
                focusImg.classList.remove("bounce");
            }, 150);
            encounterLog.innerText = "クイズを出してこないようだ…。\n" + focusedObj.name + " と仲良くなった！";
            encountFunc(200, 2000);
            setTimeout(function() {
                getObjSound.play();
            }, 400);

            let credit = credits[myDegree][charaLv];
            if(credit !== 0) {
                creditNum = creditNum + credit;
                localStorage.setItem("creditNum", creditNum);
                displayCredits();
                setTimeout(function() {
                    encounterLog.innerText = focusedObj.name + " から " + credit + "単位 もらった！";
                    encountFunc(0, 1800);
                }, 2800);
                setTimeout(function() {
                    getCreditSound.play();
                }, 3000);
                setTimeout(function() {
                    getFunc();
                }, 5400);
            }else {
                setTimeout(function() {
                    getFunc();
                }, 3000);
            };
        }else if(identifyObj(focusedObj)[0] === "tatekan") {
            encounterLog.innerText = focusedObj.name + " を見つけた!";
            encountFunc(600, 3000);
            setTimeout(function() {
                getObjSound.play();
            }, 1000);
            setTimeout(function() {
                getFunc();
            }, 4600);
        };
    }else if(wrongAns === escapeTurns[Object.keys(difficulty).find(key => difficulty[key] === quizArr)]) {
        escapeButton.style.display = "none";
        quizDiv.style.display = "none";
        encounterLog.innerText = focusedObj.name + " に逃げられた…";
        encountFunc(1500, 2000);
        setTimeout(function() {
            focusImg.classList.remove("bounce");
        }, 150);
        setTimeout(function() {
            focusImg.classList.add("disappear");
        }, 300);
        setTimeout(function() {
            (function() {
                let i = placedMarks.indexOf(focusedMark);
                if(placedMarks[i] === focusedMark) {
                    focusedMark.mark.setMap(null);
                    placedMarks[i] = null;
                    console.log("消滅", placedMarks)
                    placeMark(i);
                };
            })();
            backFunc();
            focusImg.classList.remove("disappear");
        }, 4500);
    }else {
        quiz = quizzes[quizArr[correctAns]][Math.floor( Math.random()*quizzes[quizArr[correctAns]].length )];
        console.log(quiz) //ランダムに選ばれたクイズの情報
        quizFunc(quiz);
        console.log(quizArr[correctAns]);
    };
};

// 回答時の正誤判定
function answerFunc(element) {
    if(element.textContent === quiz.options[0]){
        correctAns++;
        shape.classList.add("circle");
        correctSound.play();
    }else if(element.textContent !== quiz.options[0]) {
        wrongAns++;
        shape.classList.add("cross");
        wrongSound.play();
    };
    quizResult.style.display = "flex";

    console.log(element.textContent, quiz.options[0]); //選んだtext, 正解のtext
    console.log(correctAns, wrongAns); //現在の正解数, 不正解数

    setTimeout(function() {
        quizResult.style.display = "none";
        shape.classList.remove("circle", "cross");
        quizReload();
    }, 1500);
};

// ボタンクリック時に呼び出される関数
function moveButtonClick() {
    const profilePartDisplay = window.getComputedStyle(profilePart).display;
    const bookPartDisplay = window.getComputedStyle(bookPart).display;
    const cardPartDisplay = window.getComputedStyle(cardPart).display;
    if(mapPartDisplay) {
        mapPartDisplay = false;
        moveButton.src = "./imgs/others/map.png";
        bookPart.style.display = "flex";
        click3Sound.play();
    }else if(profilePartDisplay === "flex") {
        if(profileNameInput.value === "") {
            profileAnnounce.style.display = "block";
        }else {
            mapPartDisplay = true;
            moveButton.src = "./imgs/others/book.png";
            profilePart.style.display = "none";
            const editImg = document.getElementById("editImg");
            const profileInput = document.getElementById("profileInput");
            const inquery = document.getElementById("inquery");
            editImg.src = "./imgs/others/setting.PNG";
            editImg.style.height = "100%";
            profileInput.style.display = "none";
            profileNameInput.style.display = "none";
            profileNameText.style.display = "block";
            profileNameText.innerText = profileNameInput.value;
            localStorage.setItem("userName", profileNameText.innerText);
            profileAnnounce.style.display = "none";
            inquery.style.display = "none";
            click4Sound.play();
        };
    }else if(bookPartDisplay === "flex") {
        mapPartDisplay = true;
        moveButton.src = "./imgs/others/book.png";
        bookPart.style.display = "none";
        click4Sound.play();
    }else if(cardPartDisplay === "flex") {
        moveButton.src = "./imgs/others/map.png";
        cardPart.style.display = "none";
        bookPart.style.display = "flex";
        bgBox.classList.remove("bg-tatekan", "bg-Lv1", "bg-Lv2", "bg-Lv3", "bg-LvLegend");
        bgCircles.style.display = "none";
        bgLogo.style.display = "none";
        click1Sound.play();
    };
};

function startButtonClick() {
    const startAnnounce = document.getElementById("startAnnounce");
    if(startNameInput.value === "") {
        startAnnounce.style.display = "block";
    }else {
        mapPartDisplay = true;
        startPart.style.display = "none";
        profileNameText.innerText = startNameInput.value;
        profileNameInput.value = profileNameText.innerText;
        localStorage.setItem("userName", profileNameText.innerText);
        startAnnounce.style.display = "none";
    };
};

function profileButtonClick() {
    mapPartDisplay = false;
    moveButton.src = "./imgs/others/cross.png";
    profilePart.style.display = "flex";
    click3Sound.play();
};

function getFunc() {
    if(identifyObj(focusedObj)[0] === "chara") {
        capturedCharas[focusedObj.number-1] = "1";
        localStorage.setItem("capturedCharas", JSON.stringify(capturedCharas));
    }else if(identifyObj(focusedObj)[0] === "tatekan") {
        capturedTatekans[focusedObj.number-1] = "2";
        localStorage.setItem("capturedTatekans", JSON.stringify(capturedTatekans));
    };
    (function() {
        let i = placedMarks.indexOf(focusedMark);
        if(placedMarks[i] === focusedMark) {
            focusedMark.mark.setMap(null);
            placedMarks[i] = null;
            console.log("消滅", placedMarks)
            placeMark(i);
        };
    })();

    battleDiv.style.display = "none";
    quizDiv.style.display = "flex";
    moveButton.style.display = "block";
    displayCaptured();

    console.log("get!" + focusedObj.number) //get! オブジェクト名
    console.log(capturedCharas, capturedTatekans); //これまでに捕まえたオブジェクトの情報
};

function backFunc() {
    battleDiv.style.display = "none";
    quizDiv.style.display = "flex";
    moveButton.style.display = "block";
    focusImg.classList.remove("bounce");

    console.log("miss!" + focusedObj.number) //miss! オブジェクト番号
    console.log(capturedCharas, capturedTatekans); //これまでに捕まえたキャラの情報
};

function editButtonClick() {
    const editImg = document.getElementById("editImg");
    const profileInput = document.getElementById("profileInput");
    const profileNameTextDisplay = window.getComputedStyle(profileNameText).display;
    const inquery = document.getElementById("inquery");
    if(profileNameTextDisplay === "block") {
        editImg.src = "./imgs/others/back.png";
        editImg.style.height = "70%";
        profileNameText.style.display = "none";
        profileInput.style.display = "block";
        profileNameInput.style.display = "block";
        inquery.style.display = "block";
        click1Sound.play();
    }else {
        if(profileNameInput.value === "") {
            profileAnnounce.style.display = "block";
        }else {
            editImg.src = "./imgs/others/setting.PNG";
            editImg.style.height = "100%";
            profileInput.style.display = "none";
            profileNameInput.style.display = "none";
            profileNameText.style.display = "block";
            profileNameText.innerText = profileNameInput.value;
            profileNameInput.value = profileNameText.innerText;
            localStorage.setItem("userName", profileNameText.innerText);
            profileAnnounce.style.display = "none";
            inquery.style.display = "none";
            click1Sound.play();
        };
    }

    if(profileNameInput.value === "RstMyDt-色s") {
        localStorage.clear();
        console.log("すべての保存データを削除");
    };
};

// プロフィール画像の変更
function displayUserImg(event) {
    const startImg = document.getElementById("startImg");
    const fileInput = event.target;

    if (fileInput.files && fileInput.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            startImg.src = e.target.result;
            profileImg.src = e.target.result;
            profileButton.src = e.target.result;
            localStorage.setItem("userImg", e.target.result);
        };

        reader.readAsDataURL(fileInput.files[0]);
    };
};

// 図鑑のタブ機能を追加
function bookTab() {
    let charaTab = document.getElementById("charaTab");
    let tatekanTab = document.getElementById("tatekanTab");

    charaTab.addEventListener("click", function() {
        tatekanTab.classList.remove("is-active");
        charaTab.classList.add("is-active");
        tatekanListBox.style.display = "none";
        charaListBox.style.display = "block";
        click1Sound.play();
    });
    tatekanTab.addEventListener("click", function() {
        charaTab.classList.remove("is-active");
        tatekanTab.classList.add("is-active");
        charaListBox.style.display = "none";
        tatekanListBox.style.display = "block";
        click1Sound.play();
    });
};

// オブジェクト番号を図鑑番号に変換
function bookNum(number) {
    let bookNum;
    numDigits = number.toString().length;
    switch(numDigits) {
        case 1:
            bookNum = "00" + String(number);
            break;
        case 2:
            bookNum = "0" + String(number);
            break;
        case 3:
            bookNum = String(number);
            break;
    }
    return bookNum;
};

// 全オブジェクトリストを表示
function placeLists() {
    const charaList = document.getElementById("charaList");
    const tatekanList = document.getElementById("tatekanList");
    const charaCard = document.getElementById("charaCard");
    const tatekanCard = document.getElementById("tatekanCard");

    function cardClick(obj) {
        if(identifyObj(obj)[0] === "chara") {
            displayCharaCard(obj);
            tatekanCard.style.display = "none";
            charaCard.style.display = "block";
        }else if(identifyObj(obj)[0] === "tatekan") {
            displayTatekanCard(obj);
            charaCard.style.display = "none";
            tatekanCard.style.display = "block";
        };
        moveButton.src = "./imgs/others/cross.png";
        bookPart.style.display = "none";
        cardPart.style.display = "flex";
        click1Sound.play();
    };

    let rowNum = Math.floor((allCharas.length)/4);
    for(let i = 0; i < rowNum; i++) {
        let leftNum = 4*i + 1;
        let trTag = document.createElement("tr");
        
        for(let k = 0; k < 4; k++) {
            let num = leftNum + k;
            let tdTag = document.createElement("td");
            let pTag = document.createElement("p");
            let imgTag = document.createElement("img");
            
            pTag.innerText = bookNum(num);
            pTag.id = "charaP" + num;
            imgTag.id = "charaImg" + num;
            imgTag.style.display = "none";
            imgTag.addEventListener("click", function() {
                cardClick(allCharas.find(obj => obj.number === num));
            });
            imgTag.src = "./imgs/charas/" + allCharas.find(obj => obj.number === num).img;

            tdTag.className = "chara-td";
            pTag.className = "list-p";
            imgTag.className = "list-img";
            
            tdTag.appendChild(pTag);
            tdTag.appendChild(imgTag);
            trTag.appendChild(tdTag);
        }
        charaList.appendChild(trTag);
    };
    {
    let trTag = document.createElement("tr");
    for(let i = 0; i < (allCharas.length)%4; i++) {
        let num = allCharas.length - (allCharas.length)%4 + 1 + i;
        let tdTag = document.createElement("td");
        let pTag = document.createElement("p");
        let imgTag = document.createElement("img");

        pTag.innerText = bookNum(num);
        pTag.id = "charaP" + num;
        imgTag.id = "charaImg" + num;
        imgTag.style.display = "none";
        imgTag.addEventListener("click", function() {
            cardClick(allCharas.find(obj => obj.number === num))
        });
        imgTag.src = "./imgs/charas/" + allCharas.find(obj => obj.number === num).img;

        tdTag.className = "chara-td";
        pTag.className = "list-p";
        imgTag.className = "list-img";

        tdTag.appendChild(pTag);
        tdTag.appendChild(imgTag);
        trTag.appendChild(tdTag);
        };
    charaList.appendChild(trTag);
    };
    rowNum = Math.floor((tatekans.length)/4);
    for(let i = 0; i < rowNum; i++) {
        let leftNum = 4*i + 1;
        let trTag = document.createElement("tr");
        
        for(let k = 0; k < 4; k++) {
            let num = leftNum + k;
            let tdTag = document.createElement("td");
            let pTag = document.createElement("p");
            let imgTag = document.createElement("img");
            
            pTag.innerText = bookNum(num);
            pTag.id = "tatekanP" + num;
            imgTag.id = "tatekanImg" + num;
            imgTag.style.display = "none";
            imgTag.addEventListener("click", function() {
                cardClick(tatekans.find(obj => obj.number === num))
            });
            imgTag.src = "./imgs/tatekans/" + tatekans.find(obj => obj.number === num).img;

            tdTag.className = "tatekan-td";
            pTag.className = "list-p";
            imgTag.className = "list-img";
            
            tdTag.appendChild(pTag);
            tdTag.appendChild(imgTag);
            trTag.appendChild(tdTag);
        }
        tatekanList.appendChild(trTag);
    };
    {
    let trTag = document.createElement("tr");
    for(let i = 0; i < (tatekans.length)%4; i++) {
        let num = tatekans.length - (tatekans.length)%4 + 1 + i;
        let tdTag = document.createElement("td");
        let pTag = document.createElement("p");
        let imgTag = document.createElement("img");

        pTag.innerText = bookNum(num);
        pTag.id = "tatekanP" + num;
        imgTag.id = "tatekanImg" + num;
        imgTag.style.display = "none";
        imgTag.addEventListener("click", function() {
            cardClick(tatekans.find(obj => obj.number === num))
        });
        imgTag.src = "./imgs/tatekans/" + tatekans.find(obj => obj.number === num).img;

        tdTag.className = "tatekan-td";
        pTag.className = "list-p";
        imgTag.className = "list-img";

        tdTag.appendChild(pTag);
        tdTag.appendChild(imgTag);
        trTag.appendChild(tdTag);
    };
    tatekanList.appendChild(trTag);
    };
};

// 獲得キャラ数・タテカン数の表示、リストの更新
function displayCaptured() {
    const bookCounter = document.getElementById("bookCounter");
    function countFunc(array) {
        let count = 0;
        for(let i = 0; i < array.length; i++) {
            if(array[i]) {
                count++;
            };
        };
        return count;
    };
    bookCounter.innerText = "捕まえたキャラクター：" + countFunc(capturedCharas) + "\n見つけたタテカン：" + countFunc(capturedTatekans);

    for(let i = 0; i < capturedCharas.length; i++) {
        if(capturedCharas[i]) {
            let num = i + 1;
            let pTag = document.getElementById("charaP" + num);
            let imgTag = document.getElementById("charaImg" + num);
            pTag.style.display = "none";
            imgTag.style.display = "block";
        };
    };
    for(let i = 0; i < capturedTatekans.length; i++) {
        if(capturedTatekans[i]) {
            let num = i + 1;
            let pTag = document.getElementById("tatekanP" + num);
            let imgTag = document.getElementById("tatekanImg" + num);
            pTag.style.display = "none";
            imgTag.style.display = "block";
        };
    };

    const charaNum = document.getElementById("profileCharaNum");
    const tatekanNum = document.getElementById("profileTatekanNum");
    charaNum.innerText = countFunc(capturedCharas);
    tatekanNum.innerText = countFunc(capturedTatekans);
};

// 取得単位数・学位の表示、更新
function displayCredits() {
    let degree, credit, maxCredits;
    const {bachelor, master, doctor} = degrees;
    if(creditNum >= bachelor + master + doctor) {
        degree = "卒業";
        credit = doctor;
        maxCredits = doctor;
        myDegree = "doctor";
    }else if(creditNum >= bachelor + master) {
        degree = "Doctor";
        credit = creditNum - (bachelor + master);
        maxCredits = doctor;
        myDegree = "doctor";
    }else if(creditNum >= bachelor) {
        degree = "Master";
        credit = creditNum - bachelor;
        maxCredits = master;
        myDegree = "master";
    }else {
        degree = "Bachelor";
        credit = creditNum;
        maxCredits = bachelor;
        myDegree = "bachelor";
    };
    const degreeTag = document.getElementById("degree");
    const creditGage = document.getElementById("creditGage");
    const creditRate = document.getElementById("creditRate");
    degreeTag.innerText = degree;
    creditGage.value = credit;
    creditGage.max = maxCredits;
    creditRate.innerText = credit + " / " + maxCredits + "[単位]";
};

// キャラカード・タテカンカードの表示
function displayCharaCard(chara) {
    const charaImg = document.getElementById("charaImg");
    const badgeImg = document.getElementById("badgeImg");
    const charaName = document.getElementById("charaName");
    const charaDesc = document.getElementById("charaDesc");
    const type = document.getElementById("type");
    const detail = document.getElementById("detail");

    const charaLv = identifyObj(chara)[1];
    switch(charaLv) {
        case "Lv1":
            bgBox.classList.add("bg-Lv1");
            console.log("1")
            break;
        case "Lv2":
            bgBox.classList.add("bg-Lv2");
            bgLogo.style.display = "block";
            console.log("2")
            break;
        case "Lv3":
            bgBox.classList.add("bg-Lv3");
            bgLogo.style.display = "block";
            console.log("3")
            break;
        case "LvLegend":
            bgBox.classList.add("bg-LvLegend");
            bgCircles.style.display = "block";
            bgLogo.style.display = "block";
            console.log("legend");
            break;
        default:
    };

    charaImg.src = "./imgs/charas/" + chara.img;
    if(chara.badgeImg) {
        badgeImg.src = "./imgs/badges/" + chara.badgeImg;
    }else {
        badgeImg.style.display = "none";
    };
    charaName.innerText = bookNum(chara.number) + " " + chara.name;
    charaDesc.innerText = "生年月：" + chara.desc.birth + "\n卒業：" + chara.desc.gradu + "\n職業：" + chara.desc.job + "\n" + chara.desc.plus;
    type.innerText = chara.type;
    detail.innerText = chara.detail;
};

function displayTatekanCard(tatekan) {
    const tatekanImg = document.getElementById("tatekanImg");
    const tatekanName = document.getElementById("tatekanName");
    const tatekanDetail = document.getElementById("tatekanDetail");

    bgBox.classList.add("bg-tatekan");
    tatekanImg.src = "./imgs/tatekans/" + tatekan.img;
    tatekanName.innerText = bookNum(tatekan.number) + " " + tatekan.name;
    tatekanDetail.innerText = tatekan.detail;
};


// 最初に呼び出される関数
function initFunc() {
    if(charas&&tatekans&&quizzes) {
        {
        moveButton = document.getElementById("moveButton");
        startPart = document.getElementById("startPart");
        profilePart = document.getElementById("profilePart");
        bookPart = document.getElementById("bookPart");
        cardPart = document.getElementById("cardPart");
        startNameInput = document.getElementById("startNameInput");
        startButton = document.getElementById("startButton");
        mapDiv = document.getElementById("map");
        battleDiv = document.getElementById("battle");
        profileButton = document.getElementById("profileButton");
        escapeButton = document.getElementById("escapeButton");
        focusImg = document.getElementById("focusImg");  
        encounterLog = document.getElementById("encounterLog");
        quizDiv = document.getElementById("quizDiv");
        question = document.getElementById("question");
        opt1 = document.getElementById("opt1");
        opt2 = document.getElementById("opt2");
        opt3 = document.getElementById("opt3");
        opt4 = document.getElementById("opt4");
        quizResult = document.getElementById("quizResult");
        editButton = document.getElementById("editButton");
        profileImg = document.getElementById("profileImg");
        profileNameText = document.getElementById("profileNameText");
        profileNameInput = document.getElementById("profileNameInput");
        shape = document.getElementById("shape");
        bgBox = document.getElementById("bgBox");
        bgCircles = document.getElementById("bgCircles");
        bgLogo = document.getElementById("bgLogo");
        click1Sound = document.getElementById("click1Sound");
        click2Sound = document.getElementById("click2Sound");
        click3Sound = document.getElementById("click3Sound");
        click4Sound = document.getElementById("click4Sound");
        // encounterSound = document.getElementById("encounterSound");
        correctSound = document.getElementById("correctSound");
        wrongSound = document.getElementById("wrongSound");
        getObjSound = document.getElementById("getObjSound");
        getCreditSound = document.getElementById("getCreditSound");
        };
    
        {
        [startButton, moveButton, profileButton, escapeButton, opt1, opt2, opt3, opt4, editButton].forEach(button => {
            const buttonStyle = window.getComputedStyle(button);
            const width = buttonStyle.width;
            const height = buttonStyle.height;
            let widthNum = parseFloat(buttonStyle.width);
            const widthUnit = buttonStyle.width.replace(/[\d.]/g, '');
            let heightNum = parseFloat(buttonStyle.height);
            const heightUnit = buttonStyle.height.replace(/[\d.]/g, '');
            button.addEventListener("mousedown", function() {
                button.style.width = String(widthNum*0.85) + widthUnit;
                button.style.height = String(heightNum*0.85) + heightUnit;
            });
            button.addEventListener("mouseup", function() {
                button.style.width = width;
                button.style.height = height;
            });
            button.addEventListener("mouseleave", function() {
                button.style.width = width;
                button.style.height = height;
            });
            button.addEventListener("touchstart", function() {
                button.style.width = String(widthNum*0.85) + widthUnit;
                button.style.height = String(heightNum*0.85) + heightUnit;
            });
            button.addEventListener("touchend", function() {
                button.style.width = width;
                button.style.height = height;
            });
        });
        };
    
        document.getElementById("firstPage").style.display = "block"
        
        navigator.geolocation.getCurrentPosition((position)=>{
            myLat = position.coords.latitude;
            myLng = position.coords.longitude;
            let initPos = new google.maps.LatLng(myLat, myLng);
    
            gmap = new google.maps.Map(mapDiv, {
                center: initPos,
                zoom: currentZoom,
                tilt: 47.5,
                mapId: "206221e9066e4473",
                disableDefaultUI: true,
                keyboardShortcuts: false,
            });
    
            mark = new google.maps.Marker({
                map: gmap,
                position: initPos,
            });
    
            const buttons = [
                ["◀", "rotate", -20, google.maps.ControlPosition.LEFT_CENTER],
                ["▶", "rotate", 20, google.maps.ControlPosition.RIGHT_CENTER],
                ["▲", "tilt", 20, google.maps.ControlPosition.TOP_CENTER],
                ["▼", "tilt", -20, google.maps.ControlPosition.BOTTOM_CENTER],
            ];
            
            buttons.forEach(([text, mode, amount, position]) => {
                const controlDiv = document.createElement("div");
                const controlUI = document.createElement("button");
    
                gmap.controls[position].push(controlDiv);
                switch (mode) {
                    case "tilt":
                        controlUI.className = "tilt-div";
                        break;
                    case "rotate":
                        controlUI.className = "rotate-div";
                        break;
                    default:
                        break;
                };
                controlUI.innerText = `${text}`;
                controlUI.addEventListener("click", () => {
                    adjustMap(mode, amount);
                });
                controlDiv.appendChild(controlUI);
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
                };
            };
    
            if(localStorage.getItem("capturedCharas")) {
                capturedCharas = JSON.parse(localStorage.getItem("capturedCharas"));
            };
            if(localStorage.getItem("capturedTatekans")) {
                capturedTatekans = JSON.parse(localStorage.getItem("capturedTatekans"));
            };
    
            if(localStorage.getItem("userName")) {
                mapPartDisplay = true;
                startPart.style.display = "none";
                profileNameText.innerText = localStorage.getItem("userName");
                profileNameInput.value = localStorage.getItem("userName");
            }else {
                startOpening();
            };
            if(localStorage.getItem("userImg")) {
                profileButton.src = localStorage.getItem("userImg");
                profileImg.src = localStorage.getItem("userImg");
            };
            if(!localStorage.getItem("creditNum")) {
                localStorage.setItem("creditNum", creditNum);
            };
            creditNum = parseInt(localStorage.getItem("creditNum"), 10);
    
            adjustment();
            for(let i = 0; i < appearance.number; i++) {
                placeMark(i);
            };
    
            mapInterval = setInterval(updateMap, 500);
            updateObjs();
    
            {
                moveButton.addEventListener("click", function() {
                    moveButtonClick();
                });
    
                startButton.addEventListener("click", function() {
                    startButtonClick();
                });
    
                profileButton.addEventListener("click", function() {
                    profileButtonClick();
                });
    
                escapeButton.addEventListener("click", function() {
                    backFunc();
                    click1Sound.play();
                });
            
                opt1.addEventListener("click", function() {
                    answerFunc(opt1);
                });
                opt2.addEventListener("click", function() {
                    answerFunc(opt2);
                });
                opt3.addEventListener("click", function() {
                    answerFunc(opt3);
                });
                opt4.addEventListener("click", function() {
                    answerFunc(opt4);
                });
    
                editButton.addEventListener("click", function() {
                    editButtonClick();
                });
                
                startNameInput.addEventListener("input", function () {
                    const maxLength = 10;
                    if (this.value.length > maxLength) {
                        this.value = this.value.slice(0, maxLength);
                    };
                })
    
                profileNameInput.addEventListener("input", function () {
                    const maxLength = 10;
                    if (this.value.length > maxLength) {
                        this.value = this.value.slice(0, maxLength);
                    };
                });
            };
            
            bookTab();
            placeLists();
            displayCaptured();
            displayCredits();
        }, () => {
            console.error("位置情報の取得に失敗");
        }, {
            enableHighAccuracy: true
        });
    }else {
        console.error("jsonファイルからの情報の取得が未完了");
    };
};
