const characters = (s) => {
    const getArr = s.split("");


    const getLength = getArr.reduce((acc, character) => {
        if(!acc.includes(character)) {
            acc.push(character)
        }

        return acc
    }, [])

    return getLength.length;
}

console.log("A", characters("abcabcbb"))
console.log("B", characters("bbbbb"))
console.log("C", characters("pwwkew"))