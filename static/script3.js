const userDataBtn = document.getElementById('user-data-btn');
const userDataForm = document.getElementById('user-data-form');

userDataBtn.addEventListener('click', function(event) {
    userDataForm.style.display = 'flex';
    userDataForm.style.flexDirection = 'column';
    userDataForm.style.justifyItems = 'space-between';
    const passwordConf = document.createElement('input');

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
        for (const [key, value] of Object.entries(data)) {
            userDataBtn.style.cursor ='not-allowed';
            userDataBtn.disabled = true;
            const keyConst = document.createElement('label');
            const valueConst= document.createElement('input');
            keyConst.textContent = key;
            keyConst.for = value;
            valueConst.value = value;
            valueConst.placeholder = value;
            valueConst.id = key;
            passwordConf.id = 'password-conf';
            userDataForm.appendChild(keyConst);
            userDataForm.appendChild(valueConst);
            userDataForm.appendChild(passwordConf);
        }
    })
});
