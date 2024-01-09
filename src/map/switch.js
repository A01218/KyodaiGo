class Switch {
    #gmap;
    #markDealer;
    constructor(gmap,markDealer){
        this.#gmap = gmap;
        this.#markDealer = markDealer;
    }
    #display(){
        let content = document.createElement("img");
        content.className = "obj-mark";
        content.src = this.#markDealer.deal().imageUrl;
        let mark = new google.maps.marker.AdvancedMarkerElement({
            map: gmap,
            position: this.#markDealer.deal().position.getGoogleMapLatLng(),
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

        const { stayMin } = adjustment().appearance;
        const stayTime = _randomNum(stayMin[0], stayMin[1])*60*1000;

        setTimeout(() => {
            _removeMark(placedMark, i);
        }, stayTime);

    }

}