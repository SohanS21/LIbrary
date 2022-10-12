console.log('library project');

class Book{
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    }
    insertlocalstorage(book) {
        let bookObj;

        let bookstore = localStorage.getItem("bookstore");
        if (bookstore == null) {
            bookObj = [];
        }
        else {
            bookObj = JSON.parse(bookstore);
        }
        bookObj.push(book);
        localStorage.setItem("bookstore", JSON.stringify(bookObj));

        

    }

}
class Display{
    add() {




        let bookObj;

        let bookstore = localStorage.getItem("bookstore");
        if (bookstore == null) {
            bookObj = [];
        }
        else {
            bookObj = JSON.parse(bookstore);
        }


        let html = "";

        bookObj.forEach(function (book,index) {
            html += `<tr>
            <td>${book.name}</td>
            <td>${book.author}</td>
            <td>${book.type}</td>
            <td><button  id="${index}" onclick="display.deleteBook(this.id)" class="btn btn-outline-danger my-2 my-sm-0" type="submit">Delete</button></td>

        </tr>`;



        });

        let tableBody = document.getElementById('tableBody');

        if (bookObj.length != 0) {
            tableBody.innerHTML = html;
        }
        else {
            tableBody.innerHTML = `<b style="color:red">There is no book in the library</b>`;
        }
    }
    clear(){
        let libraryForm = document.getElementById('libraryForm');
        libraryForm.reset(); 
    }
    validate(book){
        if (book.name.length < 2 || book.author.length < 2) {
            return false;
        }
        else {
            return true;
        }
    } 
    
    show(type, msg) {
        let message = document.getElementById('message');
        let format;
        if(type==='success'){
            format='success';
        }
        else{
            format='Eror';
        }
        message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                <strong>${format}:</strong> ${msg} You should check in on some of those fields below.
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                <span aria-hidden="true"></span>
                            </div>`
        setTimeout(function(){
            message.innerHTML='';
        },2000);
    }

       
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
        let bookItemLocalStorage=new Book();
        bookItemLocalStorage.insertLocalStorage(book);
        display.add(book);
        display.clear();
        display.show('success','Your book has been successfully added.');
    }
    else {
        //eror
        display.show('Eror','Sorry you cannot add this book.');
        display.clear();
    }

    e.preventDefault();
}