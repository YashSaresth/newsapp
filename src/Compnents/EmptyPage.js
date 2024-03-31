import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Spinner from './Spinner';

export default class EmptyPage extends Component {
  static defaultProps = {
    articles:[],
    totalResults:0
    
  }

  static propTypes = {
    articles:PropTypes.any,
    totalResults:PropTypes.number,
  }


    constructor(){ //[text, settext] =usestate("hello myname is yash")--> it is for function
      super();
      this.state ={  
        articles: [],
        loading:false,
        page:1

      }
    
    }
    async componentDidMount(){
       this.setState({articles:this.props.articles, 
        totalResults:this.props.totalResults,
        loading:false
      })
       
    }

    async componentWillReceiveProps(nextProps) {
      // This will erase any local state updates!
      // Do not do this.
       this.setState({articles:nextProps.articles, 
        totalResults:nextProps.totalResults,
        loading:false
      })
    }



  render() {
    return (
      <div className='container my-3'>
      <h1 className='text-center' style={{margin:"35px 0px"}}>Top Headlines</h1> 
      {this.state.loading===true && <Spinner/> } 
 <div className='row'>
 {!this.state.loading && this.state.articles.map((element)=>{
 return <div className='col-md-4' key={element.url}>
  <div>{element.name}</div>
  <div>{element.value}</div>
 </div>
})}
      </div>
      <div className='container d-flex justify-content-between'>
      </div>
</div>
    ) 
  }
}
