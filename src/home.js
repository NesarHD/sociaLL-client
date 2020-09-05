import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import ModalForm from "./Components/Modals/Modal";
import DataTable from "./Components/Tables/DataTable";

class Home extends Component {
  state = {
    users: [],
  };

  getUsers = () => {
    fetch("http://localhost:3000/api/users")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ users: data.users });
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.getUsers();
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
              users={this.state.users}
              refreshUsers={this.getUsers}
              view={"HOME"}
              {...this.props}
            />
          </Col>
          <Col md="3"></Col>
        </Row>
        <Row>
          <Col md="3"></Col>
          <Col>
            <ModalForm buttonLabel="Add Profile" refreshUsers={this.getUsers} />
          </Col>
          <Col md="3"></Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
