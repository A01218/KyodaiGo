function startButtonClick() {
    const startPart = document.getElementById("startPart");
    const startNameInput = document.getElementById("startNameInput");
    const startAnnounce = document.getElementById("startAnnounce");
    const profileNameText = document.getElementById("profileNameText");
    const profileNameInput = document.getElementById("profileNameInput");
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
}

function profileButtonClick() {
    const moveButton = document.getElementById("moveButton");
    const profilePart = document.getElementById("profilePart");
    const click3Sound = document.getElementById("click3Sound");
    mapPartDisplay = false;
    moveButton.src = "./imgs/others/cross.png";
    profilePart.style.display = "flex";
    click3Sound.play();
}

function getFunc() {
    if(focusedMark.kind === "chara") {
        capturedCharas[focusedMark.number-1] = "1";
        localStorage.setItem("capturedCharas", JSON.stringify(capturedCharas));
    }else if(focusedMark.kind === "tatekan") {
        capturedTatekans[focusedMark.number-1] = "2";
        localStorage.setItem("capturedTatekans", JSON.stringify(capturedTatekans));
    };
    (function() {
        console.log("消滅", timings);
        focusedTiming.reset();
    })();

    const moveButton = document.getElementById("moveButton");
    const battlePart = document.getElementById("battlePart");
    const quizDiv = document.getElementById("quizDiv");
    battlePart.style.display = "none";
    quizDiv.style.display = "flex";
    moveButton.style.display = "block";
    displayCaptured();

    console.log("get!" + focusedMark.number) //get! オブジェクト名
    console.log(capturedCharas, capturedTatekans); //これまでに捕まえたオブジェクトの情報
}

function backFunc() {
    const moveButton = document.getElementById("moveButton");
    const battlePart = document.getElementById("battlePart");
    const quizDiv = document.getElementById("quizDiv");
    const focusImg = document.getElementById("focusImg"); 
    battlePart.style.display = "none";
    quizDiv.style.display = "flex";
    moveButton.style.display = "block";
    focusImg.classList.remove("bounce");

    console.log("miss!" + focusedMark.number) //miss! オブジェクト番号
    console.log(capturedCharas, capturedTatekans); //これまでに捕まえたキャラの情報
}

function editButtonClick() {
    const editImg = document.getElementById("editImg");
    const profileInput = document.getElementById("profileInput");
    const profileNameText = document.getElementById("profileNameText");
    const profileNameTextDisplay = window.getComputedStyle(profileNameText).display;
    const profileNameInput = document.getElementById("profileNameInput");
    const profileAnnounce = document.getElementById("profileAnnounce");
    const inquery = document.getElementById("inquery");
    const click1Sound = document.getElementById("click1Sound");
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
}

function buttonEvents() {
    const moveButton = document.getElementById("moveButton");
    const startButton = document.getElementById("startButton");
    const profileButton = document.getElementById("profileButton");
    const escapeButton = document.getElementById("escapeButton");
    const opt1 = document.getElementById("opt1");
    const opt2 = document.getElementById("opt2");
    const opt3 = document.getElementById("opt3");
    const opt4 = document.getElementById("opt4");
    const editButton = document.getElementById("editButton");
    const startNameInput = document.getElementById("startNameInput");
    const profileNameInput = document.getElementById("profileNameInput");
    const click1Sound = document.getElementById("click1Sound");
    [moveButton, startButton, profileButton, escapeButton, opt1, opt2, opt3, opt4, editButton].forEach(button => {
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
}