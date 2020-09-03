import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import ModalForm from "./Components/Modals/Modal";
import DataTable from "./Components/Tables/DataTable";

class Home extends Component {
  state = {
    items: [],
    users: [],
  };

  getItems() {
    fetch("http://localhost:3000/api/users")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ users: data.users });
      })
      .catch((err) => console.log(err));
  }

  addItemToState = () => {
    this.getItems();
  };

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

  deleteItemFromState = (id) => {
    this.getItems();
  };

  componentDidMount() {
    this.getItems();
  }

  render() {
    return (
      <Container className="App">
        <Row>
          <Col>
            <h3 style={{ margin: "20px 0" }}>SociaLL</h3>
          </Col>
        </Row>
        <Row>
          <Col md="3"></Col>
          <Col md="6">
            <DataTable
              items={this.state.users}
              updateState={this.updateState}
              deleteItemFromState={this.deleteItemFromState}
              view={"HOME"}
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
              addItemToState={this.addItemToState}
            />
          </Col>
          <Col md="3"></Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
