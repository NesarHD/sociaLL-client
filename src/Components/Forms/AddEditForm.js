import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import Avatar from "react-avatar";

class AddEditForm extends React.Component {
  state = {
    id: "",
    first: "",
    last: "",
    avatar: "",
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.setState({
        avatar:
          "https://api.adorable.io/avatars/285/1" +
          this.state.first +
          this.state.last,
      });
    });
  };

  submitFormAdd = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/crud", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first: this.state.first,
        last: this.state.last,
        avatar: this.state.avatar,
      }),
    })
      .then((response) => response.json())
      .then((item) => {
        if (Array.isArray(item)) {
          this.props.addItemToState(item[0]);
          this.props.toggle();
        } else {
          console.log("failure");
        }
      })
      .catch((err) => console.log(err));
  };

  submitFormEdit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/crud", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: this.state.id,
        first: this.state.first,
        last: this.state.last,
        avatar: this.state.avatar,
      }),
    })
      .then((response) => response.json())
      .then((item) => {
        if (Array.isArray(item)) {
          this.props.updateState(item[0]);
          this.props.toggle();
        } else {
          console.log("failure");
        }
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    // if item exists, populate the state with proper data
    if (this.props.item) {
      const { id, first, last, avatar } = this.props.item;
      this.setState({ id, first, last, avatar });
    }
  }

  render() {
    return (
      <Form
        onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}
      >
        <FormGroup>
          <Label for="first">First Name</Label>
          <Input
            type="text"
            name="first"
            id="first"
            onChange={this.onChange}
            value={this.state.first === null ? "" : this.state.first}
          />
        </FormGroup>
        <FormGroup>
          <Label for="last">Last Name</Label>
          <Input
            type="text"
            name="last"
            id="last"
            onChange={this.onChange}
            value={this.state.last === null ? "" : this.state.last}
          />
        </FormGroup>
        <FormGroup>
          <Label for="avatar">Avatar</Label>
          &nbsp;&nbsp;&nbsp;
          <Avatar size="50" round="50px" src={this.state.avatar} />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default AddEditForm;
