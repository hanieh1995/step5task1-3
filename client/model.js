var app = {};
var i = 0;
app.Model = (function () {

    var todos = [];
    console.log(todos);
    function addTaskArray(elm) {
        if(i === 0){ 
            todos = [];
            i = 1;
        }
       
        var newTask = { text: elm, completed: false };
      
        todos.push(newTask);


    }

    function checked(check, index) {
        todos[index].completed = check;
    }

    function edit(textN, index) {
        todos[index].text = textN;
    }

    function remove(index) {
        todos.splice(index, 1);
    }
    return {
        addTaskArray: addTaskArray,
        checked: checked,
        edit: edit,
        remove: remove,
        todos: todos = {
            set: function (todo) {
                todos = todo;
            },
            get: function () {
                return todos;
            }
        }

    }
}());


