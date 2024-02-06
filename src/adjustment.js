function adjustment() {
    return {
        appearance: {
            radius:       50,
            number:       4,
            intervalSec:  [10, 20],
            stayMin:      [0.5,1],
            rate: {
                tatekan:  47,
                Lv1:      37,
                Lv2:      12.5,
                Lv3:      3,
                LvLegend: 0.5
            }
        },
        rarity: {
            tatekan:  [],
            Lv1:      ["A"],
            Lv2:      ["A", "B"],
            Lv3:      ["A", "B", "C"],
            LvLegend: ["A", "B", "C", "D"]
        },
        escapeTurns: {
            tatekan:  1,
            Lv1:      4,
            Lv2:      3,
            Lv3:      2,
            LvLegend: 1
        },
        credits: {
            bachelor: {
                tatekan:  0,
                Lv1:      1,
                Lv2:      2,
                Lv3:      5,
                LvLegend: 8
            },
            master: {
                tatekan:  0,
                Lv1:      0,
                Lv2:      1,
                Lv3:      2,
                LvLegend: 3
            },
            doctor: {
                tatekan:  0,
                Lv1:      0,
                Lv2:      0,
                Lv3:      1,
                LvLegend: 2
            },
        },
        degrees: {
            bachelor: 140,
            master: 30,
            doctor: 20,
        }
    }
}