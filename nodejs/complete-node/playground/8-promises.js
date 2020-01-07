const doWorkPromise = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let result
            try {
                result = a + b
            }
            catch(e) {
                reject(e)
            }
            resolve(result)
        }, 2000)
    })
} 

doWorkPromise(4, {a: 'b'}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})