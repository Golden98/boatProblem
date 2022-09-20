/*
    Brayden Golden CSCI 395

    tests if moving couples across a river is possible

    format of answer [wife, husband, wife, husband, wife, husband], 
    where true is at the end and false is at the start.

    logs answer in reverse order
*/






let memo = new Map();

// returns false if they are not allowed to be in that config
function Test(array) {
    for (let i = 0; i < 3; i++) {
        if (array[(i*2) % 6] != array[(i*2 + 1) % 6]) {
            if (array[(i*2) % 6] == array[(i*2 + 3) % 6] || array[(i*2) % 6] == array[(i*2 + 5) % 6]) {
                return false; // they are next to another hus
            }
        }
    }
    return true;
}

// check if everyone is across
function isDone(array) {
    for (let i of array) {
        if (!i) {
            return false;
        }
    }
    return true;
}

function toString(array) {
    let str = "";
    for (let i of array) {
        if (i) {
            str += "1";
        } else {
            str += "0";
        }
    }
    return str;
}

// each move is a left then right, starting arrays are after first right move

function move(places) {
    memo.set(toString(places), false);
    // try every option, pick 1 or 2 to go from false to true, then pick 1 or 2 to go from true to false
    for (let i = 0; i < places.length; i++) {
        // send alone
        if (!places[i]) {
            let next = Array.from(places);
            next[i] = !next[i];
            if (moveL(next)) {
                console.log(next);
                return;
            }
            for (let j = i + 1; j < places.length; j++) { // send with another
                if (!places[j]) {
                    next[j] = !next[j];
                    if (moveL(next)) {
                        console.log(next);
                        return;
                    }
                    next[j] = !next[j];
                }
            }
        }
    }
}

function moveR(places) {
    // if its not possible
    if (!Test(places)) {
        return false;
    }
    // have we been here
    if (memo.get(toString(places)) != undefined) {
        return false;
    } else {
        memo.set(toString(places), false);
    }

    for (let i = 0; i < places.length; i++) {
        // send alone
        if (!places[i]) {
            let next = Array.from(places);
            next[i] = !next[i];
            if (moveL(next)) {
                console.log(next);
                return true;
            }
            for (let j = i + 1; j < places.length; j++) { // send with another
                if (!places[j]) {
                    next[j] = !next[j];
                    if (moveL(next)) {
                        console.log(next);
                        return true;
                    }
                    next[j] = !next[j];
                }
            }
        }
    }
    return false;
}

function moveL(places) {
    // if its not possible
    if (!Test(places)) {
        return false;
    }
    if (memo.get(toString(places)) != undefined) {
        return false;
    } else {
        memo.set(toString(places), false);
    }

    if (isDone(places)) {
        return true;
    }

    for (let i = 0; i < places.length; i++) {
        // send alone
        if (places[i]) {
            let next = Array.from(places);
            next[i] = !next[i];
            if (moveR(next)) {
                console.log(next);
                return true;
            }
            for (let j = i + 1; j < places.length; j++) { // send with another
                if (places[j]) {
                    next[j] = !next[j];
                    if (moveR(next)) {
                        console.log(next);
                        return true;
                    }
                    next[j] = !next[j];
                }
            }
        }
    }
    return false;
}

move([false, false, false, false, false, false]);
console.log([false, false, false, false, false, false]);