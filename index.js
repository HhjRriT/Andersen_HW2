function makeObjectDeepCopy(orig) {
    if (typeof (orig) !== "object") {
        return orig;
    } else if (Array.isArray(orig)) {
        let arr = [];
        for (const i of orig) {
            arr.push(makeObjectDeepCopy(i));
        }
        return arr;
    } else {
        let result = {};
        for (const i of Object.keys(orig)) {
            result[i] = makeObjectDeepCopy(orig[i]);
        }
        return result;
    }
}


function isValidNumber(num) {
    return !isNaN(num) && num <= Number.MAX_SAFE_INTEGER && num >= Number.MIN_SAFE_INTEGER
}

function selectFromInterval(arr, firstIndex, secondIndex) {
    if (!Array.isArray(arr)) throw new Error("not array");
    arr.forEach((el) => {
        if (!isValidNumber(el)) throw new Error("not valid data in arr");
    })
    if (!(isValidNumber(firstIndex) && isValidNumber(secondIndex))) {
        throw new Error("not valid some index");
    }
    const result = [];
    const min = Math.min(firstIndex, secondIndex);
    const max = Math.max(firstIndex, secondIndex);
    for (let i of arr) {
        if (i >= min && i <= max) result.push(i);
    }
    return result
}


const myIterable = {
    from: 1,
    to: 9,
}

myIterable[Symbol.iterator] = function () {
    if (this.from > this.to) throw new Error("not valid indexes")
    if (!(isValidNumber(this.from) && isValidNumber(this.to))) throw new Error("not valid data (from/to)")
    return {
        current: this.from,
        last: this.to,
        next() {
            if (this.current <= this.last) {
                return {done: false, value: this.current++};
            } else {
                return {done: true};
            }
        }
    }
}