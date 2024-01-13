class Timing {
    #intervalSec;
    #stayMin;

    constructor(intervalSec, stayMin){
        this.#intervalSec = intervalSec;
        this.#stayMin = stayMin;
    }

    #randomNum(min, max) {
        return Math.random()*(max - min) + min;
    }
    
    #setInterval() {
        const [min, max] = this.#intervalSec;
        return this.#randomNum(min, max);
    }

    #setStay() {
        const [min, max] = this.#stayMin;
        return this.#randomNum(min, max);
    }
}