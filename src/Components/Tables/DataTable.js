import React, { Component } from "react";
import { Table, Button } from "reactstrap";
import ModalForm from "../Modals/Modal";
import Avatar from "react-avatar";
import { withRouter } from "react-router-dom";

class DataTable extends Component {
  deleteItem = (id) => {
    fetch("http://localhost:3000/crud", {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    })
      .then((response) => response.json())
      .then((item) => {
        this.props.deleteItemFromState(id);
      })
      .catch((err) => console.log(err));
  };

  profile = (id) => {
    this.props.history.push("/users/" + id);
  };

  addFriend = (id) => {
    console.log("Send friend request");
    fetch("http://localhost:3000/api/friend-request/"+this.props.userId, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        friendId: id,
      }),
    })
      .then((response) => response.json())
      .then((item) => {
        console.log(item)
        // if (Array.isArray(item)) {
        //   this.props.addItemToState(item[0]);
        //   this.props.toggle();
        // } else {
        //   console.log("failure");
        // }
      })
      .catch((err) => console.log(err));
  }

  render() {
    const items = this.props.items.map((item) => {
      return (
        <tr key={item.id}>
          <td>
            <Avatar
              size="50"
              round="50px"
              src={item.avatar}
              onClick={() => this.profile(item.id)}
              style={{ cursor: "pointer" }}
            />
          </td>
          <td>{item.first}</td>
          <td>{item.last}</td>
          <td>
            {this.props.view == "HOME" ? <div style={{ width: "110px" }}>
              <ModalForm
                buttonLabel="Edit"
                item={item}
                updateState={this.props.updateState}
              />{" "}
              <Button color="danger" onClick={() => this.deleteItem(item.id)}>
                Del
              </Button>
            </div> : ""}
            {this.props.view == "PROFILE" ? <div style={{ width: "110px" }}>
              <Button  onClick={() => this.addFriend(item.id)}>
                Add Friend
              </Button>
            </div> : ""}
            
          </td>
        </tr>
      );
    });

    return (
      <Table responsive borderless hover>
        <thead>
          <tr>
            <th></th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{items}</tbody>
      </Table>
    );
  }
}

export default withRouter(DataTable);
