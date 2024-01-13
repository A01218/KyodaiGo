class Switch {
    #gmap;
    #markDealer;

    constructor(gmap, markDealer){
        this.#gmap = gmap;
        this.#markDealer = markDealer;
    }

    #display(mark, onClick) {
        const content = document.createElement("img");
        content.className = "obj-mark";
        content.src = mark.imageUrl;
        const markerElement = new google.maps.marker.AdvancedMarkerElement({
            map: gmap,
            position: mark.position.getGoogleMapLatLng(),
            content: content,
        });

        markerElement.addListener("click", function() {
            onClick(markerElement);
        });
    }

    placedMarks[i] = {
        pos,
        obj,
        marker,
    };

    setTimeout(function() {
        content.classList.add("stay");
    }, 500);

    console.log("出現", placedMarks);
    
    let placedMark = placedMarks[i];

    const { stayMin } = adjustment().appearance;
    const stayTime = _randomNum(stayMin[0], stayMin[1])*60*1000;

    setTimeout(() => {
        _removeMark(placedMark, i);
    }, stayTime);

    
    #hide(markerElement){
        markerElement.setMap(null);
    }

    let content = document.createElement("img");
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