console.log('client side javascript ')

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault()

    const location = search.value

    messageOne.textContent = "fetching info ..."
    messageTwo.textContent = ""//resetting the text content when other data is fetched
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent = data.error
            }else{
                messageOne.textContent = data.forecast
                messageTwo.textContent = "Location : "+data.location
            }
        })
    })
})
