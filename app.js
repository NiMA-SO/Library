const $ = document;
const checkBox = $.querySelector('#hide input');
const title = $.querySelector('#Library-title');
const list = $.querySelector('#Library-container ul');
const text = $.querySelector('#textAdd');
const btn = $.querySelector('#btnAdd');
const search = $.querySelector('#search');





// search

search.addEventListener('keyup',()=>{
    for(let book of list.children){
        if(book.firstElementChild.textContent.indexOf(search.value) !== -1){
            book.style.display = 'block';
        }else{
            book.style.display = 'none';
        }
    }
    localStorage.setItem('search',search.value)
})

search.addEventListener('focus',()=>{
    for(let book of list.children){
        if(book.firstElementChild.textContent.indexOf(search.value) !== -1){
            book.style.display = 'block';
        }else{
            book.style.display = 'none';
        }
    }
    localStorage.setItem('search',search.value)
})





// save to locslStorage

let saveBook = (bookName) => {
    let bookNameArray;
    if(localStorage.getItem('storageBook') === null){
        bookNameArray = [];
    }
    else{
        bookNameArray = localStorage.getItem('storageBook').split(',');
    }

    bookNameArray.push(bookName);

    localStorage.setItem('storageBook' , bookNameArray)
}

// remove bookName from localStrorage

let removeLocalStorage = (NameRemove)=>{
    let bookNameArray;
    if(localStorage.getItem('storageBook') === null){
        bookNameArray = [];
    }
    else{
        bookNameArray = localStorage.getItem('storageBook').split(',');
    }

    for(let i = 0; i < bookNameArray.length ; i++){
        if(bookNameArray[i] === NameRemove){
            bookNameArray.splice(i,1);
        }
    }

    if(bookNameArray.length === 0){
        localStorage.clear();
    }else{
        localStorage.setItem('storageBook' , bookNameArray)
    }
}


// load book

document.addEventListener('DOMContentLoaded',()=>{

    search.value = localStorage.getItem('search');
    search.focus();

    let bookNameArray;
    if(localStorage.getItem('storageBook') === null){
        bookNameArray = [];
    }
    else{
        bookNameArray = localStorage.getItem('storageBook').split(',');
    }


    for(let item of bookNameArray){
        let li = document.createElement('li');

        li.className = 'book';
        li.innerHTML = `
        <h2>${item}</h2>
        <button>حذف</button>
        `
        list.appendChild(li);
    }
})



// hide show
checkBox.addEventListener('change',()=>{
    if(checkBox.checked == true){
        title.style.display = 'none';
        list.style.display = 'none';
    }
    else{
        title.style.display = 'initial';
        list.style.display = 'block';
    }
})



//delete

list.addEventListener('click',(e)=>{
    // if(e.target = )
    if(e.target.innerHTML === "حذف"){
        e.target.parentElement.remove();
        removeLocalStorage(e.target.parentElement.children[0].textContent)
    }
})


// add

btn.addEventListener('click',(e) => {
    let li = document.createElement('li');


    li.className = 'book';
    li.innerHTML = `
    <h2>${text.value}</h2>
    <button>حذف</button>
    `
    list.appendChild(li);

    saveBook(text.value);

    text.value = '';

    e.preventDefault();
})




