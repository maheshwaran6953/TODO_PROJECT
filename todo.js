let activeUser = sessionStorage.getItem('activeUser');

    console.log(`Welcome ${activeUser}`);

    let userName = sessionStorage.getItem("activeUserName");

    document.querySelector('.userGreetings').innerHTML = `👋&nbsp;<span class="username-highlight">${userName}&nbsp;</span><span>!</span>`;

    document.querySelector('.logout_button').addEventListener("click", function(){
        sessionStorage.removeItem('activeUser');
        sessionStorage.removeItem('activeuserName');
        window.location.href = 'http://127.0.0.1:5500/index.html';
    })

    window.addEventListener('DOMContentLoaded',function(){
        const savedTheme = this.localStorage.getItem('themePreference');

        if(savedTheme === 'dark'){
            document.body.classList.add('dark-theme');
            document.querySelector('i').className = 'bx bx-sun';
        }
        else{
            document.body.classList.remove('dark-theme');
            document.querySelector('i').className = 'bx bx-moon';
        }
    });

    let inputText = document.querySelector(".input");

    let dateInput = document.querySelector(".date");

    let timeInput = document.querySelector(".time");

    let inputArray = JSON.parse(localStorage.getItem(activeUser + '_inputArray')) || [];

    let dateArray = JSON.parse(localStorage.getItem(activeUser + '_dateArray')) || [];

    let timeArray = JSON.parse(localStorage.getItem(activeUser + '_timeArray')) || [];

    addtodo();

    function addtodo() {

        let displayDiv = document.querySelector(".division");

        let todolist = "";

        for (let i = 0; i < inputArray.length; i++) {
            const dispaly = `
            <div class="todo_card">
            <div>${inputArray[i]}</div>
            <div>${dateArray[i]}</div>
            <div>${timeArray[i]}</div>
            <button class="
                edit" onclick="
                inputArray[${i}] = prompt('Edit your task:', '${inputArray[i]}')
                dateArray[${i}] = prompt('Edit you date:','${dateArray[i]}');
                timeArray[${i}] = prompt('Edit you time:','${timeArray[i]}');
                saveTodos();
                addtodo();
            ">EDIT</button>
            <button class="
                delete" onclick="
                inputArray.splice(${i}, 1)
                dateArray.splice(${i},1);
                timeArray.splice(${i},1);
                saveTodos();
                addtodo();
            ">DELETE</button>
            </div>
            `;
            todolist += dispaly;
        }
        displayDiv.innerHTML = todolist;
        
    }
    
    function add() {

        console.log("button clicked");
        
        if(!inputText.value || !dateInput.value || !timeInput.value){
            alert('Please fill in all fields');
            return;
        }
        inputArray.push(inputText.value);

        dateArray.push(dateInput.value);

        timeArray.push(timeInput.value);

        saveTodos();

        inputText.value = "";
        dateInput.value = "";
        timeInput.value = "";
        addtodo();
    }

    function saveTodos() {

        localStorage.setItem(activeUser + '_inputArray', JSON.stringify(inputArray));

        localStorage.setItem(activeUser + '_dateArray', JSON.stringify(dateArray));

        localStorage.setItem(activeUser + '_timeArray', JSON.stringify(timeArray));

    }

    function theme() {
        document.body.classList.toggle('dark-theme');

        const icon = document.querySelector('i');

        let isDark = document.body.classList.contains('dark-theme');
        
        localStorage.setItem('themePreference', isDark? 'dark' : 'light');

        if(isDark){
            icon.className = 'bx bx-sun';
        }
        else{
            icon.className = 'bx bx-moon';
        }

    }

    function clearAll(){
        if(confirm("Are you sure you want to delete all your TODOs?")) {
            inputArray = [];
            dateArray = [];
            timeArray = [];
            saveTodos();
            addtodo();
        }
    }

    document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        if (inputText.value.trim() && dateInput.value && timeInput.value.trim()) {
            add(); 
        } else {
            alert("Please fill in all fields before pressing Enter.");
        }
    }
});