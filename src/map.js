function createMap() {
    navigator.geolocation.getCurrentPosition((position)=>{
        myLat = position.coords.latitude;
        myLng = position.coords.longitude;
        const initPos = new google.maps.LatLng(myLat, myLng);
    
        gmap = new google.maps.Map(document.getElementById("map"), {
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

        for(let i = 0; i < adjustment().appearance.number; i++) {
            placeMark(i);
        };
    
        mapInterval = setInterval(updateMap, 500);
        updateObjs();

        getUserInfo();

    }, () => {
        console.error("位置情報の取得に失敗");
    }, {
        enableHighAccuracy: true
    });
} 

function _randomPos() {
    const { radius } = adjustment().appearance;
    const r = Math.random()*radius;
    const theta = (Math.random()*360)*(Math.PI/180);
    const R = 6371008;
    const lat = myLat + (Math.floor((r*Math.sin(theta)*180)/(R*Math.PI)*10000000))/10000000;
    const lng = myLng + Math.floor((r*Math.cos(theta)*180)/(R*Math.cos(myLat*(Math.PI/180))*Math.PI)*10000000)/10000000;
    
    return [lat, lng];
}

function _randomNum(min, max) {
    return Math.random()*(max - min) + min;
}

function _randomObj() {
    const { rate } = adjustment().appearance;
    const num = Math.floor(Math.random()*1000);
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
    }
}

function _removeMark(placedMark) {
    content.classList.remove("stay");
    setTimeout(function() {
        if(placedMarks[i] === placedMark) {
            placedMarks[i].mark.setMap(null);
            placedMarks[i] = null;
            console.log("消滅", placedMarks)
            placeMark(i);
        }
    }, 700);
}

function _showMark() {
    let pos = _randomPos();
    let diff = _randomObj();
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

    console.log("出現", placedMarks);
    
    let placedMark = placedMarks[i];
    
    setTimeout(() => {
        _removeMark(placedMark);
    }, stayTime);
}

function placeMark(i) {
    const { intervalSec, stayMin } = adjustment().appearance;
    
    const intervalTime = _randomNum(intervalSec[0], intervalSec[1])*1000;
    const stayTime = _randomNum(stayMin[0], stayMin[1])*60*1000;
    console.log(intervalTime, stayTime);

    setTimeout(_showMark, intervalTime);
}

function updateMap() {
    gmap.setCenter(myPos);
    mark.setPosition(myPos);
    
    if(gmap.getZoom() < 19) {
        gmap.setZoom(19);
    };
}

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
}