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
        const imageUrl = this.#choiceMarkImgUrl();
        const position = this.#choicePosition();

        return new Mark(imageUrl, position);
    }

    #choiceMarkImgUrl() {
        const kind = this.#choiceKind();
        
        if(kind === KindChara) {
            const chara = this.#choiceChara();
            return "./imgs/charas/" + chara.img;
        }else {
            const tatekan = this.#choiceTatekan();
            return "./imgs/tatekans/" + tatekan.img;
        }
    }

    #choiceKind() {
        const num = Math.floor(Math.random()*1000);
        if(num < this.#rate[RarityTatekan]*10) {
            return KindTatekan;
        }else {
            return KindChara;
        }
    }

    #choiceChara() {
        const charaRarity = this.#choiceCharaRarity();
        const chara = _choice(this.#charas[charaRarity]);
        return chara;
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

    #choiceTatekan() {
        const tatekan = _choice(this.#tatekans);
        return tatekan;
    }

    #choicePosition() {
        const r = Math.random()*this.#radius;
        const theta = (Math.random()*360)*(Math.PI/180);
        
        return this.#position.addPolarCoordinate(r, theta);
    }
}