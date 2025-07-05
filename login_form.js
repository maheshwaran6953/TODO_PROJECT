let new_user_text = document.querySelector('.new-user-text');

let under_text = document.querySelector('.under-text');

let sign_up_button = document.querySelector('.signup');

let main_text = document.querySelector('.main-text');

let form_tag = document.querySelector('.form');

let button_tag = document.querySelector('.button-tag');

let isSignUpMode = false;


function changeFunction() {
    if(isSignUpMode){
        new_user_text.innerHTML = 'Already Have An Account ?';

        under_text.innerHTML = '';

        sign_up_button.textContent = '< Back To LogIn';

        main_text.innerHTML = 'Sign Up With';

        form_tag.innerHTML = '<input type="text" placeholder="Your Name" class="userName"><input type="email" placeholder="Email" class="userEmail"><input type="password" placeholder="Create Password" class="userPassword"><input type="password" placeholder="Confirm Password" class="userRePassword">';
        
        button_tag.innerHTML = '<button id="signed_up">Sign Up</button>';


        
        document.getElementById('signed_up').addEventListener('click', function(){

            let UserName = document.querySelector('.userName').value;

            let UserEmail = document.querySelector('.userEmail').value;

            let UserPassword = document.querySelector('.userPassword').value;
            
            let UserRePassword = document.querySelector('.userRePassword').value;
            
            if(!UserName ||!UserEmail || !UserPassword || !UserRePassword){
                alert('Please fill in all fields');
                return;
            }

            if(UserPassword !== UserRePassword){
                alert("Passwords doesn't match");
                return;
            }

            let users = JSON.parse(localStorage.getItem('users')) || [];

            for(let i=0;i<users.length;i++){
                if(users[i].email === UserEmail){
                    alert('This E-mail already exists');
                    return;
                }
            }
            
            users.push({name : UserName , email : UserEmail, password : UserPassword});
            
            localStorage.setItem('users', JSON.stringify(users));

            sessionStorage.setItem("activeUserName",UserName)

            window.location.href = 'https://maheshwaran6953.github.io/TODO_PROJECT/todo.html';
        });
    }

    else{
        new_user_text.textContent = 'New User ?';

        under_text.innerHTML = "Sign up here and make your TODO's list";
        
        sign_up_button.innerHTML = 'Sign Up >';
        
        main_text.innerHTML = 'Log In With';
        
        form_tag.innerHTML = '<input type="email" placeholder="Email" class="loggedin-email"><input type="password" placeholder="Password" class="loggedin-password">';
        
        button_tag.innerHTML = '<button id="loggedin_up">Log In</button>';
        
        document.getElementById('loggedin_up').addEventListener('click', function(){

            let Loggedin_Email = document.querySelector('.loggedin-email').value.trim();
            
            let Loggedin_Password = document.querySelector('.loggedin-password').value.trim();

            let users = JSON.parse(localStorage.getItem('users')) || [];

            let found = false;
            
            for(let i=0;i<users.length;i++){
                if(users[i].email === Loggedin_Email && users[i].password === Loggedin_Password){
                    found = true;
                    sessionStorage.setItem("activeUser", Loggedin_Email);
                    sessionStorage.setItem("activeUserName",users[i].name)
                    break;
                }
            }
            
            if(found){
                window.location.href = 'https://maheshwaran6953.github.io/TODO_PROJECT/todo.html';            }
            else{
                alert('Incorrect E-mail or Password');
            }

            console.log(JSON.parse(localStorage.getItem("users")));
            
        });
    }
}

function toggleSignUp(){
    isSignUpMode = !isSignUpMode;
    changeFunction();
}
changeFunction();
