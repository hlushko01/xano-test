if (sessionStorage.hasOwnProperty('user')){
    const authToken = sessionStorage.getItem('user');
    console.log(authToken);
    startBuild(authToken);
} else {
    alert('error');
}

function startBuild(authToken){
  let todoContainer = document.querySelector('#todo');
  getTodo('https://x8ki-letl-twmt.n7.xano.io/api:nFIUkynQ/todos_list', authToken)
  .then((data) => {
      console.log(data); // JSON data parsed by `data.json()` call
      parseTodoData(todoContainer, data);
  });
}


async function getTodo(url = '', data) {

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


function parseTodoData(container, data){
  container.innerHTML ='';
  for (let i = 0; i < data.length; i++){
    let arg = data[i].id;
    if(data[i].completed){
      container.innerHTML += `<div data_id=${data[i].id} class="todo-item is-completed">
        <div class="todo-item__do">
          ${data[i].todo_item}
        </div>
        <div class="todo-item__completed is-completed" >
          <input onClick = 'clickTodo(${arg}, "${data[i].todo_item}", ${data[i].user_id})' class="checkbox" type="checkbox" checked/>
          <div onClick = 'deleteTodo(${arg})' class ="remove">
          <img class="mw-24" src="../../src/img/icons8-remove-48.png">
        </div> 
        </div>
      </div>`
    } else {
      container.innerHTML += `<div data_id=${data[i].id} class="todo-item">
      <div class="todo-item__do">
        ${data[i].todo_item}
      </div>
      <div class="todo-item__completed is-completed" >
        <input onClick = 'clickTodo(${arg}, "${data[i].todo_item}", ${data[i].user_id})' class="checkbox" type="checkbox" />
        <div onClick = 'deleteTodo(${arg})' class ="remove">
          <img class="mw-24" src="../../src/img/icons8-remove-48.png">
        </div> 
      </div>
    </div>`
    }
    
  }

}

//function todoListeners(){}




async function editTodo(url = '', data, item, user, completed) {

  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${data}`
    },
    body: JSON.stringify({
      completed: `${completed}`,
      todo_item: `${item}`,
      user_id: `${user}`
    }),
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  
  });
  return response.json(); // parses JSON response into native JavaScript objects
  }



  /*                  Create new ToDo                 */


const form = document.querySelector('#form');
form.addEventListener('submit', function(e){
  e.preventDefault();
  let userData = sessionStorage.getItem('userData');
  userData = JSON.parse(userData);
  let todoText = document.querySelector('.todo-input').value;
  document.querySelector('.todo-input').value = '';
  const authToken = sessionStorage.getItem('user');
  console.log(userData, todoText);
  createTodo(`https://x8ki-letl-twmt.n7.xano.io/api:nFIUkynQ/todos_list`, userData, todoText)
  .then((data) => {
      console.log(data); // JSON data parsed by `data.json()` call
      startBuild(authToken);
  });
});

async function createTodo(url = '', data, text) {
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      todo_item: `${text}`,
      completed: false,
      user_id: `${data.id}`
    }),
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  
  });
  return response.json(); // parses JSON response into native JavaScript objects
  }





/*                    change todo status by click                                       */


function clickTodo(data, item, user){
  //console.log(data);
  let checkbox = document.querySelector(`div[data_id='${data}'] .checkbox`);
  let completed;
  if(checkbox.checked){
    completed = true;
  } else {
    completed = false;
  }
  const authToken = sessionStorage.getItem('user');

  editTodo(`https://x8ki-letl-twmt.n7.xano.io/api:ltCLXlov/todos_list/${data}`, authToken, item, user, completed)
  .then((data) => {
      console.log(data); // JSON data parsed by `data.json()` call
      //parseTodoData(todoContainer, data);
      const authToken = sessionStorage.getItem('user');
      startBuild(authToken);
  }); 
}



function deleteTodo(item){
  deleteTodoQuery(`https://x8ki-letl-twmt.n7.xano.io/api:ltCLXlov/todos_list/${item}`)
  .then((data) => {
      console.log(data, 'deleted'); // JSON data parsed by `data.json()` call
      
      const authToken = sessionStorage.getItem('user');
      startBuild(authToken);
  }); 
}


async function deleteTodoQuery(url = '') {
    const response = await fetch(url, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    
    });
    return response.json(); // parses JSON response into native JavaScript objects
    }
  