import React from "react";
import Lists from './Lists';
// import CreateList from './CreateList';

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
  this.setState({loading:true})
  fetch("http://localhost:8000/api/books", {method: "GET"})
            .then((res) => res.json())
            .then((data) => {
                this.setState({alldata: data, loading: false})
            })
            .catch((e) => console.error(e))
    }
handleChange = (event) => {
    let title = this.state.singledata.title;
      let author = this.state.singledata.author;

      if (event.target.name === "title") title = event.target.value;
      else author = event.target.value

this.setState({
        singledata: {
          title: title,
          author: author
        }
      });
    }
createList = () => {
    fetch("http://localhost:8000/api/book", {
        method: "POST", 
          headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(this.state.singledata)  
      }).then(
        this.setState({
          singledata: {
            title: "",
            author: ""
          }
        })
      )
    }

getList = (event, id) => {
      this.setState(
        {
          singledata: {
            title: "Loading.",
            author: "Loading."
          }
        },
        () => {
          fetch("http://localhost:5000/posts/" + id)
            .then(res => res.json())
            .then(result => {
              this.setState({
                singledata: {
                  title: result.title,
                  author: result.author ? result.author : ""
                }
              });
            });
        }
      );
    }

    updateList = (event, id) => {
      fetch("http://localhost:8000/api/book", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.state.singledata)
      })
      .then(res => res.json())
      .then(result => {
        this.setState({
          singledata: {
            title: "",
            author: ""
          }
        });
        this.getLists();
      });
    }

    deleteList = (event, id) => {
      fetch("http://localhost:8000/api/book" + id, {
        method: "DELETE"
      })
      .then(res => res.json())
      .then(result => {
        this.setState({
          singledata: {
            title: "",
            author: ""
          }
        });
        this.getLists();
      });
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
   const listTable = this.state.loading ?
     (
        <span>Loading Data...Please be patient</span>
      ) : (
       
        <Lists alldata={this.state.alldata}
                singledata={this.state.singledata}
                    getList={this.getList}
                      updateList={this.updateList}
                          deleteList={this.deleteList}
                              handleChange={this.handleChange} />
      );
 
  return (
    <div className="container">
      <span className="title-bar">
        {/* <button
          type="button"
          className="btn btn-primary"
          onClick={this.getLists}
        >
          Get Lists
        </button> */}
        
      </span>
      {listTable}
    </div>
  )
  }
}

export default App;