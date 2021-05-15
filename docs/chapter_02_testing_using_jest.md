# Testing React Application using Jest

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zndlk75y5m2r6fp2eyoy.png)

[Jest](https://jestjs.io/) is open source testing framework built on top of JavaScript. It was majorly designed to work with React based web applications. However it can also be used on applications using [Node](https://nodejs.org/en/docs/), [Angular](https://angular.io/docs), [Vue](https://v3.vuejs.org/) etc.

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zndlk75y5m2r6fp2eyoy.png)

We will be writing tests on todolist, a React application that I have created in my previous [post](https://dev.to/achukka/create-a-todo-list-in-react-4mp4)

**Step 1:** Installing dependencies

If you have created your application using [create-react-app](https://create-react-app.dev/) you can skip this step

Install Jest using [npm](https://www.npmjs.com/):

```bash
npm install --save-dev jest @types/jest
```

Now install the react testing library

```bash
npm install --save-dev @testing-library/react
```

We will also be using [jest-dom](https://github.com/testing-library/jest-dom) library which provides a set of custom matchers on [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)

```bash
npm install --save-dev @testing-library/jest-dom`
```

Add npm script to run tests in _package.json_

```json
{
  "scripts": {
   ...,
   "tests": "react-scripts test"
   }
   ...,
   "devDependencies": {
    "@testing-library/jest-dom": "^5.12.0",
    "@testing-library/react": "^11.2.6",
    "@types/jest": "^26.0.23",
    "jest": "^26.6.3"
  }
}
```

---

**Step 2:** Writing Tests

Running `npm start` on [todolist](https://github.com/achukka/todolist/tree/e273159a8c60e3609169e1c65ab8a4b02ac56ba8) should open a window as shown below

![3_app_with_todo_list](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/5igne5yqdbtaumswuw0n.jpg)

As you can see we have 4 static labels on the screen.

- _Task:_ and _Priority:_ on the top row (read the `:`)
- Header row with _Task_ and _Priority_ columns

Create a file `App.test.tsx` if it does not exist already.
Import [render](https://testing-library.com/docs/react-testing-library/api/#render) and [screen](https://testing-library.com/docs/queries/about/#screen) from [react-testing-library](https://testing-library.com/)

```javascript
import { render, screen } from "@testing-library/react";
```

As the name suggests _render_ can be used to render any react component where as screen can be used to query for HTML elements.

React Testing Library docs provide a [cheat sheet](https://testing-library.com/docs/dom-testing-library/cheatsheet/#queries) with a table of queries that can be used.

For this article we will use `getByText`. This function returns the element that matches the string and throws an error if nothing matches.

##### 1. Checking for `Task` Label

```javascript
test("Renders Task Label", () => {
  render(<App />);
  const linkElement = screen.getByText("Task:");
  expect(linkElement).toBeInTheDocument();
});
```

This test checks if there is _exactly one _ element with text `Task:` in the rendered App.

##### 2. Checking for `Priority` Label

```javascript
test("Renders Priority Label", () => {
  render(<App />);
  const linkElement = screen.getByText("Priority:");
  expect(linkElement).toBeInTheDocument();
});
```

This test checks if there is _exactly one _ element with text `Priority:` in the rendered App.

##### 3. Checking for `Task` header column

```javascript
test("Renders Table Header - Task Column", () => {
  render(<App />);
  const linkElement = screen.getByText("Task");
  expect(linkElement).toBeInTheDocument();
});
```

This test checks if there is _exactly one _ element with text `Task` in the rendered App.

##### 4. Checking for `Priority` header column

```javascript
test("Renders Table Header - Priority Column", () => {
  render(<App />);
  const linkElement = screen.getByText("Priority");
  expect(linkElement).toBeInTheDocument();
});
```

This test checks if there is _exactly one _ element with text `Priority` in the rendered App.

##### 5. Checking for First Row in the Table, Task Column

```javascript
test("Renders Table  - First Row Task", () => {
  render(<App />);
  const linkElement = screen.getByText("Pick up Milk");
  expect(linkElement).toBeInTheDocument();
});
```

This test checks if there is _exactly one _ element with text `Pick up Milk` in the rendered App.

##### 6. Checking for First Row in the Table, Priority Column

```javascript
test("Renders Table  - First Row Priority", () => {
  render(<App />);
  const linkElement = screen.getByText("1");
  expect(linkElement).toBeInTheDocument();
});
```

This test checks if there is _exactly one _ element with text `1` in the rendered App.

You can run the above tests by

```bash
npm test
```

Please refer to this [commit](https://github.com/achukka/todolist/pull/6/commits/843be7b2a80250deddfcba10f606872168f4f031) for code.

---

_Optional Section_: Testing individual Components

In the above section we have only written tests for the App component. However we can extend similar tests to other components as well.

In this segment we will add tests to [AddItem](https://github.com/achukka/todolist/blob/e273159a8c60e3609169e1c65ab8a4b02ac56ba8/src/AddItem.tsx) and [ToDoList](https://github.com/achukka/todolist/blob/e273159a8c60e3609169e1c65ab8a4b02ac56ba8/src/ToDoList.tsx) components.

#### 1. Checking Input Form in AddItem

Import render, screen methods from react-testing-libary and AddItem component

```javascript
import { render, screen } from "@testing-library/react";
import AddItem from "../src/AddItem";
```

Our AddItem component takes a function `addItem` to save/store the submitted item. Let's mock it for testing purposes.

```javascript
const empty = () => "";
```

Test whether the form is rendered correctly.

```javascript
test("Renders Input Form", () => {
  render(<AddItem addItem={empty} />);

  const taskElement = screen.getByText("Task:");
  expect(taskElement).toBeInTheDocument();

  const priorityElement = screen.getByText("Priority:");
  expect(priorityElement).toBeInTheDocument();
});
```

In this test, we check if we have elements `Task:` and `Priority:` in the rendered component

#### 2. Checking Table in ToDoList

Import render, screen methods from react-testing-libary and ToDoList component

```javascript
import { render, screen } from "@testing-library/react";
import ToDoList from "../src/ToDoList";
```

Since our ToDoList takes an array of items as props. We will split our tests into two scenarios

- Empty Array
- Non empty array

##### 2.1 Checking Table with no items

The ToDoList component should render an [div](https://github.com/achukka/todolist/blob/e273159a8c60e3609169e1c65ab8a4b02ac56ba8/src/ToDoList.tsx#L25) with text `Empty List` when there are no items.

```javascript
test("Renders Empty List div", () => {
  render(<ToDoList items={[]} />);
  const linkElement = screen.getByText("Empty List");
  expect(linkElement).toBeInTheDocument();
});
```

This test should pass :white_check_mark: only if there is one element with text `Empty List`.

##### 2.2 Checking Table with items

The ToDoList component should render items in a tabular format if props has any items.

In this test we pass an item with task `write test` and priority `1`.

```javascript
test("Renders Table with dummy data", () => {
  const items = [{ task: "write test", priority: 1 }];
  render(<ToDoList items={items} />);

  const taskHeaderElement = screen.getByText("Task");
  expect(taskHeaderElement).toBeInTheDocument();

  const priorityHeaderElement = screen.getByText("Priority");
  expect(priorityHeaderElement).toBeInTheDocument();

  const taskElement = screen.getByText("write test");
  expect(taskElement).toBeInTheDocument();

  const priorityElement = screen.getByText("1");
  expect(priorityElement).toBeInTheDocument();
});
```

We check if the table has following

- Task Header Column
- Priority Header Column
- Task Column with value `write test`
- Priority Column with value `1`

In all the scenarios there should be exactly one matching element. Else the test should fail :x:
