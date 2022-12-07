let button = document.querySelector('button')

button.addEventListener('click', function(){
    let data = {
        name: document.querySelector('#name').value,
        mail: document.querySelector('#email').value,
        password: document.querySelector('#password').value
    }
   /* postData('https://x8ki-letl-twmt.n7.xano.io/api:ltCLXlov/auth/signup', data)
    .then((data) => {
      console.log(data); // JSON data parsed by `data.json()` call
    });
    */
   console.log(data);
});
