import React from "react";
import { Item } from "./ToDoList";

const isValid = (item: Item): boolean => {
  return item.task !== "" && item.priority !== -1;
};

class AddItem extends React.Component<{ addItem: any }, { item: Item }> {
  constructor(props: any) {
    super(props);
    this.state = {
      item: {
        task: "",
        priority: -1,
      },
    };
    this.setText = this.setText.bind(this);
    this.setPriority = this.setPriority.bind(this);
    this.addItem = this.addItem.bind(this);
  }

  setText(evt: any) {
    const { item } = this.state;
    this.setState({
      item: { task: evt.target.value, priority: item.priority },
    });
  }

  setPriority(evt: any) {
    const { item } = this.state;
    this.setState({
      item: { task: item.task, priority: parseInt(evt.target.value) },
    });
  }

  addItem(evt: any) {
    const { item } = this.state;
    if (isValid(item)) {
      this.props.addItem(item);
    }

    this.setState({
      item: { task: "", priority: -1 },
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
                onChange={this.setText}
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
