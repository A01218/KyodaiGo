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
            map: this.#gmap,
            position: mark.position.getGoogleMapLatLng(),
            content: content,
        });
        
        markerElement.addListener("click", function() {
            onClick(markerElement);
        });

        // contentのレンダリング終了まで0.5秒待ってからフェードイン
        setTimeout(function() {
            content.classList.add("stay");
        }, 500);

        return markerElement;
    }

    
    hide(markerElement) {
        markerElement.content.classList.remove("stay");

        // contentのフェードアウト終了まで0.7秒待ってからマーカーを非表示
        setTimeout(() => {
            markerElement.setMap(null);
        }, 700);
    }
}