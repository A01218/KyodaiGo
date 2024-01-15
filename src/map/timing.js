class Timing {
    #intervalSec;
    #stayMin;
    constructor(intervalSec, stayMin) {
        this.#intervalSec = intervalSec;
        this.#stayMin = stayMin;
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
    run(markDealer, map, onClick) {
        const mark = markDealer.deal();
        setTimeout(() => {
            const markerElement = map.display(mark, onClick);

            setTimeout(() => {
                map.hide(markerElement);
                this.run(markDealer, map, onClick);
            }, this.#getStayTime());
        }, this.#getIntervalTime());
    }
}