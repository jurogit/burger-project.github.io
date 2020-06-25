/* jshint esversion:6 */


// keys or users - a helyes beviteli sorrend forszirozasa miatt
let userKeys = ['id', 'name', 'email'];

// get data from the server
function getServerData(url) {
    let fetchOptions = {
        method: "GET",
        mode: "cors",
        cache: "no-cache"
    };

    return fetch(url, fetchOptions).then(
        response => response.json(),
        err => console.log(err)
    );
}

function getUsers() {
    getServerData('http://localhost:3000/users').then(
        // data => console.log(data)
        data => fillDataTable(data, "userTable")
    );
}

let getUserDataBtn = document.querySelector('#getUserDataBtn');
if (getUserDataBtn) {
    getUserDataBtn.addEventListener('click', getUsers);
}

// fill user table with data
function fillDataTable(data, tableID) {
    let table = document.querySelector(`#${tableID}`);
    if (!table) {
        console.error(`Table "${tableID}" is not found!`);
        return;
    }
    
    // add new user row to the table
    let tBody = table.querySelector('tbody');
    tBody.innerHTML = '';
    let newRow = newUserRow();
    tBody.appendChild(newRow);

    let disabled = document.querySelector('#userTable>tbody>tr>td>input.form-control');
    disabled.setAttribute('disabled', true);
    
    for (let row of data) {
        // console.log(row);
        let tr = createElement('tr');
        for (const key of userKeys) {
            if (row.hasOwnProperty(key)) {
                let td = createElement('td');
                let input = createElement('input', {
                    type: "text",
                    class: "form-control",
                    name: key,
                    value: row[key]
                });
                // if (key == 'id') {
                //     // td.innerHTML = row[key]; // csak szoveg, nem input mezo
                //     let input = createElement('input', {
                //         type: "text",
                //         class: "form-control",
                //         name: key,
                //         value: row[key],
                //         readonly: true
                //     });
                //     td.appendChild(input);
                // } else {
                //     let input = createElement('input', {
                //         type: "text",
                //         class: "form-control",
                //         name: key,
                //         value: row[key]
                //     });
                //     td.appendChild(input);
                // }
                // tr.appendChild(td);
                if (key == 'id') {
                    input.setAttribute("readonly", true);
                }
                td.appendChild(input);
                tr.appendChild(td);
            }
        }
        let btnGroup = createBtnGroup();
        tr.appendChild(btnGroup);
        tBody.appendChild(tr);
    }
}

function createElement(name, attributes) {
    let element = document.createElement(name);
    for (let key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
    return element;
}

function delTableRow(btn) {
    let tr = btn.parentElement.parentElement.parentElement;
    let id = tr.querySelector('td:first-child').innerHTML;
    let fetchOptions = {
        method: "DELETE",
        mode: "cors",
        cache: "no-cache"
    };

    // fetch inditasa a server fele
    fetch(`http://localhost:3000/users/${id}`, fetchOptions).then(
        resp => resp.json(),
        err => console.log(err)
    ).then(
        data => {
            getUsers();
        }
    );
}

function createBtnGroup() {
    let group = createElement('div', {class: 'btn btn-group'});
    let syncBtn = createElement('button', {class: 'btn btn-info', onclick: 'syncData(this)'});
    syncBtn.innerHTML = '<i class="fas fa-sync"></i>';
    let delBtn = createElement('button', {class: 'btn btn-danger', onclick: 'delTableRow(this)'});
    delBtn.innerHTML = '<i class="fas fa-trash"></i>';

    group.appendChild(syncBtn);
    group.appendChild(delBtn);

    let td = createElement('td');
    td.appendChild(group);

    return td;
}

// create new user
function newUserRow(row) {
    let tr = createElement('tr');
    for (let key of userKeys) {
        let td = createElement('td');
        let input = createElement('input', {
            type: "text",
            class: "form-control",
            name: key
        });
        td.appendChild(input);
        tr.appendChild(td);
    }
    let newBtn = createElement('button', {
        class: "btn btn-success btn-block",
        onclick: "addUser(this)"
    });
    newBtn.innerHTML = '<i class="fas fa-user-plus"></i>';
    let td = createElement('td');
    td.appendChild(newBtn);
    tr.appendChild(td);

    return tr;
}

function getTableRowData(tr) {
    let inputs = tr.querySelectorAll('input.form-control');
    let data = {};
    for (let i = 0; i < inputs.length; i++) {
        data[inputs[i].name] = inputs[i].value;
    }
    return data;
}

function addUser(btn) {
    let tr = btn.parentElement.parentElement;
    let data = getTableRowData(tr);
    delete data.id;
    let fetchOptions = {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };
    
    fetch(`http://localhost:3000/users`, fetchOptions).then(
        response => response.json(),
        reject => console.error(reject)
    ).then(
        data => getUsers()
    );
}

function syncData(btn) {
    let tr = btn.parentElement.parentElement.parentElement;
    let data = getTableRowData(tr);
    let fetchOptions = {
        method: "PUT",
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };

    fetch(`http://localhost:3000/users/${data.id}`, fetchOptions).then(
        response => response.json(),
        reject => console.error(reject)
    ).then(
        data => getUsers()
    )
}





function calcTotalPrice() {
    let burgerPrice = 1200;
    let quantityInput = document.querySelector("input[name='quantity']");
    let quantity = parseInt(quantityInput.value);
    let totalPrice = quantity * burgerPrice;
    let message = document.getElementById('message');

    // totalPrice.textContent = 'Ár: ' + totalPrice + ' Ft';
    // ` (backquote/backtick) -> ó
    message.textContent = `Ár: ${totalPrice} Ft`;
}

/* document.addEventListener("DOMContentLoaded", function() {
    calcTotalPrice();
}); */

// html-ben onclick="calcTotalPrice" itt csak "click"
const submitBtn = document.querySelector("button[type='submit']");
if (submitBtn) {
    submitBtn.addEventListener("click", function(evt) {
        evt.preventDefault();
        calcTotalPrice();
    });
}
