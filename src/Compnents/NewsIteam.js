import React from 'react'

const  NewsIteam =(props)=> {
   
   let {Title,description,imageUrl,newsUrl,author,date,source} = props
    return (
      <div className='my-3'>
     <div className="card" style ={{width:"18rem"}}>
     <span class="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left:'90%', zIndex:'1'}}>
    {source}
    <span class="visually-hidden">unread messages</span>
  </span>
  <img src={!imageUrl?"https://lh3.googleusercontent.com/J6_coFbogxhRI9iM864NL_liGXvsQp2AupsKei7z0cNNfDvGUmWUy20nuUhkREQyrpY4bEeIBuc=s0-w300-rw":imageUrl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{Title}...</h5>
    <p className="card-text">{description}...</p>
    <p class="card-text"><small class="text-body-secondary">By {!author?"Unknow":author} on {new Date(date).toGMTString()}</small></p>
    <a href={newsUrl} target='blank' className="btn btn-dark">Read more</a>
  </div>
</div>
      </div>
    )
  
}

export default NewsIteam
