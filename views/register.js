document.getElementById("reg-form").addEventListener("submit",async function(event){
    event.preventDefault();
    
    const name = document.getElementById("Name").value;
    const email = document.getElementById("Email").value;
    const password = document.getElementById("Password").value;
    const confirmPassword = document.getElementById("ConfirmPassword").value;
    const role = document.getElementById("role").value;
   
    if (!name||!email||!password||!confirmPassword||!role){
        alert("Please fill all the fields");
        return;        
    }
    if (password!==confirmPassword){
        alert("Enter matching passwords");
        return;
    } 

    const payload = {name,email,password,role};

        
    try{
        const response = await fetch("/register",{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(payload)
        });
        const message = await response.json();
        alert(message.message);
    } 
    catch(error){
        alert("Error:"+error);
    }

});

/*document.getElementById('log-form').addEventListener('sumbit',async function(event){
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementbyId("password").value;
    
    if(!name||!password){
        alert('please fill all the fields')
        return;
    }

    const payload = {name,email}

    try{
        const resposnse = await fetch("/login",{
            method:'POST',
            headers:{'Content-Type: application/json'},
            body:JSON.stringify(payload)
        });
        const message = await response.json();
        alert(message);
    }
    catch(error){
        alert('Error:'+error);
    }
});
*/



