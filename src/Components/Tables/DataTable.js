import React, { Component } from "react";
import { Table, Button } from "reactstrap";
import ModalForm from "../Modals/Modal";
import Avatar from "react-avatar";
import { withRouter } from "react-router-dom";

class DataTable extends Component {
  // Delete a user from the list
  deleteUser = (id) => {
    fetch("http://localhost:3000/api/user", {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        this.props.refreshUsers();
      })
      .catch((err) => console.log(err));
  };

  profile = (id) => {
    this.props.history.push("/users/" + id);
  };

  addFriend = (id) => {
    fetch("http://localhost:3000/api/friend-request/" + this.props.userId, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        friendId: id,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        this.props.refreshUsers();
        // Add Notification as friend added
      })
      .catch((err) => console.log(err));
  };

  acceptFriend = (id) => {
    fetch("http://localhost:3000/api/accept-friend/" + this.props.userId, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        friendId: id,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        this.props.refreshUsers();
        // Add Notification as friend accepted
      })
      .catch((err) => console.log(err));
  };

  render() {
    const users = this.props.users.map((user) => {
      return (
        <tr key={user.id}>
          <td>
            <Avatar
              size="50"
              round="50px"
              src={user.avatar}
              onClick={() => this.profile(user.id)}
              style={{ cursor: "pointer" }}
            />
          </td>
          <td>{user.first}</td>
          <td>{user.last}</td>
          <td>
            {this.props.view === "HOME" ? (
              <div style={{ width: "110px" }}>
                <ModalForm
                  buttonLabel="Edit"
                  user={user}
                  refreshUsers={this.props.refreshUsers}
                />{" "}
                <Button color="danger" onClick={() => this.deleteUser(user.id)}>
                  Del
                </Button>
              </div>
            ) : (
              ""
            )}
            {this.props.view === "PROFILE" ? (
              <div style={{ width: "110px" }}>
                {user.friend_requested ? (
                  user.friend_requested.includes(Number(this.props.userId)) ? (
                    <Button onClick={() => this.acceptFriend(user.id)}>
                      Accept
                    </Button>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}

                {user.friend_request ? (
                  user.friend_request.includes(Number(this.props.userId)) ? (
                    <Button disabled>Requested</Button>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}

                {user.friends ? (
                  user.friends.includes(Number(this.props.userId)) ? (
                    <Button disabled>Friends</Button>
                  ) : (!user.friend_request && !user.friend_requested) ||
                    (user.friend_request
                      ? !user.friend_request.includes(Number(this.props.userId))
                      : false) ||
                    (user.friend_requested
                      ? !user.friend_requested.includes(
                          Number(this.props.userId)
                        )
                      : false) ? (
                    <Button onClick={() => this.addFriend(user.id)}>
                      Add Friend
                    </Button>
                  ) : (
                    ""
                  )
                ) : (!user.friend_request && !user.friend_requested) ||
                  (user.friend_request
                    ? !user.friend_request.includes(Number(this.props.userId))
                    : false) ||
                  (user.friend_requested
                    ? !user.friend_requested.includes(Number(this.props.userId))
                    : false) ? (
                  <Button onClick={() => this.addFriend(user.id)}>
                    Add Friend
                  </Button>
                ) : (
                  ""
                )}

                {}
              </div>
            ) : (
              ""
            )}
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
        <tbody>{users}</tbody>
      </Table>
    );
  }
}

export default withRouter(DataTable);
