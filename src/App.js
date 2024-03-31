import React, { Component } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './Compnents/Navbar'
import News from './Compnents/News'
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  pageSize =6;
  state ={
    progress:0
  }
  setProgress =(progress)=>{
    this.setState({progress: progress})
  }
  render() {
    return (
      <div>
        <Router>
          <Navbar/>
          <LoadingBar
        color='#f11946'
        progress={this.state.progress}
     
      />
          <Routes>
            <Route exact path="/" element = { <News  setProgress ={this.setProgress}  KEY="general" pageSize={this.pageSize} country="in" category="general"/>} />
            <Route exact path="/general" element = { <News  setProgress ={this.setProgress}  KEY="general" pageSize={this.pageSize} country="in" category="general"/>} />
            <Route exact path="/business" element = { <News  setProgress ={this.setProgress}  KEY="business" pageSize={this.pageSize} country="in" category="business"/>} />
            <Route exact path="/entertainment" element = { <News  setProgress ={this.setProgress}  KEY="entertainment" pageSize={this.pageSize} country="in" category="entertainment"/>} />
            <Route exact path="/science" element = { <News  setProgress ={this.setProgress}  KEY="science" pageSize={this.pageSize} country="in" category="science"/>} />
            <Route exact path="/health" element = { <News  setProgress ={this.setProgress}  KEY="health" pageSize={this.pageSize} country="in" category="health"/>} />
            <Route exact path="/sports" element = { <News  setProgress ={this.setProgress}  KEY="sports" pageSize={this.pageSize} country="in" category="sports"/>} />
            <Route exact path="/technology" element = { <News  setProgress ={this.setProgress}  KEY="technology" pageSize={this.pageSize} country="in" category="technology"/>} />
          </Routes>
        </Router>
      </div>
    )
  }
}
