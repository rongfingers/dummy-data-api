const apiUrl = 'http://127.0.0.1:3000/data'
const booklist = document.querySelector('.booklist')
document.getElementById('addbook').addEventListener("submit", create)
 
function submitform() {
    const frm = document.getElementById('addbook');
    frm.submit();
}
 
function checkforblank() {
    var errormessage = "";
    if (document.getElementById('book_title').value == "") {
        errormessage += "enter book title \n";
        document.getElementById('book_title').style.borderColor = "#d9534f";
    }
    if (document.getElementById('author').value == "") {
        errormessage += "enter author \n";
        document.getElementById('author').style.borderColor = "#d9534f";
    }
    if (document.getElementById('quote').value == "") {
        errormessage += "enter quote \n";
        document.getElementById('quote').style.borderColor = "#d9534f";
    }
    if (document.getElementById('publication_date').value == "") {
        errormessage += "enter publication date \n";
        document.getElementById('publication_date').style.borderColor = "#d9534f";
    }
    if (document.getElementById('image_url').value == "") {
        errormessage += "enter image url \n";
        document.getElementById('image_url').style.borderColor = "#d9534f";
    }
    if (errormessage != "") {
        document.getElementById('addbook').reset();
        return false;
    }
}
 
function create(event) {
    event.preventDefault();
    let title = document.getElementById('book_title').value;
    let author = document.getElementById('author').value;
    let quote = document.getElementById('quote').value;
    let publication = document.getElementById('publication_date').value;
    let image_url = document.getElementById('image_url').value;
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            id: title,
            name: author,
            quote: quote,
            birthday: publication,
            image_url: image_url
        })
    }).then(function(res) {
        res.json().then(li)
    })
}
 
function li(bookdetails) {
    const li = document.createElement("li")
    const div = document.createElement("div")
    const div2 = document.createElement("div")
    const book_title = document.createElement("h3")
    const author = document.createElement("h5")
    const quote = document.createElement("p")
    const publication = document.createElement("p")
    const img = document.createElement("IMG")
    const a = document.createElement("a")
    const x = document.getElementById('formSec')
    div.setAttribute("class", "imgContent")
    div2.setAttribute("class", "textContent")
    book_title.setAttribute("data-id", bookdetails.id)
    book_title.innerHTML = bookdetails.id
    div2.appendChild(book_title)
    author.setAttribute("data-id", bookdetails.id)
    author.innerHTML = bookdetails.name
    div2.appendChild(author)
    publication.setAttribute("data-id", bookdetails.id)
    publication.innerHTML = bookdetails.birthday
    div2.appendChild(publication)
    div2.appendChild(document.createElement("hr"))
    quote.setAttribute("data-id", bookdetails.id)
    quote.innerHTML = bookdetails.quote
    div2.appendChild(quote)
    img.setAttribute("src", bookdetails.image_url)
    img.setAttribute("data-id", bookdetails.id)
    div.appendChild(img)
    li.appendChild(div)
    li.appendChild(div2)
    a.innerHTML = 'Delete'
    a.addEventListener("click", remove)
    a.setAttribute("data-id", bookdetails.id)
    a.setAttribute("class", "xbutton")
    li.appendChild(a)
    booklist.appendChild(li)
    if (x.style.display === 'block') {
        x.style.display = 'none';
    }
}
 
function showform() {
    const x = document.getElementById('formSec')
    if (x.style.display === 'none') {
        x.style.display = 'block';
    } else {
        x.style.display = 'none';
    }
    document.getElementById('addbook').reset();
    return false;
}
 
function remove(event) {
    event.preventDefault()
    const id = event.target.getAttribute("data-id")
    fetch(apiUrl + "/" + id, {
        method: 'DELETE'
    }).then(function() {
        booklist.removeChild(event.target.parentNode)
    })
}
fetch(apiUrl).then(function(res) {
    res.json().then(function(booklist) {
        booklist.forEach(li)
    })
})