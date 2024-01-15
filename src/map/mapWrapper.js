class MapWrapper {
    #gmap;

    constructor(gmap) {
        this.#gmap = gmap;
    }

    display(mark, onClick) {
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

        // setTimeout(function() {
        //     content.classList.add("stay");
        // }, 500);

        return markerElement;
    }

    
    hide(markerElement) {
        // let content = document.createElement("img");
        // content.classList.remove("stay");
        // setTimeout(() => {
        //     content.classList.remove("stay");
        //     markerElement.setMap(null);
        // }, 700);

        markerElement.setMap(null);
    }
}