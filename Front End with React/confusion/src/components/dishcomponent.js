import React , {component} from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderComments({comments}) {
    if (comments != null){
      
       const com = comments.map((comm) => {
        
            return ( 
                <ul className="list-unstyled">
                <li>
                    <p>{comm.comment}</p>
                </li>
                <li><p>-- {comm.author}, {new Date(comm.date).toDateString().slice(4,)}</p></li>
                </ul>
                
            );
        });
        return (<div><h4>Comments</h4><ul className="list-unstyled">{com }</ul> </div>);
    }
    else
        return(
            <div></div>
        );

        
    }
function RenderDish({dish}) {
        if (dish != null){
        //console.log(dish.dish)
            return(
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                      <CardTitle>{dish.name}</CardTitle>
                      <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );}
        else
            return(
                <div></div>
            );
    }

const dishdetail = function(props){
    return (
        <div className="container">
        <div className="row">
            <Breadcrumb>

                <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
                <h3>{props.dish.name}</h3>
                <hr />
            </div>                
        </div>
        <div className="row">
            <div className="col-12 col-md-5 m-1">
                <RenderDish dish={props.dish} />
            </div>
            <div className="col-12 col-md-5 m-1">
                <RenderComments comments={props.comments} />
            </div>
        </div>
        </div>
    );
    }

    

    export default dishdetail;