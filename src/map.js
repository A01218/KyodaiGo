function createMap() {
    navigator.geolocation.getCurrentPosition((geolocationPosition)=>{
        const myLat = geolocationPosition.coords.latitude;
        const myLng = geolocationPosition.coords.longitude;
        const position = new Position(myLat, myLng);
        const initPos = position.getGoogleMapLatLng();
        myPos = initPos;
    
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

        // TODO: timingsをローカル変数にする
        // const timings = [];
        const { radius, rate, stayMin, intervalSec } = adjustment().appearance;

        const markDealer = new MarkDealer(position, rate, radius, charas, tatekans);
        const map = new MapWrapper(gmap);
        for (let i = 0; i < adjustment().appearance.number; i++) {
            const timing = new Timing(intervalSec, stayMin, markDealer, map, objMarkClick);
            timings[i] = timing;
            timing.run();
        }

        mapInterval = setInterval(updateMap, 500);
        updateObjs(new Area(radius, timings));

        getUserInfo();

    }, () => {
        console.error("位置情報の取得に失敗");
    }, {
        enableHighAccuracy: true
    });
} 

function updateObjs(area) {
    navigator.geolocation.watchPosition((geolocationPosition)=>{
        const myLat = geolocationPosition.coords.latitude;
        const myLng = geolocationPosition.coords.longitude;
        const position = new Position(myLat, myLng);
        myPos = position.getGoogleMapLatLng();

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

        const { radius, rate } = adjustment().appearance;

        const markDealer = new MarkDealer(position, rate, radius, charas, tatekans);
        area.update(position, markDealer);
    }, () => {
        console.log("位置情報の取得に失敗");                        
    }, {
        enableHighAccuracy: true               
    });
}

function updateMap() {
    gmap.setCenter(myPos);
    mark.setPosition(myPos);
    
    if(gmap.getZoom() < 19) {
        gmap.setZoom(19);
    };
}

function placeMark(i) {
    const { intervalSec } = adjustment().appearance;
    
    const intervalTime = _randomNum(intervalSec[0], intervalSec[1])*1000;

    setTimeout(() => _showMark(i), intervalTime);
}