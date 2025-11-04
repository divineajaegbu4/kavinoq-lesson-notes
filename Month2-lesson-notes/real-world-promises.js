const getUser = () => {
    const fetchUser = fetch("https://jsonplaceholder.typicode.com/users").then(res => res.json())

    return new Promise(resolve => {
   
       setTimeout(async () => {
        try {
          const user = await fetchUser
           resolve({message: "fetch user:", data: user})
        }catch(err) {
            console.log(err)
        }
            
        }, 1000) 
    })
       
}

const getPost = () =>{
    const fetchPosts = fetch("https://jsonplaceholder.typicode.com/posts").then(res => res.json())
    
    return new Promise(resolve => {
    setTimeout(async() => {
        try {
            const post = await fetchPosts
            resolve({message: "fetch posts:", data: post})
        }catch(err) {
            console.log(err)
        }
           
        }, 2000)
     
    })
    
}

const getComments = () => {
    
    const fetchComment = fetch("https://jsonplaceholder.typicode.com/comments").then(res => res.json())

    return new Promise((_, reject) => {
        setTimeout(async() => {
            try {
            const comments = await fetchComment
            reject({message: "reject comment:", data: comments})
            }catch(err) {
                console.log(err)
            }
            }, 3000) 
    })
    
}
 

getUser()
.then(data => {
    console.log(data)
    return getPost()
}).then(post => {
    console.log(post)
    return getComments()
}).then(comment => {
    console.log(comment)
}).catch(err => console.log(err))