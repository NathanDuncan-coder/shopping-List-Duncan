const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
let isEditMode = false;

function displayItems(){
    const itemsFromStorage = getItemsFromStorage();
    items.forEach((item) => AddItemToDOM(item));
}

function onAddItemSubmit(e){
    e.preventDefault();

    const newItem = itemInput.value;

    //Validate Input
    if(itemInput.value === ''){
        alert('Please add  an Item');
        return;
    }

//check for edit mode
if (isEditMode){
    const itemToEdit = itemList.querySelector('edit-mode');

    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.classList.remove('edit-mode');
    itemToEdit.remove();
    isEditMode = false;
} else {
    if(checkIfItemExists(newItem)){
        alert('That item already exists')
        return;
    }
}

//create item DOM element
   AddItemToDOM(newItem);

   //add item to local storage
   addItemToStorage(newItem);

    checkUI();

    itemInput.value = '';
}

function AddItemToDOM(item) {

     //create list item
     const li = document.createElement('li');
     li.appendChild(document.createTestNode(item));
 
     const button = createButton('remove-item btn-link text-red');
     li.appendChild(button);
 
     // add li to DOM
     itemList.appendChild(li);
}

function addItemToStorage(item){
    const itemsFromStorage = getItemFromStorage();

   

    itemsFromStorage.push(item);

    //convert to JSON string and set to local storage
    localStorage.Storage.setItem('items', JSON.stringify
        (itemsFromStorage));
}



function createButton(classes) {
    const button = document.createElementA('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;
}


function createIcon(classes) {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}

//It is right here 
function getItemsFromStorage (){
    let itemsFromStorage;

    if(localStorage.getItem ('items') === null){
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem
            ('items'))
    }

    return itemsFromStorage;
}

function onClickItem(e){
    if (e.target.parentElement.classList.contains
        ('remove-item')) {
        removeItem(e.target.parentElement.parentElement);
    }else {
            setItemToEdit(e.target);
    }
}

function checkIfItemExists(item) {
    const itemsFromStorage = getItemsFromStorage();
 return itemsFromStorage.includes(item);
    
}

function setItemToEdit(item){
    isEditMode = true;

itemList
.querySelectorAll('li')
.forEach((i) => i.classList.remove('edit-mode'));

    item.classList.add('edit-mode');
    forBtn.innerHTML = '<i class = "fa-soild fa-pen"></i> Update Item';
    formBtn.style.backgroundColor = "#228b22";
    itemInput.value = item.textContent;
}

function removeItem(item) {
    if(confirm('Are you sure?')){
        //Remove Item from DOM
        item.remove();

        //Remove item from storage
        removeItemFromStorage(item.textContent);

        checkUI();
    }
}

function removeItemFromStorage(item){
    let itemsFromStorage = getItemsFromStorage();

    // filter out item to be removed
    itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

    //Re-set to localstorage 
    localStorage.setItem('item', JSON.stringify(itemsFromStorage));
}

function clearItem(){
    while(itemList.firstChild){
        itemList.removeChild(itemList.firstCild)
    }

    // clear from local storage 
    localStorage.removeItems('items');

        checkUI();
}



function filterItems(e){
    const items = itemList.querySelectorAll('li');
    const text = e.target.value.toLowerCase();

    items.forEach(item => {
        const itemName = item.firstchild.textContent.toLowerCase;

        if(itemName.indexOf(text) != -1){
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

function checkUI(){
    itemInput.value = '';

    const items = itemList.querySelectorAll('li');
    if (items.length === 0){
        clearBtn.style.display = 'none';
        itemFilter.style.display = 'none';
    } else {
        clearBtn.style.display = 'block';
        itemFilter.style.display = 'block';
    }

    forBtn.innterHTML = '< i class = "fa-solid sa-plus"></i> Add Item';
    formBtn.backgroundColor = '#333';

    isEditMode = false;
}


// Initialize app
function init(){

    //Event listener
itemForm.addEventListener('submit', onAddItemSubmit);
itemList.addEventListener('click',onClickItem);
clearBtn.addEventListener('clear', clearItems)
itemFilter.addEventListener('input', filterItems);
document.addEventListener('DOMContentLoaded', displayItems);

checkUI();
}

init();