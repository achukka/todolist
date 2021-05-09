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
