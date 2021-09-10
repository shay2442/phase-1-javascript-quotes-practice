let quoteList = document.querySelector('#quote-list')
let newQuoteForm = document.getElementById('new-quote-form')

const baseUrl = 'http://localhost:3000/quotes'


fetch(baseUrl)
    .then(r => r.json())
    .then((quotesArray) => {
        quotesArray.forEach((quoteObj) => {
            turnQuoteIntoHTML(quoteObj);
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
            quote: quoteContent
        })
    })

        .then(r => r.json())
        .then((newQupte) => {
            newQuoteForm.likes = []
            turnQuoteIntoHTML(newQuote);
        })

})

function turnQuoteIntoHTML(quoteObj) {
    let outerElement = document.createElement('li')
    outerElement.className = 'quote-card'

    outerElement.innerHTML = `<blockquote class ="blockquote">
    <p class="mb-0>${quoteObj.quote}</p>
    <footer class="blockquote-footer">${quoteObj.author}</footer>
    <br>
    <button class='btn-success'>Likes: <span>${quoteObj.likes.length}</span></button>
    <button class='btn-danger'>Delete</button>
    </blockquote>`

    quoteList.append(outerElement)

    let deleteButton = outerElement.querySelector('.btn-danger')
    let likeButton = outerElement.querySelector('btn-success')
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
                'COntent-Type': 'application/json',
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