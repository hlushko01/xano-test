
if (sessionStorage.hasOwnProperty('user')){
    const authToken = sessionStorage.getItem('user');
    console.log(authToken);

    authMe('https://x8ki-letl-twmt.n7.xano.io/api:ltCLXlov/auth/me', authToken)
    .then((data) => {
        console.log(data);
        sessionStorage.setItem('userData', JSON.stringify(data));
        displayUser(data);
    });
} else {
    alert('You are Log Out');
    window.location.href = 'file:///Users/dreamstore/Desktop/xano-test/index.html'
}

async function authMe(url = '', data) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${data}`
      },
    
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url

    });
    return response.json(); // parses JSON response into native JavaScript objects
}


/*                          Display User Info                           */


function displayUser({name, email}) {
    document.querySelector('.profile__name').innerText = `Welcome, ${name}`;
    document.querySelector('.profile__email').innerText = `Your Email is: ${email}`
}

document.querySelector('#logout').addEventListener("click", function(){
    sessionStorage.removeItem('user');
    window.location.reload();
});