import React from "react";
import Lists from "./Lists";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      alldata: [],
      singledata: {
        title: "",
        author: ""
      }
    };
  }

getLists = () => {
  fetch("http://localhost:5000/posts",
    { method: "GET" })
                .then((res) => res.json())
                .then((data) => {
                    this.setState({alldata: data, loading: false})
                })
}
  
render() {
  const listTable = this.state.loading ? (
    <span>Loading data..pls wait</span>
  ) : (
      <Lists alldata={this.state.alldata}/>
  );
  return (
    <div className="container">
      <span className="title-bar">
        <button
          type="button"
          className="btn btn-primary"
          onClick={this.getLists}
        >
          Get Lists
        </button>
      </span>
      {listTable}
    </div>
  )
  }
}

export default App;