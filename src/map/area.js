class Area {
    #radius;
    #timings;

    constructor(radius, timings) {
        this.#radius = radius;
        this.#timings = timings;
    }

    update(position, markDealer) {
        this.#timings.forEach(timing => {
            timing.updateMarkDealer(markDealer);
            const mark = timing.mark;
            if(mark != undefined) {
                const distance = position.getDistance(mark.position); 
                if(distance > this.#radius) {
                    timing.reset();
                };
            };
        });
    }
}