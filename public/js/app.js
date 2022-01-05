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
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')

weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault()

    const location = search.value

    //resetting the text content when other data is fetched
    messageOne.textContent = "fetching info ..."
    messageTwo.textContent = ""
    messageThree.textContent = ""
    messageFour.textContent = ""

    fetch('/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent = data.error
            }else{
                messageOne.textContent = "Current temperature is "+data.temperature+" degree celsius"
                messageThree.textContent = "Description of current weather is "+data.description
                messageFour.textContent = "Humidity is "+data.humidity
                messageTwo.textContent = "Location : "+data.location
            }
        })
    })
})
