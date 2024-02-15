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
        const name = localStorage.getItem("userName");
        if(!name) return null;

        const credit = parseInt(localStorage.getItem("creditNum")||creditNum, 10);
        const _capturedCharas = JSON.parse(localStorage.getItem("capturedCharas")||JSON.stringify(capturedCharas));
        const _capturedTatekans = JSON.parse(localStorage.getItem("capturedTatekans")||JSON.stringify(capturedTatekans));
        return new User(name, credit, _capturedCharas, _capturedTatekans);
    }
}