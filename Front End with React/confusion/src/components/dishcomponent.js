import React from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle } from 'reactstrap';

const renderComments = function(dish) {
    if (dish != null){
       
       const com = dish.comments.map((comm) => {
            return ( 
                <ul className="list-unstyled">
                <li>
                    <p>{comm.comment}</p>
                </li>
                <li><p>-- {comm.author}, {new Date(comm.date).toDateString().slice(4,)}</p></li>
                </ul>
                
            );
        });
        return (<div><h4>Comments</h4><ul className="list-unstyled">{com}</ul> </div>);
    }
    else
        return(
            <div></div>
        );

        
    }
const renderDish = function(dish) {
        if (dish != null)
            return(
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                      <CardTitle>{dish.name}</CardTitle>
                      <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        else
            return(
                <div></div>
            );
    }

const dishdetail = function(props){
        return (
            <div className = "container">
                <div className = "row">
                    <div  className="col-12 col-md-5 m-1">
                        {renderDish(props.dish)}
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        {renderComments(props.dish)}
                        
                    </div>
                </div>
            </div>

                
        
        );
    }

    

    export default dishdetail;