function displayUserImg(event) {
    const startImg = document.getElementById("startImg");
    const fileInput = event.target;
    const profileButton = document.getElementById("profileButton");
    const profileImg = document.getElementById("profileImg");

    if (fileInput.files && fileInput.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            startImg.src = e.target.result;
            profileButton.src = e.target.result;
            profileImg.src = e.target.result;
            localStorage.setItem("userImg", e.target.result);
        };

        reader.readAsDataURL(fileInput.files[0]);
    };
}

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
}