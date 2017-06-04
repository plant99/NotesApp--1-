//add notes

var red = document.querySelector('.red')
var yellow = document.querySelector('.yellow')
var green = document.querySelector('.green')
var priorityValue = document.querySelector('.priorityValue')
var save = document.querySelector('.save')
var note = document.querySelector('.note')
red.onclick = function() {
    priorityValue.value = 3;
}
yellow.onclick = function() {
    priorityValue.value = 2;
}
green.onclick = function() {
    priorityValue.value = 1;
}
save.onclick = function() {
    if (note.value != "") {
        if (localStorage['counter'] === null || localStorage['counter'] === undefined || localStorage['counter'] === "" || localStorage['counter'] === 0) {
            localStorage.setItem('counter', 1)
            localStorage.setItem('1', (note.value + priorityValue.value))
        } else {
            var counter = localStorage.getItem('counter')
            counter++;
            localStorage.setItem('counter', counter)
            key1 = counter.toString()
            localStorage.setItem(key1, (note.value + priorityValue.value))
        }
        note.value = ""
    }

    updateList()
}

//read notes
var sort = document.querySelector('.sort');
var listHolder = document.querySelector('.listHolder');
var counter1 = 0;
if (localStorage.length === 0) {
    var list = document.createElement('li')
    list.innerHTML = "Sorry, your stack of notes is empty"
    listHolder.appendChild(list)
} else {
    updateList()
}

sort.onclick = function() {
    var lists = document.querySelectorAll('ul li')
    listHolder.innerHTML = "";
    for (var i = 0; i < lists.length; i++) {
        var priority = lists[i].getAttribute('class').slice(1);
        if (priority == 3)
            listHolder.appendChild(lists[i])
    }
    for (var i = 0; i < lists.length; i++) {
        var priority = lists[i].getAttribute('class').slice(1);
        if (priority == 2)
            listHolder.appendChild(lists[i])
    }
    for (var i = 0; i < lists.length; i++) {
        var priority = lists[i].getAttribute('class').slice(1);
        if (priority == 1)
            listHolder.appendChild(lists[i])
    }
}


//edit
var red1 = document.querySelector('.red1')
var yellow1 = document.querySelector('.yellow1')
var green1 = document.querySelector('.green1')
red1.onclick = function() {
    priorityValueEdit.value = 3;
}
yellow1.onclick = function() {
    priorityValueEdit.value = 2;
}
green1.onclick = function() {
    priorityValueEdit.value = 1;
}
var editNote = document.getElementById('editNote')
var priorityValueEdit = document.querySelector('.priorityValueEdit')
var x = document.getElementById('x')
var sNo = document.querySelector('.sNo')
var save = document.getElementById('save')
sNo.onchange = function() {
    editNote.value = "";
    editNote.value = localStorage.getItem(sNo.value).slice(0, localStorage.getItem(sNo.value).length - 1);
    priorityValueEdit.value = localStorage.getItem(sNo.value)[localStorage.getItem(sNo.value).length - 1]
}
save.onclick = function() {
    x.value = ""
    if (editNote.value != "") {
        var key = sNo.value.toString();
        var value = (editNote.value + priorityValueEdit.value).toString();
        localStorage.setItem(key, value)
    }
    priorityValueEdit.value = ""
    editNote.value = ""
    updateList()

}

//delete
var sNoDelete = document.querySelector('.sNoDelete')
var delete1 = document.getElementById('delete1')

delete1.onclick = function() {
    localStorage.removeItem(sNoDelete.value.toString())
    sNoDelete.value = ""
    updateList()
}

function updateList() {
    listHolder.innerHTML = "";
    counter1 = 0;
    for (key in localStorage) {
        var list = document.createElement('li')
        var anchor = document.createElement('a')
        counter1++;
        console.log(key)
        note1 = localStorage.getItem(key).slice(0, localStorage.getItem(key).length - 1)
        var priority = localStorage.getItem(key)[localStorage.getItem(key).length - 1]
        list.setAttribute('class', 'c' + priority)
        list.innerHTML = note1 + '(' + key + ')';

        if ((key != 'length') && (key != 'counter'))
            listHolder.appendChild(list)
        if (counter1 >= localStorage.length - 1)
            break;
    }
}