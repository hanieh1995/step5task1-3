app.Controler = (function () {

    function loadPage() {
   
        if (localStorage["guestMode"] == "true") {
            app.View.showName("guest", "", "");
            var inf = JSON.parse(localStorage["guestInf"]);
            app.View.hideBtn();

        }
        else {

            var inf = JSON.parse(localStorage["information"]);
            if (!inf) return;
            var fName = inf.firstName;
            var LName = inf.lastName;
            var UName = inf.username;
            app.View.showName(fName, LName, UName);
        }

        app.Model.todos.set(inf.list);

        if (localStorage["state"]) {
            changeStateButton(Number(localStorage["state"]));
        }
        else
            changeStateButton(0);

    }


    function newTask() {

        if (!app.View.validData())
            return

        app.Model.addTaskArray(app.View.dataInput());

        Render(0);
    }


    function Render(StateButton) {
        debugger;
        app.View.cleanList();
        lenTodo = app.Model.todos.get().length;
        for (var i = 0; i < lenTodo; i++) {
            if (StateButton == 2 && !app.Model.todos.get()[i].completed)
                continue;
            if (StateButton == 1 && app.Model.todos.get()[i].completed)
                continue;

            app.View.createCell(app.Model.todos.get()[i]);
        }
        if (localStorage["guestMode"] == "true") {

            var inf = JSON.parse(localStorage["guestInf"]);
            inf.list = app.Model.todos.get();
            console.log(inf.list);
            localStorage["guestInf"] = JSON.stringify(inf);
        }
        else {
            app.View.SetStatesButtonColor(StateButton);
            var inf = JSON.parse(localStorage["information"]);
            inf.list = app.Model.todos.get();
            localStorage["information"] = JSON.stringify(inf);
            debugger;
        }
    }


    function editOkBnt() {
        app.View.editbtn();
        app.Model.edit(app.View.newTask(), app.View.index());
        Render(0);
    }


    function RemoveRow() {
        if (app.View.removeTodoView(this))
            app.Model.remove(app.View.index())
        Render(0);
    }


    function EditTodo() {
        app.View.findIndex(this);
        app.View.oldInput.set(app.Model.todos.get()[app.View.index()].text);
        app.View.EditInp();
    }


    function CheckBoxTodo() {
        app.View.checked(this);
        app.Model.checked(app.View.check(), app.View.index());
        Render(0);
    }


    function changeStateButton(stateNumber) {
        Render(stateNumber);
        localStorage["state"] = stateNumber;
    }


    function downloadBtn() {

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var resTemp = this.responseText;
                if (!resTemp) return;
                app.Model.todos.set(JSON.parse(this.responseText));
                Render(0);
                alert("download successfuly!");
            }
        };
        const JWT = localStorage["information"];
        xhttp.open('GET', 'download', true);
        xhttp.setRequestHeader('authorization', JWT);
        xhttp.send();
    }


    function uploadBtn() {
        const JWT = localStorage["information"];
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var resTemp = this.responseText;
                if (!resTemp) return;
                alert("upload successfuly!");
            }
        }
        xhttp.open("POST", "upload", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.setRequestHeader('authorization', JWT);
        xhttp.send(JSON.stringify(app.Model.todos.get()));
    }


    return {
        newTask: newTask,
        changeStateButton: changeStateButton,
        editOkBnt: editOkBnt,
        RemoveRow: RemoveRow,
        EditTodo: EditTodo,
        CheckBoxTodo: CheckBoxTodo,
        loadPage: loadPage,
        downloadBtn: downloadBtn,
        uploadBtn: uploadBtn
    }

})();


