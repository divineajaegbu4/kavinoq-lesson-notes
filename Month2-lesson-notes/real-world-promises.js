
const getUser = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users")

    const fetchUser = await response.json()

    const userTimeTaken = 1000;


    const userPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if(response.status === 200) {
                resolve({message: "user",  data: fetchUser})
            }else {
                reject("The response is not successful")
            }
        }, userTimeTaken)
    })

    return {userPromise, userTimeTaken}
}
       
const getPost = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts")

    const fetchPosts = await response.json();
    
    const postTimeTaken = 2000;

    const postPromise =  new Promise((resolve, reject) => {
    setTimeout(() => {
         if(response.status === 200) {
            resolve({message: "fetch posts:", fetchPosts})
         }else {
            reject("The status is not 200")
         }
            
        }, postTimeTaken)
    })  
    
    return {postPromise, postTimeTaken}
}

const getComments = async () => {
    
    const response = await fetch("https://jsonplaceholder.typicode.com/comments")

    const fetchComment = await response.json()

    const commentsTimeTaken = 3000;

    const commentsPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if(response.status === 200) {
               resolve({message: "reject comment:", data: fetchComment})
            }else {
                reject("The fetch post is not successful")
            }
            }, commentsTimeTaken) 
    })

    return {commentsPromise, commentsTimeTaken}
    
}


const getData = async() => {
try{
    const {userPromise, userTimeTaken} =  await getUser();
    const {postPromise, postTimeTaken} = await getPost();
    const {commentsPromise, commentsTimeTaken} = await getComments();

     const getTime = [userTimeTaken, postTimeTaken, commentsTimeTaken]


    const getTotalTimeTaken = getTime.reduce((total, time) => {
         return total += time;
    }, 0)
   
    const [userData, postData, commentsData] = await Promise.all([userPromise, postPromise, commentsPromise])

    console.log({...userData});
    console.log({...postData});
    console.log({...commentsData});
    console.log("Total time taken:", getTotalTimeTaken);
    
   
 }catch(err) {
    console.log("Error:", err);
 }

}

console.log(getData());


// getUser()
// .then(data => {
//     console.log(data)
//     return getPost()
// }).then(post => {
//     console.log(post)
//     return getComments()
// }).then(comment => {
//     console.log(comment)
// }).catch(err => console.log(err))


