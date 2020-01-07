// console.log('Client side JS script')



const submit = (address, callback) => {
    const url = 'http://localhost:3000/weather?address=' + address
    fetch(url).then((response) => {
    response.json().then(data => {
        if (data.error) {
            callback(data.error, undefined)
        } else {
            callback(undefined, data)
        }
    })
})
}

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    submit(location, (error, response) => {
        if(error) {
            console.log(error)
        } else {
            console.log(response)
        }
    })
    // console.log(location)
})