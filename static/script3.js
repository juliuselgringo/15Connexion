document.addEventListener('DOMContentLoaded', function() {
    const userDataBtn = document.getElementById('user-data-btn');
    const userDataForm = document.getElementById('user-data-form');
    const modifyBtn = document.getElementById("modify");
    const cancelBtn = document.getElementById("cancel");
    const displayBtn = document.getElementById("display-btn");
    let nameInput = document.getElementById("nom");
    let emailInput = document.getElementById("email");
    let passwordInput = document.getElementById("password");
    let passwordConfirmationInput = document.getElementById("password-confirmation");

    passwordInput.addEventListener("input", () => {
        const maj = document.getElementById("maj");
        const regMaj = /[A-Z]/;
        regMaj.test(passwordInput.value) ? maj.style.color = "green" : maj.style.color = "red";
        const min = document.getElementById("min");
        const regMin = /[a-z]/;
        regMin.test(passwordInput.value) ? min.style.color = "green" : min.style.color = "red";
        const int = document.getElementById("int");
        const regInt = /[\d]/;
        regInt.test(passwordInput.value) ? int.style.color = "green" : int.style.color = "red";
        const spe = document.getElementById("spe");
        const regSpe = /[@$!%*?&]/;
        regSpe.test(passwordInput.value) ? spe.style.color = "green" : spe.style.color = "red";

    })

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
            console.log("Success", data);
            nameInput.value = data.nom;
            emailInput.value = data.email;
            passwordInput.value = data.password;
        });
    });

    displayBtn.addEventListener('click', () => {
        passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordConfirmationInput.type = passwordConfirmationInput.type === 'password' ? 'text' : 'password';
    });

    userDataForm.addEventListener('submit', (Event) => {
        Event.preventDefault();
        
        const nom = nameInput.value;
        const email = emailInput.value;
        const password = passwordInput.value;
        const passwordConfirmation = passwordConfirmationInput.value;

        fetch('/modify', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache'
            },
            body: JSON.stringify({nom, email, password, passwordConfirmation})
        })
        .then(response => response.json())
        .then(data => {
            console.log("Success", data);
            alert(data.message);
        })
        .catch((error) => {
            console.error('Error', error);
            alert('Erreur lors de la soumission du formulaire');
        });
    });

    cancelBtn.addEventListener('click', () => {
        userDataForm.style.display = 'none';
    });
});