const xano = new XanoClient({
    //'apiGroupBaseUrl': 'https://x8ki-letl-twmt.n7.xano.io/api:ltCLXlov'
    'apiGroupBaseUrl': 'https://x8ki-letl-twmt.n7.xano.io/api:3aU_rGNJ'
});

const xanoLogin = new XanoClient({
    'apiGroupBaseUrl': 'https://x8ki-letl-twmt.n7.xano.io/api:LiMxzMrU'
});

let endpoint = '/my_first_endpoint'


let signForm = document.querySelector('#sign');
signForm.addEventListener('submit', function(e){
    e.preventDefault();
    let data = {
        name: document.querySelector('#name').value,
        email: document.querySelector('#email').value,
        password: document.querySelector('#password').value
    }
   postData('https://x8ki-letl-twmt.n7.xano.io/api:ltCLXlov/auth/signup', data)
    .then((data) => {
      console.log(data);
      if(data.hasOwnProperty('message')){
        alert(data.message);
      } else {
        let authToken = data.authToken;
        sessionStorage.setItem('user', authToken);
        window.location.href = 'https://hlushko01.github.io/xano-test/src/profiles/profile.html'
      }
    });
   //xanoPost(data)
   console.log(data);
});


function xanoPost({name, email, password}){
    xanoLogin.post('/auth/signup', {
        'name': `${name}`,
        'email': `${email}`,
        'password': `${password}`
    }).then(
        console.log(body.getResponse())
    );
};

function handleError(error) {
    //document.getElementById('errorMessage').innerText = 
    console.log(error.message);

    var httpResponse = error.getResponse();

    //document.getElementById('errorStatus').innerText = 
    console.log(httpResponse.getStatusCode());
    console.log(JSON.stringify(httpResponse.getBody(), null, 2));

    //updateDocumentState('loaded-error');

}

async function postData(url = '', {name, email, password}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
       // 'Authorization': 'Bearer'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({
        name: `${name}`,
        email: `${email}`,
        password: `${password}`
      }) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}
  
console.log(xanoLogin);


/*                          LOGIN FUNCTIONALITY                           */


async function userLogin(url = '', {name, email, password}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
     // 'Authorization': 'Bearer'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify({
      name: `${name}`,
      email: `${email}`,
      password: `${password}`
    }) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}


let loginForm = document.querySelector('#log');
loginForm.addEventListener('submit', function(e){
    e.preventDefault();
    let data = {
        email: document.querySelector('#email1').value,
        password: document.querySelector('#password1').value
    }
   postData('https://x8ki-letl-twmt.n7.xano.io/api:ltCLXlov/auth/login', data)
    .then((data) => {
      console.log(data);
      if(data.hasOwnProperty('message')){
        alert(data.message);
      } else {
        let authToken = data.authToken;
        sessionStorage.setItem('user', authToken);
        window.location.href = 'https://hlushko01.github.io/xano-test/src/profiles/profile.html'
      }
    });
   console.log(data);
});
