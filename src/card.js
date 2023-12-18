console.log("10")
function displayCharaCard(chara) {
    const bgLogo = document.getElementById("bgLogo");
    const bgBox = document.getElementById("bgBox");
    const bgCircles = document.getElementById("bgCircles");
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
}

function displayTatekanCard(tatekan) {
    const tatekanImg = document.getElementById("tatekanImg");
    const tatekanName = document.getElementById("tatekanName");
    const tatekanDetail = document.getElementById("tatekanDetail");
    const bgBox = document.getElementById("bgBox");

    bgBox.classList.add("bg-tatekan");
    tatekanImg.src = "./imgs/tatekans/" + tatekan.img;
    tatekanName.innerText = bookNum(tatekan.number) + " " + tatekan.name;
    tatekanDetail.innerText = tatekan.detail;
}