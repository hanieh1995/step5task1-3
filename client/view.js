app.View = (function(){
    var Doc = document.getElementById.bind(document);
    var input = Doc("newTask"),
    TableList = Doc("table-list"),
    EditInput = Doc("editbox"),
    Container = Doc("container"),
    editContainer = Doc("editContainer"),
    downloadBtn = Doc("download-btn"),
    uploadBtn = Doc("upload-btn"),
    name = Doc("name-user"),
    username = Doc("username"),
    division = Doc("division"),
    signBtn = Doc("sign-btn"),
    dataInput = "",
    check = false,
    index = 0,
    oldInput = "",
    newTask = "";
        

    function validData(){
        var ValueInput = input.value;
        if(!ValueInput){
            alert('Please enter a todo');
            return false;
        }
        dataInput=ValueInput;
        input.value="";
        return true;
    }
    
    function cleanList(){
        while (TableList.firstChild) {
            TableList.removeChild(TableList.lastChild);
        }
    }

    function createCell(Todo){
        var CellTodo = document.createElement('div');
            CellTodo.className = 'todo';
            TableList.appendChild(CellTodo);
            CellTodo.innerHTML=Todo.text;

            
        (function AddRemoveButton(){
            var remove = document.createElement('input');
            remove.type = "button";
            remove.value= "×";
            remove.className = "removebtn";
            remove.onclick = app.Controler.RemoveRow;
            CellTodo.appendChild(remove);
        })();

        if (Todo.completed){
                CellTodo.classList.add("completed-todo")

        }

        (function AddCheckbox(){
            var check = document.createElement('input');
            check.type = "checkbox";
            check.className= "inpcheckbox";
            check.onclick=app.Controler.CheckBoxTodo;
            if(Todo.completed)
            check.checked = true;
            else
            check.checked = false;
            CellTodo.appendChild(check); 
            })();

        

        (function AddEditButton(){

            var edit = document.createElement('img');
            edit.className = "editicon";
            edit.src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QA6RXhpZgAATU0AKgAAAAgAA1EQAAEAAAABAQAAAFERAAQAAAABAAAAAFESAAQAAAABAAAAAAAAAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAASABIDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD7U+C/wY+Gep/AvwR4h8Q+CfC+oX954es9T1LV9X0y3mmmlkt0lmnmmkUsxLMzMzHua8v8c6bo3i/w+1p4K8O2fhXw5rsqjw14f0PS7e3n8ZXcJDrdXsRQKNKjzlhIB5iOWJAaJJdzxJ8OfGvxX/ZL+DXh3wi0a20uh6bPqJk1AWiME09TbrJmGUSxeeYneIoQ6x7TwSD7n8L/AIZXHhN7nX/Euox+IvHupwxx6lrCxeXEiLyttaxknybdCSQucsxLuWYk0Afnx4m+Evwg0zxJq1nrn7S+reFtbt7uWG+0LQLe5h07TrhXIktrWPB2QxsGRFycKqjJor5y/aLYf8NB/E/kf8jRqnf/AKe5aKAOj8ffGXx/4O8feKdC0Dxz4k0PRNO1e8tbLTdN1e4t7a1hSdwkccaOFRFAACqAAKwf+Givitg/8XO8ZdP+g/d//HKKKAPuv4X/AAv8GeIvhn4S1XVfCOhanql9pFpdXd7eabDLNcTPCjPJI7KWZ2YkliSSSSaKKKAP/9k=";
            edit.onclick=app.Controler.EditTodo;
            CellTodo.appendChild(edit);
        })()
 
    }


    function checked(cell){
        var mycell = Array.prototype.slice.call(TableList.children);
        var Row = cell.parentNode;
        index = mycell.indexOf(Row);
        if(cell.checked)
        check = true;
        else
        check = false;
    }


    function findIndex(cell){
        var mycell = Array.prototype.slice.call(TableList.children);
        var Row = cell.parentNode;
        index = mycell.indexOf(Row);      
    }


    function EditInp(){
        Container.classList.add("opacity");
        editContainer.classList.add("edit-station-on");
        EditInput.value = oldInput;
    }


    function editbtn(){
        Container.classList.remove("opacity");
        editContainer.classList.remove("edit-station-on");
        newTask=EditInput.value;
    }


    function removeTodoView(cell){
        var mycell = Array.prototype.slice.call(TableList.children);
        var Row = cell.parentNode;
        index = mycell.indexOf(Row);
        if(!confirm("do you want delete ")){
            return false;
        }
        return true;
    }


    function SetStatesButtonColor(S){
        debugger;
        var ButtonsBoxes = Doc("button-boxes").children; 
        for(var i=1 ; i< 4 ; i++){
            if(S+1==i && ButtonsBoxes[i]){
                ButtonsBoxes[i].classList.add("active-state");   
            }
            else if(ButtonsBoxes[i]){
                ButtonsBoxes[i].classList.remove("active-state");
            }
        }
    
    }

    function hideBtn(){
        downloadBtn.classList.add("hide-btn");
        uploadBtn.classList.add("hide-btn");
        signBtn.classList.add("hide-btn");
        division.classList.add("hide-btn");
    }

    function showName(fName, lName, uName){
        name.innerHTML = fName +" "+lName;
        username.innerHTML = uName+"";
    }



    return{
            validData:validData,
            cleanList:cleanList,
            createCell:createCell,
            checked:checked,
            findIndex:findIndex,
            EditInp:EditInp,
            editbtn:editbtn,
            removeTodoView:removeTodoView,
            SetStatesButtonColor:SetStatesButtonColor,
            hideBtn:hideBtn,
            showName:showName,
            dataInput(){return dataInput},
            check(){return check},
            index(){return index},
            newTask(){return newTask},
            oldInput:{
                set:function(inp){
                    oldInput = inp;
                }
            }
    }
    
}());


