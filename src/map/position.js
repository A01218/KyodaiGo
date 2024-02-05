// 地球の半径[m]
const EarthRadius = 6371008; 

class Position {
    #latitude;
    #longitude;

    constructor(latitude, longitude) {
        this.#latitude = latitude;
        this.#longitude = longitude;
    }

    getGoogleMapLatLng() {
        return new google.maps.LatLng(this.#latitude, this.#longitude);
    }

    addPolarCoordinate(r, theta) {
        const lat = this.#latitude + (Math.floor((r*Math.sin(theta)*180)/(EarthRadius*Math.PI)*10000000))/10000000;
        const lng = this.#longitude + Math.floor((r*Math.cos(theta)*180)/(EarthRadius*Math.cos(this.#latitude*(Math.PI/180))*Math.PI)*10000000)/10000000;

        return new Position(lat, lng);
    }

    getDistance(position) {
        const distance = google.maps.geometry.spherical.computeDistanceBetween(this.getGoogleMapLatLng(), position.getGoogleMapLatLng());
        return distance;
    }
}