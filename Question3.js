function solution(relation) {
    var answer = 0;
    var unique = true;

    for (let x = 0; x < relation.length; x++) {
        //check candidate key by ["student number"]
        for (let y = 0; y < relation.length; y++) {
            if (relation[x][0] === relation[y][0] && x !== y) {
                unique = false;
            }
        }
    }

    if (unique) { answer++ }
    unique = true;

    for (let i = 0; i < relation.length; i++) {
        //check candidate key by  ["name", "major"]
        for (let j = 0; j < relation.length; j++) {
            let a = relation[i][1].concat(relation[i][2])
            let b = relation[j][1].concat(relation[j][2])
            if (a === b && i !== j) {
                unique = false;
            }
        }
    }
    if (unique) { answer++ }

    return answer;
}

//console.dir(solution([['100', 'ryan', 'music', '2'], ['200', 'apeach', 'math', '2'], ['300', 'tube', 'computer', '3'], ['400', 'con', 'computer', '4'], ['500', 'muzi', 'music', '3'], ['600', 'apeach', 'music', '2']]))