function bookTab() {
    const charaTab = document.getElementById("charaTab");
    const tatekanTab = document.getElementById("tatekanTab");
    const charaListBox = document.getElementById("charaListBox");
    const tatekanListBox = document.getElementById("tatekanListBox");
    const click1Sound = document.getElementById("click1Sound");

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
}

function bookNum(number) {
    let bookNum;
    const numDigits = number.toString().length;
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
}

function placeLists() {
    const moveButton = document.getElementById("moveButton");
    const bookPart = document.getElementById("bookPart");
    const cardPart = document.getElementById("cardPart");
    const charaList = document.getElementById("charaList");
    const tatekanList = document.getElementById("tatekanList");
    const charaCard = document.getElementById("charaCard");
    const tatekanCard = document.getElementById("tatekanCard");
    const click1Sound = document.getElementById("click1Sound");


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
}

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
}