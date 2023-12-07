let moveButton, startPart, battlePart, profilePart, bookPart, cardPart;

let startNameInput;
let startButton;

let mapPartDisplay;
let mapDiv;
let profileButton, escapeButton, focusImg, encounterLog, quizDiv;
let question, opt1, opt2, opt3, opt4, quizResult;

let editButton;
let profileImg, profileNameText, profileNameInput;

let bgBox, bgCircles, bgLogo;

let click1Sound, click2Sound, click3Sound, click4Sound, correctSound, wrongSound, getObjSound, getCreditSound;
// let encounterSound


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

    battlePart.style.display = "none";
    quizDiv.style.display = "flex";
    moveButton.style.display = "block";
    displayCaptured();

    console.log("get!" + focusedObj.number) //get! オブジェクト名
    console.log(capturedCharas, capturedTatekans); //これまでに捕まえたオブジェクトの情報
};

function backFunc() {
    battlePart.style.display = "none";
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
    const {bachelor, master, doctor} = adjustment().degrees;
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
    {
    moveButton = document.getElementById("moveButton");
    startPart = document.getElementById("startPart");
    profilePart = document.getElementById("profilePart");
    bookPart = document.getElementById("bookPart");
    cardPart = document.getElementById("cardPart");
    startNameInput = document.getElementById("startNameInput");
    startButton = document.getElementById("startButton");
    mapDiv = document.getElementById("map");
    battlePart = document.getElementById("battlePart");
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
};
