
let myLibrary = [];

myLibrary.push(new Book("Tubes: Behind the Scenes at the Internet", "Andrew Blum", "https://www.amazon.co.uk/dp/B007TB5SKA/ref=dp-kindle-redirect?_encoding=UTF8&btkr=1", false));
myLibrary.push(new Book("Learn Enough Command Line to Be Dangerous", "Michael Hartl", "https://www.learnenough.com/command-line-tutorial/basics", false));
myLibrary.push(new Book("Pro Git", "Scott Chacon & Ben Straub", "https://git-scm.com/book/en/v2", false));
myLibrary.push(new Book("Think Like a Programmer: An Introduction to Creative Problem Solving", "V. Anton Spraul", "https://www.amazon.com/Think-Like-Programmer-Introduction-Creative/dp/1593274246/ref=sr_1_3?ie=UTF8&qid=1540326000&sr=8-3&keywords=think+like+a+programmer", false));
myLibrary.push(new Book("Eloquent JavaScript", "Marijn Haverbeke", "https://eloquentjavascript.net/", false));
myLibrary.push(new Book("DOM Enlightenment", "Cody Lindley", "http://domenlightenment.com/", false));
//myLibrary.push(new Book("", "", "", false));

function Book(title, author, pages, read,) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
};

let header = document.createElement("h1");
header.classList.add("h1");
header.textContent = "The Odin Library"
document.body.appendChild(header);

let subtitle = document.createElement("h2");
subtitle.classList.add("h2");
subtitle.textContent = "A collection of books reccomended in the Foundations Path of The Odin Project."
document.body.appendChild(subtitle);

let newBookButton = document.createElement("button");
newBookButton.id = "newBookButton"
newBookButton.textContent = "➕";    
document.body.appendChild(newBookButton);

let limitOneNewBook = false;

document.getElementById("newBookButton").addEventListener("click", function () {
    if (limitOneNewBook == false) {
        limitOneNewBook = true;
        addBookToLibrary();
    }
});

function addBookToLibrary() {
    let newBookForm = document.createElement("form");
    newBookForm.setAttribute('id', "newBookForm");

    let titleForm = document.createElement("input");
    titleForm.setAttribute('type', "text");
    titleForm.setAttribute('name', "title");
    titleForm.setAttribute('placeHolder', "Title");
    titleForm.setAttribute('id', "titleForm");
    titleForm.setAttribute('class', "formElements");

    let authorForm = document.createElement("input");
    authorForm.setAttribute('type', "text");
    authorForm.setAttribute('name', "author");
    authorForm.setAttribute('placeHolder', "Author");
    authorForm.setAttribute('id', "authorForm");
    authorForm.setAttribute('class', "formElements");

    let pagesForm = document.createElement("input");
    pagesForm.setAttribute('type', "text");
    pagesForm.setAttribute('name', "pages");
    pagesForm.setAttribute('placeHolder', "Link");
    pagesForm.setAttribute('id', "pagesForm");
    pagesForm.setAttribute('class', "formElements");

    let labelReadForm = document.createElement("label");
    labelReadForm.innerHTML = "Read:";
    labelReadForm.setAttribute('id', "labelReadForm");
    labelReadForm.setAttribute('for', "readForm");

    let readForm = document.createElement("input");
    readForm.setAttribute('type', "checkbox");
    readForm.setAttribute('id', "readForm");

    let submitFormButton = document.createElement("button");
    submitFormButton.setAttribute('type', "button");
    submitFormButton.setAttribute('id', "submitFormButton");
    submitFormButton.textContent = "Add";
    newBookForm.appendChild(titleForm);
    newBookForm.appendChild(authorForm);
    newBookForm.appendChild(pagesForm);
    newBookForm.appendChild(labelReadForm);
    newBookForm.appendChild(readForm);
    newBookForm.appendChild(submitFormButton);
    document.body.insertBefore(newBookForm, cardContainer);

    document.getElementById("submitFormButton").addEventListener("click", function () {
        newBookForm.innerHTML = '';
        removeDisplayBook();
        document.getElementById("newBookForm").reset();
        myLibrary.push(new Book(titleForm.value, authorForm.value, pagesForm.value, readForm.checked));
        displayBook();
        limitOneNewBook = false;
    });
};

let cardContainer = document.createElement("div");
cardContainer.classList.add("cardContainer");
document.body.appendChild(cardContainer);

function displayBook() {

    for (i = 0; i < myLibrary.length; i++) {

        let card = document.createElement("div");
        card.classList.add("card");

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "❌";
        deleteButton.setAttribute('data-index', i);
        deleteButton.setAttribute('id', "deleteButton");
        card.appendChild(deleteButton);

        let currentCard = deleteButton.getAttribute('data-index');

        deleteButton.addEventListener('click', () => {
            cardContainer.innerHTML = '';
            myLibrary.splice(currentCard, 1);
            displayBook();
            document.body.appendChild(cardContainer);
        });

        let title = document.createElement("div");
        title.textContent = myLibrary[i].title;
        title.setAttribute('id', "title");
        card.appendChild(title);

        let author = document.createElement("div");
        author.textContent = myLibrary[i].author;
        author.setAttribute('id', "author");
        card.appendChild(author);

        let pages = document.createElement("div");
        pages.setAttribute('id', "pages");
        let bookLink = document.createElement("a");
        bookLink.setAttribute("href", myLibrary[i].pages);
        bookLink.setAttribute('target', "_blank");
        bookLink.textContent = "Read the book";
        pages.appendChild(bookLink)
        card.appendChild(pages);

        let readButton = document.createElement("button");
        readButton.setAttribute('id', "readButton");

        if (myLibrary[currentCard].read == "true" || myLibrary[currentCard].read == true || myLibrary[currentCard].read == "on") {
            readButton.textContent = "📗 Read ";
        }
        else if (myLibrary[currentCard].read == false || myLibrary[currentCard].read == "false") {
            readButton.textContent = "📕 Not read ";
        };

        readButton.addEventListener('click', () => {
            cardContainer.innerHTML = '';
            if (myLibrary[currentCard].read == false) {
                myLibrary[currentCard].read = true;
            }
            else {
                myLibrary[currentCard].read = false
                    ;
            };
            displayBook();
        });

        card.appendChild(readButton);
        cardContainer.appendChild(card);
        document.body.appendChild(cardContainer);
    }
};
displayBook();

function removeDisplayBook() {
    cardContainer.innerHTML = '';
};