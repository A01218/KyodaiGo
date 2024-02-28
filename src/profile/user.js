class User {
    name;
    credit;
    // [null, '1', null, null, '1', null,..., null]
    capturedCharas;
    capturedTatekans;

    constructor(name, credit, capturedCharas, capturedTatekans) {
        this.name = name;
        this.credit = credit;
        this.capturedCharas = capturedCharas;
        this.capturedTatekans = capturedTatekans;
    }

    static load() {
        if(!User.exist()) return null;
        
        const name = localStorage.getItem("userName");
        const credit = parseInt(localStorage.getItem("creditNum")||creditNum, 10);
        const _capturedCharas = JSON.parse(localStorage.getItem("capturedCharas")||JSON.stringify(capturedCharas));
        const _capturedTatekans = JSON.parse(localStorage.getItem("capturedTatekans")||JSON.stringify(capturedTatekans));

        creditNum = credit;
        capturedCharas = _capturedCharas;
        capturedTatekans = _capturedTatekans;

        return new User(name, credit, _capturedCharas, _capturedTatekans);
    }

    static exist() {
        return !!localStorage.getItem("userName");
    }

    static register(name) {
        localStorage.setItem("userName", name);
        return User.load();
    }

    updateName(name) {
        this.name = name;

        localStorage.setItem("userName", this.name);
    }

    addCredit(credit) {
        this.credit = this.credit + credit;

        localStorage.setItem("creditNum", this.credit);
        creditNum = this.credit;
    }

    addChara(mark) {
        this.capturedCharas[mark.number-1] = "1";

        localStorage.setItem("capturedCharas", JSON.stringify(this.capturedCharas));
        capturedCharas = this.capturedCharas;
    }

    addTatekan(mark) {
        this.capturedTatekans[mark.number-1] = "2";

        localStorage.setItem("capturedTatekans", JSON.stringify(this.capturedTatekans));
        capturedTatekans = this.capturedTatekans;
    }

    delete() {
        localStorage.clear();
    }
}