import React , {Component} from 'react';
import { Breadcrumb, BreadcrumbItem,Card,CardBody,CardText,CardTitle,CardImg,
    Button, Row, Col, Label, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';


const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len); 

class CommentForm extends Component {

    constructor(props){
        super(props)

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);  
        
        this.state = {
            isNavOpen : false,
            isModalOpen: false
        };
    }
    

    toggleModal() {
            this.setState({
            isModalOpen: !this.state.isModalOpen
            });
        }
    
    
    handleSubmit(values) {
            this.toggleModal();
            this.props.addComment(this.props.dishId, values.rating, values.name, values.comment);
            console.log(this.props.dishId);
            }
   
    
    
    
    render() {
        return( 
            <div>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader  toggle={this.toggleModal}>Feedback</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        <Row className="form-group">
                            <Col className = "m-1">
                                <Label htmlFor="rating"><strong>Rating</strong></Label><br/>
                                <Control.select model=".rating" id = "rating" className="form-control" >
                                    <option></option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </Control.select>
                                
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col className = "m-1">
                                <Label htmlFor="name" ><strong>Your Name</strong></Label><br/>
                                <Control.text model=".name" id="name" name="name" placeholder="Name" className="form-control" validators={{minLength: minLength(3), maxLength: maxLength(15) }}/>
                                <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                            </Col>             
                            
                        </Row>
                        <Row className="form-group">
                            <Col className = "m-1">
                                <Label htmlFor="comment" ><strong>Comment</strong></Label><br/>
                                <Control.textarea model=".comment" id="comment" name="comment" placeholder="Comment" rows="6" className="form-control"/>
                            </Col>             
                            
                        </Row>
                        <Row className="form-group">
                            <Col md={{size:10}} className="m-1">
                                <Button type="submit" color="primary">
                                    Submit
                                </Button>
                            </Col>
                        </Row>
                    </LocalForm>
                </ModalBody>
            </Modal> 
            <Button outline onClick={this.toggleModal}>
                <span className="fa fa-pencil fa-lg"></span> Submit Comment
            </Button>
            </div>


            );

    }
}

function RenderComments({comments, addComment, dishId}) {
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
            return (
                    <div>
                        <h4>Comments</h4>
                        <ul className="list-unstyled">
                            {com }
                        </ul>
                        <CommentForm dishId={dishId} addComment={addComment} />
                    </div>);
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

       
const dishdetail = (props) => {
                    
    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">            
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null) {
        return( 
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
                    <RenderComments comments={props.comments} addComment={props.addComment} dishId={props.dish.id} />
                </div>
            </div>
            </div>
        );}
    }

  

export default dishdetail;