const promiseResolve = new Promise(resolve => {
    setTimeout(() => {
        resolve("Data Loaded")
    }, 3000)
})


// To consume the promise

promiseResolve.then(data => console.log(data))


const promiseReject = new Promise((_, reject) => {
    setTimeout(() => {
      reject("Network Error")
    }, 2000)
})

promiseReject.catch(data => console.log(data))

const promiseMulti =  new Promise((resolve) => {
    resolve([1, 2, 3, 4, 5])
})

promiseMulti
.then(data => {
    console.log(data)
    return data.map((newData => newData * 2))
}).then(data => console.log(data))
.finally(() => console.log("Done successfully"))


