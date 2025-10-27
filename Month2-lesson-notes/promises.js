// Introduction to Promises in JavaScript

// A Promise is an object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value.

const myPromise = new Promise((resolve, reject) => {
    const success = true;

    setTimeout(() => {
        if(success) {
            resolve("The operation was successful!");
        } else {
            reject("The operation failed.");
        }
    }, 2000);
})

const getMyPromise = async() => {
    try {
      const message = await myPromise
      console.log(message)
    }catch(error) {
       console.log(error)
    }finally {
         console.log("Promise has been settled (either resolved or rejected).");
    }
}

getMyPromise()


const getUserData = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(id === 1) {
                resolve("Successfully fetched user data.");
            }else {
                reject("User not found.");
            }
        }, 2000);
    });
}

getUserData(1)
.then((data) => {
    console.log(data);
}).catch((error) => {
    console.error(error);
})


// myPromise
//     .then((message) => {
//         console.log(message); // "The operation was successful!"
//     })
//     .catch((error) => {
//         console.error(error); // "The operation failed."
//     })
//     .finally(() => {
//         console.log("Promise has been settled (either resolved or rejected).");
//     })

// Chaining Promises


console.log("==================Chaining Promises==================");

const newPromiseData = new Promise((resolve, reject) => {
    return resolve(20)
})


newPromiseData
.then(data => {
    console.log("Initial data:", data); // 20
    return data * 3
})
.then(data => {
    console.log("After multiplying by 3:", data); // 60
    return data + 10
})
.then(data => {
    console.log("After adding 10:", data); // 70
})

console.log("=============chaininig fetch promises==================")

const fetchUser = fetch("https://jsonplaceholder.typicode.com/users/1")
.then(response => response.json())
.then(user => {
    console.log("Fetched user:", user);
    return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`);
})
.then(response => response.json())
.then(posts => {
    console.log("User's posts:", posts);
}).catch(error => {
    console.error("Error fetching data:", error);
});     
console.log(fetchUser)

console.log("===================Error handling==============")
fetch("https://jsonplaceholder.typicode.com/user")
  .then(response => {
    if (!response.ok) throw new Error("Bad response");
    return response.json();
  })
  .catch(error => {
    console.log("Logging error:", error.message);
    throw error; // rethrow so the next .catch() can handle it
  })
  .catch(error => console.log("Handled globally:", error.message));

console.log("====================Instead of handling errors everywhere, handle them once at the top level.=====")

async function fetchInvalidUser() {
  const res = await fetch("https://jsonplaceholder.typicode.com/invalid");
  if (!res.ok) throw new Error("Network request failed");
  return res.json();
}

async function main() {
  try {
    const user = await fetchInvalidUser();
    console.log(user);
  } catch (error) {
    console.error("❌ Global error handler:", error.message);
  }
}

main();


console.log("================Combining Multiple Promises")

const runAllSettled = async () => {
    const [success, failure, mixed] = await Promise.allSettled([
        Promise.resolve("First promise resolved."),
        Promise.reject("Second promise rejected."),
        Promise.resolve("Third promise resolved.")
    ]);

   console.log(success);
   console.log(failure);
   console.log(mixed);
}

// runAllSettled();


const promiseRace = async () => {
    const winner = await Promise.race([
       new Promise(resolve => setTimeout(() => resolve("First promise resolved."), 3000)),
       new Promise(resolve => setTimeout(() => resolve("Second promise resolved."), 4000)),
       new Promise((resolve) => setTimeout(() => resolve("Third promise resolved."), 2000))
    ]);

  console.log("Winner:", winner);
}

promiseRace();

const promiseAny = async () => {
    const firstSuccess = await Promise.any([
        new Promise ((resolve, reject) => {
            setTimeout(() => reject("First promise rejected."), 3000)
        }),
        new Promise ((resolve, reject) => {
            setTimeout(() => resolve("Second promise resolved."), 3000)
        }),
        new Promise ((resolve, reject) => {
            setTimeout(() => resolve("Third promise resolved."), 1000)
        })
    ])

    console.log("promise any:", firstSuccess)
}

promiseAny();

