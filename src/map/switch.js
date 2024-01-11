class Switch {
    #gmap;
    #markDealer;
    constructor(gmap,markDealer){
        this.#gmap = gmap;
        this.#markDealer = markDealer;
    }

    #display(mark, onClick){
        const content = document.createElement("img");
        content.className = "obj-mark";
        content.src = mark.imageUrl;
        const marker = new google.maps.marker.AdvancedMarkerElement({
            map: gmap,
            position: mark.position.getGoogleMapLatLng(),
            content: content,
        });

        marker.addListener("click", function() {
            onClick(marker);
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
}