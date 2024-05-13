import React, {useEffect,useState} from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News =(props)=> {
  const [articles, setArticles] = useState([])
  const [loading ,setLoading] = useState(true)
  const [page, setPage] = useState([1])
  const [totalResults ,setTotalResults] = useState(0)
  
  
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };


  // const updateNews= async ()=> {
  //   props.setProgress(10);
  //   const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=5da05e24dbc24853a09845c9472d81be&page=${page}&pageSize=${props.pageSize}`;
  //   try{
  //  setLoading(true)
  //   let data = await fetch(url);
  //   props.setProgress(30);
  //   let parsedData = await data.json();
  //   props.setProgress(50);
  //   console.log("API Response:", parsedData);
  //   setArticles(parsedData.articles)
  //   setTotalResults(parsedData.totalResults)
  //   setLoading(false)
  //   props.setProgress(100);
  // } catch(error) {
  //   console.error("Error fetching data:", error);
  //   setLoading(false);
  // }
  // }

  // useEffect(() =>{
  //   // document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
  //     updateNews();
  //      // eslint-disable-next-line
  // },[])
  

  
  // const fetchMoreData = async () => {
    
  //   const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=5da05e24dbc24853a09845c9472d81be&page=${page+1}&pageSize=${props.pageSize}`;
  //   setPage(page+1)
  //   let data = await fetch(url);
  //   let parsedData = await data.json();
  //   console.log("API Response:", parsedData);
  //   setArticles(articles.concat(parsedData.articles))
  //   setTotalResults(parsedData.totalResults)
    
  // };
  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=5da05e24dbc24853a09845c9472d81be&page=${props.page}&pageSize=${props.pageSize}`;
    setPage(page + 1);
    setLoading(true)
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log("API Response:", parsedData);
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    setLoading(false)
  };

  useEffect(() => {
    fetchMoreData();
    // document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

    return (
      <>
        <h1 className="text-center" style={{ margin: "35px 0px" ,marginTop:'90px' }}>
          NewsMonkey - Top {capitalizeFirstLetter(props.category)}{" "}
          Headlines{" "}
        </h1>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
         
          <div className="container">
            <div className="row">
              {/* {!this.state.loading &&//reload and go next pg */}
              {articles.map((element,index) => {
                return (
                
                  <div className="col-md-4" key={index}>
                  <NewsItem
                    title={element && element.title ? element.title : ""}
                    description={element && element.description ? element.description : ""}
                    imageUrl={element && element.urlToImage}
                    newsUrl={element && element.url}
                    author={element && element.author}
                    date={element && element.publishedAt}
                    source={element && element.source.name}
                  />
                </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
        
      </>
    );
  
}
News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general ",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
