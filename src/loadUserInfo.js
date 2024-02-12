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
}

function loadUserInfo() {
    const startPart = document.getElementById("startPart");
    const profileNameText = document.getElementById("profileNameText");
    const profileNameInput = document.getElementById("profileNameInput");
    const profileButton = document.getElementById("profileButton");
    const profileImg = document.getElementById("profileImg");

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
}