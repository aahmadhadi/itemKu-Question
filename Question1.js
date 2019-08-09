function solution(record) {
    /* */
    var answer = [];
    var users = [];
    var alphaNumericRGEX = /^[a-zA-Z0-9]*$/;
    var error = false;
    var errMessage = []

    // Limit Handling
    if (record.length > 100000) {
        return 'Data has reached the limit'
    }

    /***********************************
    * M A N A G E   U S E R S  D A T A *
    ***********************************/
    for (let x = 0; x < record.length; x++) {
        let tempRecord = record[x].split(' ', 3)

        if (tempRecord[0] === 'Enter') {
            /* IF RECORD ACTION ENTER */
            if (!alphaNumericRGEX.test(tempRecord[1]) || !alphaNumericRGEX.test(tempRecord[2])) {
                // Validation input format only alphanumeric characters
                error = true;
                errMessage.push('column '+(x+1)+' : Error in input format')
                continue;
            };
            if (tempRecord[1].length > 10 || tempRecord[2].length > 10) {
                // Validation nickname length, and uid length of the user ID and nickname is 1 ~ 10.
                error = true;
                errMessage.push('column '+(x+1)+' : Input has reached its maximum length')
                continue;
            };
            let searchUser = users.find(user => user.uid === tempRecord[1]);      // Search for the same user
            if (!searchUser) {
                /* If the same user not found
                 * Push input as new User    */
                users.push({
                    'uid': tempRecord[1],
                    'nickname': tempRecord[2],
                    'joined': true
                });
            } else {
                for (let y = 0; y < users.length; y++) {
                    if (users[y].uid === tempRecord[1] && users[y].joined === false) {
                        /* If find the same user and user has been leave
                         * Change joined status to True and Change user Nickname */
                        users[y].nickname = tempRecord[2];
                        users[y].joined = true;
                    }
                }
            }
        } else if (tempRecord[0] === 'Leave') {
            /* IF RECORD ACTION ENTER */
            if (!alphaNumericRGEX.test(tempRecord[1])) {
                // Validation input format only alphanumeric characters
                error = true;
                errMessage.push('column '+(x+1)+' : Error in input format')
                continue;
            };
            if (tempRecord[1].length > 10) {
                // Validation uid length of the user ID and nickname is 1 ~ 10.
                error = true;
                errMessage.push('column '+(x+1)+' : Input has reached its maximum length')
                continue;
            }
            let searchUser = users.find(user => user.uid === tempRecord[1]);      // Search for the same user
            if (searchUser) {
                for (let y = 0; y < users.length; y++) {
                    if (users[y].uid === tempRecord[1] && users[y].joined === true) {
                        /* If find the same user and user has been entered
                         * Change joined status to False */
                        users[y].joined = false;
                    }
                }
            }
        } else if (tempRecord[0] === 'Change') {
            /* IF RECORD ACTION CHANGE */
            if (!alphaNumericRGEX.test(tempRecord[1]) || !alphaNumericRGEX.test(tempRecord[2])) {
                // Validation input format only alphanumeric characters
                error = true;
                errMessage.push('column '+(x+1)+' : Error in input format')
                continue;
            };
            if (tempRecord[1].length > 10 || tempRecord[2].length > 10) {
                // Validation nickname length, and uid length of the user ID and nickname is 1 ~ 10.
                error = true;
                errMessage.push('column '+(x+1)+' : Input has reached its maximum length')
                continue;
            }
            let searchUser = users.find(user => user.uid === tempRecord[1]);      // Search for the same user
            if (searchUser) {
                for (let y = 0; y < users.length; y++) {
                    if (users[y].uid === tempRecord[1] && users[y].joined === true) {
                        /* If find the same user and user is Joined
                         * Change user Nickname */
                        users[y].nickname = tempRecord[2];
                    }
                }
            }
        }
    }

    /************************************
    * M A N A G E   T H E   A N S W E R *
    ************************************/
    if (error) {
        return errMessage;
    } else {
        for (let i = 0; i < record.length; i++) {
            let tempRecord = record[i].split(' ', 3);
            let selectedUser = users.find(user => user.uid === tempRecord[1]);
            if (tempRecord[0] === 'Enter') {
                answer.push(selectedUser.nickname + ' came in.');
            } else if (tempRecord[0] === 'Leave') {
                answer.push(selectedUser.nickname + ' has left.');
            }
        }

        return answer;
    }
}

//console.dir(solution(['Enter uid1234 Muzi', 'Enter uid4567 Prodo', 'Leave uid1234', 'Enter uid1234 Prodo', 'Change uid4567 Ryan']))
//console.dir(solution(['Enter uid1)234 Muzi', 'Enter uid4+567 Prodo', 'Leave uid1777777777777777777777777234', 'Enter uid1234 Prodo', 'Change uid4567 Ryan']))