# React-todo-list

## About this project 

This is a simple ToDo-App that allows us to build code for the frontend to do the common CRUD (Create, Read, Update and Delete) -operations: 

1. display a list of to do items  (read)
1. remove an item from the list (delete)
1. add a new  item to the list (create)
1. edit one item in the list (update)

## Set up a new project in this folder!
Navigate to this folder and type the following command on the terminal: 

1. `npm create vite@latest`

2. Select React and press enter
3. Select JavaScript and press enter
4. Now you have a new folder with the name `vite-project` (if you did not remname it). Navigate into the folder `cd vite-project`
5. Install the packages neede for React. Type `npm install`
6. Open the project in VsCode `code .`
7. Open a terminal in VS Code and type `npm run dev`
8. Click on the link in the terminal to open the browser.
9. Check the content!


## Task 1: Display a list of items


 - Clean up the  code  in the `App` component. Add a heading in the return statement of the component that fits your app, for example: `My To Do List`
 - Create a state, using the `useState`-hook in `App`. Add some todo-items to the state. Add one object for each todo-item.  Use the following structure for each todo-item: 

 ``` js
 
 { task: 'Learn React', status: 'open', id: '01' }
 ```
 
 - Create a component `List`. This component should get the array of todo-items as props. 
    - use a map function to render all the todo-items in return statement of the `List` component. Each item can be a list-item or a div. 
    - if the array is empty, (there are no items in state), display a text such as "No tasks today!"
    - Optional: destructure the props in `List`. 
    - use the `List` in the `App` component and pass the state `tasks` as props to `List`.
    - Add some more todo items in state in `App`, and check that they appear on the page.  
    - Remove all the todo items from the state in `App`, and check that you see the text "No tasks today" on the page. 

## Task 2: Delete an item
Will be added later via Moodle

 ## Task 3: Add new items
 Will be added later via Moodle


 ## Task 4: Edit an item

Will be added later via Moodle
