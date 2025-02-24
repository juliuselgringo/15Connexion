document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('contactForm').addEventListener('submit', function(Event) {
        Event.preventDefault();

        const nom = document.getElementById("nom").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        
        fetch('/index', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({nom, email, password})
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

