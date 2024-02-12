function objMarkClick(timing) {
    const mark = timing.mark;
    const moveButton = document.getElementById("moveButton");
    const profileButton = document.getElementById("profileButton");

    console.log("focus!" + mark.number);
    focusedTiming = timing;
    focusedMark = mark;
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
    gmap.panTo(mark.position.getGoogleMapLatLng());
    function zoomIn() {
        if(currentZoom < 23) {
            currentZoom += 0.3;
            gmap.setZoom(currentZoom);
            setTimeout(zoomIn, 50);
        }else {
            overlayStyle.opacity = 1;
            setTimeout(function() {
                escapeButton.style.display = "flex";
                battlePart.style.display = "flex";
                quizReload();

                focusImg.src = mark.imageUrl;
                if(mark.kind === "chara") {
                    encounterLog.innerText = "野生の " + mark.name + " が現れた!";
                    encountFunc(400, 1700);
                }
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
        }
    }
    zoomIn();
}

function encountFunc(a, b) {
    const encounterLog = document.getElementById("encounterLog");
    setTimeout(function() {
        encounterLog.classList.add("opaque");
        setTimeout(function() {
            encounterLog.classList.remove("opaque");
        }, b);
    }, a);
}

function quizReload() {
    const escapeButton = document.getElementById("escapeButton");
    const focusImg = document.getElementById("focusImg");
    const encounterLog = document.getElementById("encounterLog");
    const quizDiv = document.getElementById("quizDiv");
    const question = document.getElementById("question");
    const opt1 = document.getElementById("opt1");
    const opt2 = document.getElementById("opt2");
    const opt3 = document.getElementById("opt3");
    const opt4 = document.getElementById("opt4");

    const charaLv = focusedMark.rarity;
    const quizArr = adjustment().rarity[charaLv];
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
            })
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
        if(focusedMark.kind === "chara") {
            setTimeout(function() {
                focusImg.classList.remove("bounce");
            }, 150);
            encounterLog.innerText = "クイズを出してこないようだ…。\n" + focusedMark.name + " と仲良くなった！";
            encountFunc(200, 2000);
            setTimeout(function() {
                getObjSound.play();
            }, 400);

            let credit = adjustment().credits[myDegree][charaLv];
            if(credit !== 0) {
                creditNum = creditNum + credit;
                localStorage.setItem("creditNum", creditNum);
                displayCredits();
                setTimeout(function() {
                    encounterLog.innerText = focusedMark.name + " から " + credit + "単位 もらった！";
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
        }else if(focusedMark.kind === "tatekan") {
            encounterLog.innerText = focusedMark.name + " を見つけた!";
            encountFunc(600, 3000);
            setTimeout(function() {
                getObjSound.play();
            }, 1000);
            setTimeout(function() {
                getFunc();
            }, 4600);
        };
    }else if(wrongAns === adjustment().escapeTurns[Object.keys(adjustment().rarity).find(key => adjustment().rarity[key] === quizArr)]) {
        escapeButton.style.display = "none";
        quizDiv.style.display = "none";
        encounterLog.innerText = focusedMark.name + " に逃げられた…";
        encountFunc(1500, 2000);
        setTimeout(function() {
            focusImg.classList.remove("bounce");
        }, 150);
        setTimeout(function() {
            focusImg.classList.add("disappear");
        }, 300);
        setTimeout(function() {
            (function() {
                console.log("消滅", timing);
                focusedTiming.reset();
            })();
            backFunc();
            focusImg.classList.remove("disappear");
        }, 4500);
    }else {
        quiz = quizzes[quizArr[correctAns]][Math.floor( Math.random()*quizzes[quizArr[correctAns]].length )];
        console.log(quiz) //ランダムに選ばれたクイズの情報
        quizFunc(quiz);
        console.log(quizArr[correctAns]);
    }
}

function answerFunc(element) {
    const quizResult = document.getElementById("quizResult");
    const shape = document.getElementById("shape");
    const correctSound = document.getElementById("correctSound");
    const wrongSound = document.getElementById("wrongSound");
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
}

function moveButtonClick() {
    const bookPart = document.getElementById("bookPart");
    const click3Sound = document.getElementById("click3Sound");
    const profilePartDisplay = window.getComputedStyle(profilePart).display;
    const bookPartDisplay = window.getComputedStyle(bookPart).display;
    const cardPartDisplay = window.getComputedStyle(cardPart).display;
    const moveButton = document.getElementById("moveButton");
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
    }
}