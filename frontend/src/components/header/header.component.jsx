import React from "react";
import { Link } from "react-router-dom";
import ReactModal from "react-modal";

import "./header.styles.css";
import FormInput from "../form-input/form-input.component";

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      question: "",
      showModal: false
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  handleChange = event => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { question } = this.state;
  };

  render() {
    return (
      <div className="header">
        <div className="header1">
          <ul className="nav nav-pills">
            <li role="presentation" className="active">
              <Link to="/">Home</Link>
            </li>
            <li role="presentation" className="active">
              <Link to="/contact">Contact</Link>
            </li>
            <li role="presentation" className="active">
              <Link to="/about">About AskUss</Link>
            </li>
            <li role="presentation">
              <a href="#">News</a>
            </li>
          </ul>
        </div>

        <div className="header2">
          <nav className="navbar navbar-default">
            <div className="container-fluid">
              <div className="navbar-header">
                <Link className="navbar-brand" to="/">
                  AskUSICT
                </Link>

                <form className="navbar-form navbar-left" role="search">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search"
                    />
                  </div>
                  <button type="submit" className="btn btn-default">
                    Search
                  </button>
                </form>

                <ul className="nav navbar-nav">
                  <li>
                    <a href="#" onClick={this.handleOpenModal}>
                      Ask Question
                    </a>
                  </li>
                  <ReactModal
                    isOpen={this.state.showModal}
                    contentLabel="ask question modal"
                    className="Modal"
                  >
                    <h1>Ask Your Question Here!</h1>
                    <form action="" onSubmit={this.handleSubmit}>
                      <FormInput
                        label="Question?"
                        type="text"
                        name="question"
                        value={this.state.question}
                        handleChange={this.handleChange}
                      />
                      <FormInput
                        label="Tags(Optional)"
                        type="text"
                        name="question"
                        value={this.state.question}
                        handleChange={this.handleChange}
                      />
                      <button
                        className="ask btn btn-primary"
                        type="submit"
                        onClick={this.handleCloseModal}
                      >
                        Ask
                      </button>
                      <button
                        className="cancel btn btn-warning"
                        onClick={this.handleCloseModal}
                      >
                        Cancel
                      </button>
                    </form>
                  </ReactModal>

                  <li>
                    <Link to="/login">SignIn</Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

export default Header;
