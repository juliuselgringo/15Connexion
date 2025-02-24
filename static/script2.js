document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('connectForm').addEventListener('submit', function(Event) {
        Event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        
        fetch('/connexion', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        })
        .then(response => response.json())
        .then(data => {
            console.log("Success", data);

            if (data.message === 'Connexion réussie!'){
                fetch('/accueil', {
                    method:'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({message: data.message})
                })
                .then(response => response.json())
                .then(data => {
                    console.log("Accueil Success", data);
                    window.location.href = '/accueil';
                })
                .catch((error) => {
                    console.log('Accueil Error', error);
                    alert('Erreur lors de la connexion');
                })
            }
            else {
                alert("Email ou mot de passe incorrect!");
            }
    })
        .catch((error) => {
            console.log('Error', error);
            alert('Erreur lors de la connexion');
            window.location.href = '/connexion'  
        })
    });
})