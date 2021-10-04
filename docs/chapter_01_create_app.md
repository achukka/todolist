# Creating React App using Typescript

![3_app_with_todo_list](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/pya19pkiba8gn4hs6bbn.jpg)

Before we create the application, let’s set up our development environment.

1. Download and install the latest stable version of Node

> Though Node is not really required to use React, it bundle react applications into a neat packages that can be used relatively easy by other clients. See this [stack over flow post](https://stackoverflow.com/questions/41838728/does-react-really-need-nodejs-on-the-frontend-env/41839733#41839733) for more details

**Section 1:** Create a react application

Open your terminal and run

`npx create-react-app todolist — template typescript`

> Yes, you read it right, npx is a tool for executing node binaries. This [stack overflow post](https://stackoverflow.com/questions/50605219/difference-between-npx-and-npm/52018825#52018825) describes the differences well

Once you run the above command completes, your project structure should look like this

![1_folder_structure](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/l3lti1onrr42iukvc35i.PNG)

Now you can run your project by doing

`npm start`

You should see your application running on your default browser at port _3000_.

> If you have some other application react would ask you to allow it to run on the next availability port

![2_initial_run](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/a1iowtvoxwwrt5t724q7.PNG)

Congratulations :clap: , you have successfully created your first react application.

> Apologies if you are already an expert on React

Please commit your code to GitHub or any other code hosting platform. You can refer to this [commit](https://github.com/achukka/todolist/commit/db67cb3b25a33a1eb313508a348a8de029a4f158) for code structure.

---

In this section, we will build a [component](https://reactjs.org/docs/components-and-props.html#function-and-class-components) to display items in tabular format

> Feel free to skip this section by jumping this [gist](https://gist.github.com/achukka/a6b2fbaea1c9bad88f935c72f53d46eb)

**Section 2.1:** Define an interface to represent an item in the todo list

We store the _task_ we are interested in doing as _string_ and it’s _priority_ as _number_.

```javascript
export interface Item {
  task: string;
  priority: number;
}
```

**Section 2.2:** Define a component to show the items

This component will receive the items it needs to display through props. Let’s call it **ToDoList**

In the render method we collect the items for props. If there are no items received return a text, Ex: _Empty List_.

```javascript
class ToDoList extends React.Component<{ items: Item[] }, {}> {
  render() {
    const { items } = this.props;

    if (items.length === 0) {
      return <div>Empty List</div>;
    }
  }
```

[React.Component](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/class_components/) takes _props_ as first argument and _state_ as second variable

> Since the above component does not involve any user interaction we don’t have to store any state. Hence we can ignore the constructor.

If there are any items, we present in tabular format. First create a table with a header.

```javascript
<table {...getTableStyleProps()}>
  <thead>
    <tr key={`task_prioirity`}>
      <th>Task</th>
      <th>Priority</th>
    </tr>
  </thead>
</table>
```

> The key property in the row element would be used by React to decide whether this row needs to be re-rendered when there is a change in this component. React [docs](https://reactjs.org/docs/reconciliation.html#recursing-on-children) has a pretty good explanation on keys

Construct the table body by iterating items using [map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) and creating a row

```javascript
<tbody>
  {items.map((i, index) => (
    <tr
      key={`${i.task}_${i.priority}`}
      style={{ backgroundColor: index % 2 === 0 ? "#dddddd" : "white" }}
    >
      <td>{i.task}</td>
      <td>{i.priority}</td>
    </tr>
  ))}
</tbody>
```

It would be better if we organize our items based on priority. Hence we sort them in ascending order

```javascript
const sortItems = (items: Item[]): Item[] => {
  return items.sort((i1, i2) => i1.priority - i2.priority);
};
```

Stitching everything together we get our ToDoList Component

```javascript
// ToDoList.tsx
import React from "react";

export interface Item {
  task: string;
  priority: number;
}

const getTableStyleProps = (): {} => {
  return {
    style: {
      width: "100%",
      fontFamily: "arial, sans-serif",
      borderCollapse: "collapse",
      textAlign: "left",
      padding: "8px",
      border: " 1px solid #dddddd",
    },
  };
};

class ToDoList extends React.Component<{ items: Item[] }, {}> {
  render() {
    const { items } = this.props;

    if (items.length === 0) {
      return <div>Empty List</div>;
    }
    const sortedItems = sortItems(items);
    return (
      <table {...getTableStyleProps()}>
        <thead>
          <tr key={`task_prioirity`}>
            <th>Task</th>
            <th>Priority</th>
          </tr>
        </thead>
        <tbody>
          {sortedItems.map((i, index) => (
            <tr
              key={`${i.task}_${i.priority}`}
              style={{ backgroundColor: index % 2 === 0 ? "#dddddd" : "white" }}
            >
              <td>{i.task}</td>
              <td>{i.priority}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const sortItems = (items: Item[]): Item[] => {
  return items.sort((i1, i2) => i1.priority - i2.priority);
};

export default ToDoList;
```

**Section 3:** Add ToDoList to App

> Feel free to skip this section by jumping this [gist](https://gist.github.com/achukka/81ae173cb322fb4ab0105c579fef2549)

At this point, we are ready to use the **ToDoList** component we wrote in the previous subsection.

Import the component and build an initial list of items

```javascript
import React from "react";
import ToDoList, { Item } from "./ToDoList";

const initialList = [
  {
    task: "Pick up Milk",
    priority: 1,
  },
  {
    task: "Buy Eggs",
    priority: 2,
  },
  {
    task: "Buy Bread",
    priority: 3,
  },
];
```

- Extend the App component to accept props and items as state.
- Pass items received through state to ToDoList component in render method

```javascript
class App extends React.Component<{}, { items: Item[] }> {
  constructor(props: any) {
    super(props);
    this.state = {
      items: initialList,
    };
  }

  render() {
    const { items } = this.state;
    return (
      <div className="App">
        <br />
        <ToDoList items={items} />
      </div>
    );
  }
}
```

Stitching everything together should give us our **App** component

```javascript
// App.tsx
import React from "react";
import ToDoList, { Item } from "./ToDoList";

const initialList = [
  {
    task: "Pick up Milk",
    priority: 1,
  },
  {
    task: "Buy Eggs",
    priority: 2,
  },
  {
    task: "Buy Bread",
    priority: 3,
  },
];

class App extends React.Component<{}, { items: Item[] }> {
  constructor(props: any) {
    super(props);
    this.state = {
      items: initialList,
    };
  }

  render() {
    const { items } = this.state;
    return (
      <div className="App">
        <br />
        <ToDoList items={items} />
      </div>
    );
  }
}

export default App;
```

Running the application by `npm start` should show a table like below

![12_todoList_display](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/vxy4not9ak8b6cxw9yy6.png)

Please remember to commit your changes at this point.

---

**Section 4:** Define a component to add a new item

> Feel free to skip section by jumping to this [gist](https://gist.github.com/achukka/ec9a36de5a77596ff9b31c2d9490830e)

This component would contain two text boxes, one for task and another for priority and a button to submit the item. Let’s call it AddItem

> I sincerely apologize for bad naming, open for feedback on these

For this component we would need to store the input entered by user in a state variable

```javascript
import React from "react";
import { Item } from "./ToDoList";

class AddItem extends React.Component<{ addItem: any }, Item> {
  constructor(props: any) {
    super(props);
    this.state = {
      task: "",
      priority: -1,
    };
  }
```

Render the input form in a tabular format

```javascript
render() {
  return (
    <table>
      <tbody>
        <tr key={""}>
          <td>Task:</td>
          <td>
            <input
              id="task"
              type="text"
              placeholder="Enter task here"
              onChange={this.setTask}
            />
          </td>
          <td>Priority:</td>
          <td>
            <input
              id="prioity"
              type="text"
              placeholder="Enter priority here"
              onChange={this.setPriority}
            />
          </td>
          <td>
            <input id="submit" type="submit" onClick={this.addItem} />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
```

As you might have already guessed we will use the functions `setTask` and `setPriority` to update the state of item.

```javascript
setTask(evt: any) {
  this.setState({
    task: evt.target.value,
  });
}

setPriority(evt: any) {
  this.setState({
    priority: parseInt(evt.target.value),
  });
}
```

Once we collected the inputs, we should validate them.

```javascript
const isValid = (item: Item): boolean => {
  return item.task !== "" && item.priority !== -1;
};
```

Now we can submit the item using the function `addItem`

```javascript
addItem(evt: any) {
  const item = this.state;
  if (isValid(item)) {
    this.props.addItem(item);
  }

  this.setState({
    task: "",
    priority: -1,
  });
}
```

The above snippet calls a function `addItem` on props. This would pass state (or data) to the parent component. In react world this strategy is called [Lifting State Up](https://reactjs.org/docs/lifting-state-up.html). We do this so that AddItem can be reused to create newer items.

For the above three functions to be available in `render` method we need to bind to `this` object in the constructor.

```javascript
class AddItem extends React.Component<{ addItem: any }, Item> {
  constructor(props: any) {
    super(props);
    this.state = {
      task: "",
      priority: -1,
    };
    this.setTask = this.setTask.bind(this);
    this.setPriority = this.setPriority.bind(this);
    this.addItem = this.addItem.bind(this);
  }
```

Joining everyything together gives us the **AddItem** component

```javascript
// AddItem.tsx
import React from "react";
import { Item } from "./ToDoList";

const isValid = (item: Item): boolean => {
  return item.task !== "" && item.priority !== -1;
};

class AddItem extends React.Component<{ addItem: any }, Item> {
  constructor(props: any) {
    super(props);
    this.state = {
      task: "",
      priority: -1,
    };
    this.setTask = this.setTask.bind(this);
    this.setPriority = this.setPriority.bind(this);
    this.addItem = this.addItem.bind(this);
  }

  setTask(evt: any) {
    this.setState({
      task: evt.target.value,
    });
  }

  setPriority(evt: any) {
    this.setState({
      priority: parseInt(evt.target.value),
    });
  }

  addItem(evt: any) {
    const item = this.state;
    if (isValid(item)) {
      this.props.addItem(item);
    }

    this.setState({
      task: "",
      priority: -1,
    });
  }

  render() {
    return (
      <table>
        <tbody>
          <tr key={""}>
            <td>Task:</td>
            <td>
              <input
                id="task"
                type="text"
                placeholder="Enter task here"
                onChange={this.setTask}
              />
            </td>
            <td>Priority:</td>
            <td>
              <input
                id="prioity"
                type="text"
                placeholder="Enter priority here"
                onChange={this.setPriority}
              />
            </td>
            <td>
              <input id="submit" type="submit" onClick={this.addItem} />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default AddItem;
```

---

**Section 5**: Add AddItem to App component

> Feel free to skip this section by jumping to this [gist](https://gist.github.com/achukka/94ca905b81c052d10cff90de735d28ff/)

AddItem component can be now imported to App

Before adding a new item, we would need to check if it already exists. Let’s write a helper function `isPartOf` that looks if item is present in items.

```javascript
const isPartOf = (item: Item, items: Item[]): boolean => {
  return items.some((it) => it.priority === item.priority);
};
```

Implement `addItem` using the helper function `isPartOf`.

- If item already exists, alert the user
- Else update the state

```javascript
addItem(item: Item) {
  const { items } = this.state;

  if (isPartOf(item, items)) {
    alert(`Item with priorirty: ${item.priority} exists`);
    return;
  }
  this.setState({
    items: items.concat(item),
  });
}
```

> We should concatenate the item to the current list, since states are immutable in react

Bind `addItem` in the App constructor

```javascript
class App extends React.Component<{}, { items: Item[] }> {
  constructor(props: any) {
    super(props);
    this.state = {
      items: initialList,
    };
    this.addItem = this.addItem.bind(this);
  }
```

Combining all the code parts together should give us our new **App** component

```javascript
// App.tsx
import React from "react";
import AddItem from "./AddItem";
import ToDoList, { Item } from "./ToDoList";

const initialList = [
  {
    task: "Pick up Milk",
    priority: 1,
  },
  {
    task: "Buy Eggs",
    priority: 2,
  },
  {
    task: "Buy Bread",
    priority: 3,
  },
];

const isPartOf = (item: Item, items: Item[]): boolean => {
  return items.some((it) => it.priority === item.priority);
};

class App extends React.Component<{}, { items: Item[] }> {
  constructor(props: any) {
    super(props);
    this.state = {
      items: initialList,
    };
    this.addItem = this.addItem.bind(this);
  }

  addItem(item: Item) {
    const { items } = this.state;

    if (isPartOf(item, items)) {
      alert(`Item with priorirty: ${item.priority} exists`);
      return;
    }
    this.setState({
      items: items.concat(item),
    });
  }

  render() {
    const { items } = this.state;
    return (
      <div className="App">
        <AddItem addItem={this.addItem} />
        <br />
        <ToDoList items={items} />
      </div>
    );
  }
}

export default App;
```

Your _*todo list*_ app is ready to used now. Running `npm start` should bring a window like below

![3_app_with_todo_list](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/nnrnrjjb6fksf94l2umz.jpg)

Please check this [commit](https://github.com/achukka/todolist/pull/4/commits/e273159a8c60e3609169e1c65ab8a4b02ac56ba8) for full code.

:heart: Congratulations :clap:, you have successfully created a todo list in React.

![Congratulations](https://miro.medium.com/max/498/1*KowWujusMfDjlkjeeOFEBg.gif)

I have also hosted this application on [Code Sandbox](https://codesandbox.io/s/github/achukka/todolist). Feel free to play with it

Thanks for reading through the entire article. Please reach out with questions, comments and/or feedback.
