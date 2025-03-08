document.addEventListener('DOMContentLoaded', function() {
    const displayBtn = document.getElementById('display-btn');
    const passwordInput = document.getElementById('password');
    const passwordConfirmationInput = document.getElementById('password-confirmation');

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

    displayBtn.addEventListener('click', function(event) {
        passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordConfirmationInput.type = passwordConfirmationInput.type === 'password' ? 'text' : 'password';
    });

    document.getElementById('contactForm').addEventListener('submit', function(Event) {
        Event.preventDefault();

        const nom = document.getElementById("nom").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const passwordConfirmation = document.getElementById("password-confirmation").value;
        
        fetch('/index', {
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
})

