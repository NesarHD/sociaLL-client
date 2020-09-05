import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import ModalForm from "./Components/Modals/Modal";
import DataTable from "./Components/Tables/DataTable";
import { withRouter } from "react-router-dom";
import Avatar from "react-avatar";

class Users extends Component {
  state = {
    items: [],
    users: [],
    user: {},
  };

  getUsersWithoutUser() {
    fetch("http://localhost:3000/api/users/"+this.props.match.params.id)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ users: data.users });
      })
      .catch((err) => console.log(err));
  }

  getUser(id) {
    fetch("http://localhost:3000/api/user/" + id)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ user: data.user });
      })
      .catch((err) => console.log(err));
  }

  updateState = (item) => {
    const itemIndex = this.state.items.findIndex((data) => data.id === item.id);
    const newArray = [
      // destructure all items from beginning to the indexed item
      ...this.state.items.slice(0, itemIndex),
      // add the updated item to the array
      item,
      // add the rest of the items to the array from the index after the replaced item
      ...this.state.items.slice(itemIndex + 1),
    ];
    this.setState({ items: newArray });
  };

  componentDidMount() {
    this.getUsersWithoutUser();
    this.getUser(this.props.match.params.id);
  }

  render() {
    return (
      <Container className="App">
        <Row>
          <Col>
            <h3 style={{ margin: "20px 0" }}>
              <Avatar
                size="50"
                round="50px"
                src={this.state.user.avatar}
                style={{ cursor: "pointer" }}
              />
              <br/>
              {this.state.user.first}
            </h3>
          </Col>
        </Row>
        <Row>
          <Col md="3"></Col>
          <Col md="6">
            <DataTable
              userId={this.props.match.params.id}
              items={this.state.users}
              updateState={this.getItems}
              refreshList={this.getUsersWithoutUser}
              view={"PROFILE"}
              {...this.props}
            />
          </Col>
          <Col md="3"></Col>
        </Row>
        <Row>
          <Col md="3"></Col>
          <Col>
            <ModalForm
              buttonLabel="Add Profile"
              addItemToState={this.getUsersWithoutUser}
            />
          </Col>
          <Col md="3"></Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(Users);
