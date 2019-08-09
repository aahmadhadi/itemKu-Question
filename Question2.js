function solution(N, users) {
    var answer = [];
    var failurRate = [];
    const numberREGX = /^[0-9]*$/;

    //Validate the input
    if (!numberREGX.test(N) || N <= 0 || N > 500) { return 'N format must be 1~500.' }
    if (users.length > 200000) { return 'Maximum Users 200.000' }
    for (let a = 0; a < users.length; a++) {
        if (users[a] > (N + 1) || users[a] < 1 || !numberREGX.test(users[a]) ) { return 'User ' + (a + 1) + ' must be contain numbers 1 ~ N + 1.' }
    }

    for (let i = 1; i <= N; i++) {
        //Looping N make count failur Rate
        let failur = users.filter(user => user === i);
        failurRate.push({
            stage: i,
            rate: failur.length / users.length || 0
        });
        users = users.filter(user => user !== i);
    }

    for (let x = 0; x < failurRate.length; x++) {
        //Sort failur rate
        for (let y = 0; y < failurRate.length - 1; y++) {
            if (failurRate[y].rate < failurRate[y + 1].rate) {
                tmp = failurRate[y];
                failurRate[y] = failurRate[y + 1];
                failurRate[y + 1] = tmp;
            }
        }
    }

    for (let z = 0; z < failurRate.length; z++) {
        answer.push(failurRate[z].stage)
    }
    return answer;
}

//console.dir(solution(4, [4, 4,4, 4]))