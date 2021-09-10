let quoteList = document.querySelector('#quote-list')
let newQuoteForm = document.getElementById('new-quote-form')

const baseUrl = 'http://localhost:3000/quotes'


fetch(baseUrl)
    .then(r => r.json())
    .then((quotesArray) => {
        quotesArray.forEach((quoteObj) => {
            console.log(quoteObj)
            if(!('likes' in quoteObj)) {
            turnQuoteIntoHTML({
                ...quoteObj, 
                'likes': []
            }) 
            } else {
                turnQuoteIntoHTML(quoteObj)
            }
    
        })
    })

newQuoteForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let author = e.target['author'].value
    let quoteContent = e.target['new-quote'].value

    fetch(baseUrl, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            author: author,
            quote: quoteContent,
            likes: 0
        })
    })

        .then(r => r.json())
        .then((newQuote) => {
            newQuoteForm.likes = []
            turnQuoteIntoHTML(newQuote);
        })

})

function turnQuoteIntoHTML(quoteObj) {
    console.log(quoteObj)
    let outerElement = document.createElement('li')
    outerElement.className = 'quote-card'
console.log(quoteObj)
    outerElement.innerHTML = `<blockquote class ="blockquote">
    <p class="mb-0>${quoteObj.quote}</p>
    <footer class="blockquote-footer">${quoteObj.author}</footer>
    <br>
    <button id='btn-success'>Likes: <span>${quoteObj.likes.length}</span></button>
    <button id='btn-danger'>Delete</button>
    </blockquote>`

    quoteList.append(outerElement)
    // let testButton = document.createElement('button')
    // testButton.className = 'btn-success'
    // testButton.addEventListener
    // quoteList.append(outerElement)

    let deleteButton = outerElement.querySelector('#btn-danger')
    let likeButton = document.querySelector('#btn-success')
    let likeSpan = outerElement.querySelector('span')
    


    deleteButton.addEventListener('click', (e) => {
        fetch(baseUrl, {
            method: "DELETE"
        })
            .then(r => r.json)
            .then(() => {
                outerElement.remove
            })
    })

    likeButton.addEventListener('click', (e) => {
        fetch(baseUrl, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                quoteId: quoteObj.id
            })
        })
            .then(r => r.json())
            .then((newLike) => {
                quoteObj.likes.push(newLike)
                likeSpan.innerText = quoteObj.likes.length
            })

    })



}