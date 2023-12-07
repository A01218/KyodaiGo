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