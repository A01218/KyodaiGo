const KindTatekan = "tatekan";
const KindChara = "chara";
const RarityTatekan = "tatekan";
const RarityLv1 = "Lv1";
const RarityLv2 = "Lv2";
const RarityLv3 = "Lv3";
const RarityLvLegend = "LvLegend";

function _choice(arr) {
    const index = Math.floor(Math.random()*arr.length);
    return arr[index];
}

class MarkDealer {
    #position;
    #rate;
    #radius;
    #charas;
    #tatekans;

    constructor(position, rate, radius, charas, tatekans) {
        this.#position = position;
        this.#rate = rate;
        this.#radius = radius;
        this.#charas = charas;
        this.#tatekans = tatekans;
    }

    deal() {
        const kind = this.#choiceKind();
        const position = this.#choicePosition();
        
        let number;
        let name;
        let rarity;
        let imageUrl;

        if(kind === KindChara) {
            rarity = this.#choiceCharaRarity();

            const chara = _choice(this.#charas[rarity]);
            number = chara.number;
            name = chara.name;
            imageUrl = "./imgs/charas/" + chara.img;
        }else {
            rarity = "tatekan";

            const tatekan = _choice(this.#tatekans);
            number = tatekan.number;
            name = tatekan.name;
            imageUrl =  "./imgs/tatekans/" + tatekan.img;
        }

        return new Mark(number, name, rarity, kind, imageUrl, position);
    }

    #choiceKind() {
        const num = Math.floor(Math.random()*1000);
        if(num < this.#rate[RarityTatekan]*10) {
            return KindTatekan;
        }else {
            return KindChara;
        }
    }

    #choiceCharaRarity() { 
        const sum = this.#rate[RarityLv1] + this.#rate[RarityLv2] + this.#rate[RarityLv3] + this.#rate[RarityLvLegend];
        const num = Math.random()*sum;
        if(num < this.#rate[RarityLv1]) {
            return RarityLv1;
        }else if(num < this.#rate[RarityLv1] + this.#rate[RarityLv2]) {
            return RarityLv2;
        }else if(num < this.#rate[RarityLv1] + this.#rate[RarityLv2] + this.#rate[RarityLv3]) {
            return RarityLv3;
        }else {
            return RarityLvLegend;
        }
    }

    #choicePosition() {
        const r = Math.random()*this.#radius;
        const theta = (Math.random()*360)*(Math.PI/180);
        
        return this.#position.addPolarCoordinate(r, theta);
    }
}