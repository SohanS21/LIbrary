console.log('library');
// Todos"
// 1. Store all the data to the localStorage
// 2. Give another column as an option to delete the book
// 3. Add a scroll bar to the view

//constructor
function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}

//display constructor
function Display() {

}

//add methods to display constructor
Display.prototype.add = function (book) {
    console.log('added');
    let tableBody = document.getElementById('tableBody');
    let uiString = `<tr>
                    
                    <td>${book.name}</td>
                    <td>${book.author}</td>
                    <td>${book.type}</td>
                </tr>`
    tableBody.innerHTML += uiString;

}
//implement clear finction
Display.prototype.clear = function () {
    let libraryForm = document.getElementById('libraryForm');
    libraryForm.reset();
}

//implement validate function
Display.prototype.validate = function (book) {
    if (book.name.length < 2 || book.author.length < 2) {
        return false;
    }
    else {
        return true;
    }
}

//implement alert function
Display.prototype.show = function (type, msg) {
    let message = document.getElementById('message');
    message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                            <strong>Message:</strong> ${msg} You should check in on some of those fields below.
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            <span aria-hidden="true"></span>
                        </div>`
    setTimeout(function(){
        message.innerHTML='';
    },2000);
}


//add a event listner to library form
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    // console.log('submitted');
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;

    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');
    let type;


    if (fiction.checked) {
        type = fiction.value;
    }
    else if (programming.checked) {
        type = programming.value;
    }
    else if (cooking.checked) {
        type = cooking.value;
    }

    let book = new Book(name, author, type);
    console.log(book);

    let display = new Display();


    if (display.validate(book)) {
        display.add(book);
        display.clear();
        display.show('succes','Your book has been successfully added.');
    }
    else {
        //eror
        display.show('Danger','Sorry you cannot add this book.');
    }

    e.preventDefault();
}