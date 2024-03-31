import React, { Component } from "react";
import NewsIteam from "./NewsIteam";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";



export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 6,
    category: "genral",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  capital = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor() {
    //[text, settext] =usestate("hello myname is yash")--> it is for function
    super();
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
  }

  async updateNews(page) {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5745a6c025b84daf93945cca6537d2a4&page=${this.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    // let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=be3e9c46b2b34a8cbe4ae42cd9a3f836&page=1&pageSize=${this.props.pageSize}`
    // this.setState({loading:true})
    //  let data = await fetch(url)
    //  let parsedData = await data.json()
    //  this.setState({articles:parsedData.articles,
    //   totalResults:parsedData.totalResults,
    //   loading:false
    // })

    this.updateNews();
  }

  async componentDidUpdate(prevProps) {
   
    if (prevProps == null || this.props.KEY !== prevProps.KEY) {
      this.props.setProgress(10);
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5745a6c025b84daf93945cca6537d2a4&page=1&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true });
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        articles: parsedData.articles,
        totalResults: parsedData.totalResults,
        loading: false,
      });
      document.title = `${this.capital(this.props.category)} - NewsReport`;
      this.props.setProgress(100);
    }
  }

  handlePrevClick = async () => {
    // let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=be3e9c46b2b34a8cbe4ae42cd9a3f836&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true})
    // let data = await fetch(url)
    // let parsedData = await data.json()
    // console.log(parsedData);
    // this.setState({
    //   page:this.state.page - 1,
    //   articles:parsedData.articles,
    //   loading:false
    // })
    this.setState({ page: this.state.page - 1 });
    this.updateNews(this.state.page - 1);
  };

  handleNextClick = async () => {
    // let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=be3e9c46b2b34a8cbe4ae42cd9a3f836&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true})
    // let data = await fetch(url)
    // let parsedData = await data.json()
    // console.log(parsedData);
    // this.setState({
    //   page:this.state.page + 1,
    //   articles:parsedData.articles,
    //   loading:false
    // })
    this.setState({ page: this.state.page + 1 });
    this.updateNews(this.state.page + 1);
  };

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5745a6c025b84daf93945cca6537d2a4&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      
    });
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{ margin: "35px 0px" }}>
          Top {this.capital(this.props.category)} Headlines{" "}
        </h1>
        {this.state.loading===true && <Spinner/> } 

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsIteam
                      Title={element.title ? element.title.slice(0, 45) : ""}
                      description={
                        element.description
                          ? element.description.slice(0, 88)
                          : ""
                      }
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>

        {/* <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            class="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr;Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            class="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div> */}
      </div>
    );
  }
}

export default News;
