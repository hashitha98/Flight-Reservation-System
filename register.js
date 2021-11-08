var URL1 = 'http://127.0.0.1/flight-booking-api/api/register.php'; //Main API
var URL2 = 'http://127.0.0.1/flight-booking-backup-api/api/register.php'; //Backup API

$("#register-btn").click(function(){
  var nid = $("#nid").val();
  var name = $("#name").val();
  var email = $("#email").val();
  var password = $("#password").val();

  if(nid == "" || name == "" || email == "" || password == "") {
      alert("Fields can not be empty.");
  } else {
      RegisterURLChecking(URL1);
  }
});

function RegisterURLChecking(URL) 
{
  fetch(URL,{method:'POST'})
  .then(function(resp) {
      //URL working
      RegisterUrlResponseChecking(URL1);
  })
  .catch(function(err) {
      //URL not working
      RegisterUrlResponseChecking(URL2);
  });
}

function RegisterUrlResponseChecking(URL) 
{
  var request = new XMLHttpRequest()
  request.open('POST', URL, true)
  request.onload = function() 
  {
      if(request.status >=200 && request.status < 400) 
      {
        UserRegister(URL);
      } 
      else 
      {
        UserRegister(URL2);
      }
  }
request.send()
}

function UserRegister(URL) 
{
    var nid = $("#nid").val();
    var name = $("#name").val();
    var email = $("#email").val();
    var password = $("#password").val();

  fetch(URL,{
      method:'POST',
      headers: {
          'Accept':'application/json, text/plain, */*',
          'Content-type':'application/json'
      },
      body:JSON.stringify({
          nid: nid,
          name: name,
          email: email,
          password: password
      })
  })
  .then((res) => res.json())
  .then((data) => {
      console.log(data)
      const result = JSON.stringify(data.message);
      if(result === "\"Registration Succesfully\"") {
        alert(result);
        setCookie("email", email, 7)
        window.location.href = "../../index.html";
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