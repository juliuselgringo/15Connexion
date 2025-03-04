const userDataBtn = document.getElementById('user-data-btn');
const userDataForm = document.getElementById('user-data-form');
const modify = document.getElementById("modify");
const cancel = document.getElementById("cancel");
const displayBtn = document.getElementById("display-btn")
let nameInput = document.getElementById("nom");
let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("password");
let passwordConfirmationInput = document.getElementById("password-confirmation");



userDataBtn.addEventListener('click', () => {
    
    userDataForm.style.display = 'block';
    
    fetch('/user-data', {
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log("Success", data)
        console.log(data.nom)
        nameInput.value = data.nom
        email.value = data.email
        password.value = data.password
    })
});


displayBtn.addEventListener('click', () => {
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordConfirmationInput.type = passwordConfirmationInput.type === 'password' ? 'text' : 'password';
});