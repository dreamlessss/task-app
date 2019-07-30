//define Ui vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//load all event listeners
loadEventListeners();

//all event listeners
function loadEventListeners(){
    //get and load from ls
    document.addEventListener('DOMContentLoaded', getTasks);
    //add task event 
    //addtask user defined function
    form.addEventListener('submit', addTask);
    
    //remove task element
    taskList.addEventListener('click', removeTask);
    
    //remove all task
    clearBtn.addEventListener('click', clearAll);
    
    //filter
    filter.addEventListener('keyup', filterTask);
    
    
}

    function getTasks(){
        let tasks;
        if(localStorage.getItem('tasks') === null){
            tasks = [];
        } else{
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        
        tasks.forEach(function(task){
        const li = document.createElement('li');
        //add class
        li.className = 'collection-item';
        //create text node and append to li
        li.appendChild(document.createTextNode(task));
        
        //create new link element
        const link = document.createElement('a');
        //add class
        link.className = 'delete-item secondary-content';
        //add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        
        //append link to li 
        li.appendChild(link);
        
        //append li to ul
        taskList.appendChild(li);
        });
}
    
    //add task
    function addTask(e){
        
        if(taskInput.value === ''){
            alert('add a task');
        }else {
            //create li element
        const li = document.createElement('li');
        //add class
        li.className = 'collection-item';
        //create text node and append to li
        li.appendChild(document.createTextNode(taskInput.value));
        
        //create new link element
        const link = document.createElement('a');
        //add class
        link.className = 'delete-item secondary-content';
        //add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        
        //append link to li 
        li.appendChild(link);
        
        //append li to ul
        taskList.appendChild(li);
            
         //localstorage
        storeTaskInLocalStorage(taskInput.value);
        
        //clear input
        taskInput.value = '';
            
        }
        
        
        
       
        
        
        e.preventDefault();
    }

    //ls
    function storeTaskInLocalStorage(task){
        let tasks;
        if(localStorage.getItem('tasks') === null){
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    //remove task
    function removeTask(e){
        //console.log(e.target);
        if(e.target.parentElement.classList.contains('delete-item')){
            console.log(e.target);
            if(confirm('Are u sure?')){
                e.target.parentElement.parentElement.remove();
                
                //remove from local storage
                removeTaskFromLocalStorage(e.target.parentElement.parentElement);
            }
            
        }
    }

    //romove from local storage
    function removeTaskFromLocalStorage(taskItem){
        let tasks;
        if(localStorage.getItem('tasks') === null){
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        
        tasks.forEach(function(task, index){
            if(taskItem.textContent === task){
                tasks.splice(index, 1);
            }
        });
        
        localStorage.setItem('tasks', JSON.stringify(tasks));
        
    }

    //remove all task clear all
    function clearAll(){
        if(confirm('Are u sure to delete all?')){
            while(taskList.firstChild){
            taskList.removeChild(taskList.firstChild);
        }
            localStorage.clear();
        }
    }

    //filter task
    function filterTask(e){
        const text = e.target.value.toLowerCase();
        
        document.querySelectorAll('.collection-item')
            .forEach(function(task){
                const item = task.firstChild.textContent;
                if(item.toLowerCase().indexOf(text) = -1){
                    task.style.display = 'block';
                }else{
                    task.style.display = 'none';
            }
            
        });
    }

   
  
