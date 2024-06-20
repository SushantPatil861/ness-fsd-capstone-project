import React from 'react';
import Card from 'react-bootstrap/Card';
import './common.css';

export default function PostTileComponent(props) {
    return (
      // <Card style={{ width: '100%', height: '15rem'}}>
      //   <Card.Body>
      //     {/* <Card.Title><span style={{paddingRight:'10px'}}><img style={{borderRadius: '50%'}} src={props.profilePhotoPath} width="25px" height="25px"/></span>{props.author}</Card.Title> */}
      //     <Card.Subtitle className="mb-2 text-muted"><img style={{borderRadius: '50%'}} src={props.profilePhotoPath} width="25px" height="25px"/><span style={{paddingLeft:"0.5rem", paddingRight: "0.5rem"}}>{props.author}</span>.<span style={{paddingLeft:"0.5rem", paddingRight: "0.5rem"}}>{props.publishedDate}</span></Card.Subtitle>
      //     <div className="tileGridContainer">
      //     <div className="tileText"><p><h2>{props.title}</h2></p><p>{props.plainContent}</p></div>
      //     <div className="tileImage"><img src={props.displayImagePath} width="100%" height="100%"/></div>
          
      //     </div>
      //     <Card.Link href="#">Save Post</Card.Link>
      //     <Card.Link href="#">Remove Post</Card.Link>
      //   </Card.Body>
      // </Card>
        <div style={{ width: '100%', height: '15rem'}}>
          <div style={{ width: '100%', height: '2rem'}}><img style={{borderRadius: '50%'}} src={props.profilePhotoPath} width="25px" height="25px"/><span style={{paddingLeft:"0.5rem", paddingRight: "0.5rem"}}>{props.authorFullName}</span>.<span style={{paddingLeft:"0.5rem", paddingRight: "0.5rem", color: "#7d848b"}}>{props.publishedDate}</span></div>
          <div className="tileGridContainer">
            <div className="tileText line-clamp"><h4>{props.title}</h4><p>{props.short_description}</p></div>
            {props.displayImagePath?<div className="tileImage"><img src={props.displayImagePath} width="100%" height="100%"/></div>:null}
          </div>
        </div>    
      );
}
