function loadCharas() {
    return new Promise((resolve, reject) => {
        const req = new XMLHttpRequest();
        // req.addEventListener("readystatechange", () => {
        //     if (req.readyState === 4 && req.status === 200) {
        //         const charas = JSON.parse(req.responseText);
        //         resolve(charas);
        //     } else {
        //         reject(new Error("Failed to load chara information from JSON file")); 
        //     }
        // });
        req.addEventListener("readystatechange", () => {
            if (req.readyState === 4) {
                if (req.status === 200) {
                    const charas = JSON.parse(req.responseText);
                    resolve(charas);
                } else {
                    console.error('HTTPエラー:', req.status, req.statusText);
                    reject(new Error("Failed to load chara information from JSON file"));
                }
            }
        });
        req.open("GET", "../jsons/charas.json", true);
        req.send();
    });
}

function loadTatekans() {
    return new Promise((resolve, reject) => {
        const req = new XMLHttpRequest();
        // req.addEventListener("readystatechange", () => {
        //     if (req.readyState === 4 && req.status === 200) {
        //         const tatekans = JSON.parse(req.responseText);
        //         resolve(tatekans);
        //     } else {
        //         reject(new Error("Failed to load tatekan information from JSON file"));
        //     }
        // });
        req.addEventListener("readystatechange", () => {
            if (req.readyState === 4) {
                if (req.status === 200) {
                    const tatekans = JSON.parse(req.responseText);
                    resolve(tatekans);
                } else {
                    console.error('HTTPエラー:', req.status, req.statusText);
                    reject(new Error("Failed to load tatekan information from JSON file"));
                }
            }
        });
        req.open("GET", "../jsons/tatekans.json", true);
        req.send();
    });
}

function loadQuizzes() {
    return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();
    // req.addEventListener("readystatechange", () => {
    //     if (req.readyState === 4 && req.status === 200) {
    //         const quizzes = JSON.parse(req.responseText);
    //         resolve(quizzes);
    //     } else {
    //         reject(new Error("Failed to load quiz information from JSON file"));
    //     }
    // });
    req.addEventListener("readystatechange", () => {
        if (req.readyState === 4) {
            if (req.status === 200) {
                const quizzes = JSON.parse(req.responseText);
                resolve(quizzes);
            } else {
                console.error('HTTPエラー:', req.status, req.statusText);
                reject(new Error("Failed to load quizzes information from JSON file"));
            }
        }
    });
    req.open("GET", "../jsons/quizzes.json", true);
    req.send();
    });
}

function init() {
    Promise.all([loadCharas(), loadTatekans(), loadQuizzes()])
        .then(results => {
            [charas, tatekans, quizzes] = results;
            allCharas = [...charas.Lv1, ...charas.Lv2, ...charas.Lv3, ...charas.LvLegend];
            loadUserInfo();

            createMap();
            bookTab();
            placeLists();
            displayCaptured();
            displayCredits();
            buttonEvents();
        })
        .catch(error => {
            console.error('Error loading data:', error);
        });
}