class Timing {
    #intervalSec;
    #stayMin;
    #markDealer;
    #map;
    #onClick;

    #state = undefined;
    #intervalTimeoutID = undefined;
    #stayTimeoutID = undefined;
    #markerElement = undefined;

    constructor(intervalSec, stayMin, markDealer, map, onClick) {
        this.#intervalSec = intervalSec;
        this.#stayMin = stayMin;
        this.#markDealer = markDealer;
        this.#map = map;
        this.#onClick = onClick;
    }

    run() {
        this.#setStateInterval();
    }

    reset() {
        switch(this.#state) {
            case 'interval':
                clearTimeout(this.#intervalTimeoutID);
                break;
            case 'stay':
                clearTimeout(this.#stayTimeoutID);
                this.#map.hide(this.#markerElement);
                break;
        }

        this.run();
    }

    #randomNum(min, max) {
        return Math.random() * (max - min) + min;
    }
    
    #getIntervalTime() {
        const [minSec, maxSec] = this.#intervalSec;
        return this.#randomNum(minSec, maxSec) * 1000;
        
    }

    #getStayTime() {
        const [minMin, maxMin] = this.#stayMin;
        return this.#randomNum(minMin, maxMin) * 60 * 1000;
        
    }

    #setStateInterval() {
        this.#state = 'interval';

        const timeout = this.#getIntervalTime();

        this.#intervalTimeoutID = setTimeout(() => {
            const mark = this.#markDealer.deal();
            const markerElement = this.#map.display(mark, this.#onClick);
            this.#setSatateStay(markerElement);
        }, timeout);
    }

    #setSatateStay(markerElement) {
        this.#state = 'stay';
        this.#markerElement = markerElement;

        const timeout = this.#getStayTime();

        this.#stayTimeoutID = setTimeout(() => {
            this.#map.hide(this.#markerElement);
            this.#setStateInterval();
        }, timeout);
    }
}