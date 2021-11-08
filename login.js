var URL1 = 'http://127.0.0.1/flight-booking-api/api/admin-login.php'; //Main API
var URL2 = 'http://127.0.0.1/flight-booking-backup-api/api/admin-login.php'; //Backup API

$("#login-btn").click(function(){
    var email = $("#email").val();
    var password = $("#password").val();

    if(email == "" || password == "" ) {
        alert("Fields can not be empty.");
    } else {
        LoginURLChecking(URL1);
    }
})

function LoginURLChecking(URL) 
{
    fetch(URL,{method:'POST'})
    .then(function(resp) {
        //URL working
        LoginResponseChecking(URL1);
    })
    .catch(function(err) {
        //URL not working
        LoginResponseChecking(URL2);
    });
}

function LoginResponseChecking(URL) 
{
    var request = new XMLHttpRequest()
    request.open('POST', URL, true)
    request.onload = function() 
    {
        if(request.status >=200 && request.status < 400) 
        {
            RegisterUser(URL);
        } 
        else 
        {
            RegisterUser(URL2);
        }
    }
request.send()
}

function RegisterUser(URL) 
{
    var email = $("#email").val();
    var password = $("#password").val();

    fetch(URL,{
        method:'POST',
        headers: {
            'Accept':'application/json, text/plain, */*',
            'Content-type':'application/json'
        },
        body:JSON.stringify({
            email: email,
            password: password
        })
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
        const result = JSON.stringify(data.message);
        if(result == "\"Authentication successful\"") {
            alert(result);
            setCookie("admin", 'true', 7)
            window.location.href = "../../admin.html";
        } else {
            alert(result);
        }
    })
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }