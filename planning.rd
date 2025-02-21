Challenges: 
 - How I'm gonna build the shorting logic?
 - how I'm gonna count the completed task and uncompleted task count. 
    - I can set anchor tag on the hole task card then if the input checked: I'll store a value representing completed. later I'll find a way to know which key of all have true and count the number. 
    - I'll minus the number from total key, I'll get the left task number. 

 - Checked logic
    - How do I keep the check after refresh?
      - If ture includes on localstorage key, mark that id as checked. Initialize this before setting new value for checked. 


 I'll first store the value to browser storage, then I'll take the values from there and display it on th screen. 
 local storage key will be the id of date.now();
 inside the value a string of array will va placed. with all data. 


 tommorws task: 
 - style the side pannel 
 - build up all storage logic and finish this project by tommorow.


// The task display logic. 
 - When user adds task, it will get stored on browser storage.
 - I'll display all task from browser storage using for loop and its index. 
 - If a user clicks on a task, the href hash will be displayed, I'll get that and retret the value of that key from
   local storage. and display it on the modal.  