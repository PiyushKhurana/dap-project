import React from "react";
import Reflux from "reflux";
import "./homepage.styles.css";
import Year from "../../components/year/year.component";
import Loader from 'react-loader-spinner';
import { Card, CardContent, Typography, Avatar } from "@material-ui/core";
import HomepageStore, { Actions } from "./homepageStore";


class Homepage extends Reflux.Component {
  constructor() {
    super();
    this.store = HomepageStore;
  }

  componentDidMount() {
    Actions.initStore();
  }

  getPost = () => {
    const { questionAnswers } = this.state;
    return (
      questionAnswers.map(post => {
        return (
          <Card elevation={8} style={{ marginBottom: "15px" }} id={post._id} key={post._id}>
            <CardContent>
              <div style={{ display: "flex", flexDirection: "row", padding: "0 20px"}}>
                <Avatar src={post.author.avatar} style={{ padding: "10px 10px 10px 0px"}}/>
                <Typography variant="subtitle1" style={{ paddingTop: "12px" }}>
                  {post.author.name}
                </Typography>
              </div>             
              <Typography variant="h3" style={{ padding: "0 20px" }}>
                {post.question}
              </Typography>
              <Typography variant="body1" style={{ padding: "10px 20px" }}>
                {post.answerId[0].answer}
              </Typography>
              <img src={post.answerId[0].images[0]} style={{ width: "100%", height: "250px", padding: "10px 20px" }} />
            </CardContent>
          </Card>
        )
      })
    )
  }

  getLoader = () => {
    return (
      <Loader
        type="Puff"
        color="#00BFFF"
        height={500}
        width={500}
        timeout={3000} //3 secs
      />
    )
  }

  render() {
    const { loading } = this.state;

    return (
      <div className="container">
        <div className="row homepage">
          <div className="col-xs-3">
            <Year />
          </div>
          <div className="col-xs-6">
              {
                loading ? this.getLoader() : this.getPost()
              }
          </div>
          <div className="col-xs-3">Popular Topics</div>
        </div>
      </div>
    );
  }
}

export default Homepage;
