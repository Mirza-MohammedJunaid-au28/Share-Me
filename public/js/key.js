const copyBtn = document.getElementById('copy-btn')
const keyInput = document.getElementById('key-input')
const email = document.getElementById('key-email');
const sendBtn = document.getElementById('key-send-btn');

copyBtn.addEventListener('click', () =>{
    keyInput.select();
    keyInput.setSelectionRange(0,99999);

    navigator.clipboard.writeText(keyInput.value);
});

sendBtn.addEventListener('click', () =>{
    const mail = verifyEmail(email.value)

    const data = {
        mail : mail,
        key : keyInput.value
    }

    fetch("/sendKey", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
    })

    .then(data => data.json())
    .then(res => {
        console.log(res);
    })

});

function verifyEmail(email){

    if(email.length > 5){
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (email.match(validRegex)) {
          return email
        } else {
          alert("Please enter a valid email address");
        }
    }
}