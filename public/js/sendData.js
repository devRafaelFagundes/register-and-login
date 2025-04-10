console.log("sendData funcionando")

const registerForm = document.getElementById("register");
registerForm.addEventListener('submit', async (e)=>{
    
    e.preventDefault();

    const username = document.getElementById("username-register").value;
    const email = document.getElementById("email-register").value;
    const password = document.getElementById("password-register").value;

    try {
        const res = await fetch("http://localhost:3000/register", {
            method : "POST",
            headers : {'Content-type' : 'application/json'},
            body : JSON.stringify({username, email, password})
        })
    
        const data = await res.json();
        if (res.ok) {
            alert("user created, now you are ready to login")
        } else {
            // alert(data.message || "error trying to register")
            const errorSpace = document.getElementById("error")
            errorSpace.textContent = data.message
        }
        
    } catch (e) {
        alert("something went wrong")
    }
})

const loginForm = document.getElementById("login")
loginForm.addEventListener('submit', async (e)=>{
    
    e.preventDefault();
    
    const username = document.getElementById("username-login").value;
    const email = document.getElementById("email-login").value;
    const password = document.getElementById("password-login").value;
    
    try {
        const res = await fetch("http://localhost:3000/login", {
            method : "POST",
            headers : {"Content-type" : "application/json"},
            body : JSON.stringify({username, email, password})
        })
        const data = await res.json();
        if (res.ok) {
            alert("user logged in")
        } else {
            alert("something went wrong")
        }
    } catch (error) {
        alert("something went wrong")
        console.log(error)
    }
})