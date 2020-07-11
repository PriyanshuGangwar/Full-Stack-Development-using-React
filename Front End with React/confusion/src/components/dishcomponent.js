import React , {Component} from 'react';
import { Breadcrumb, BreadcrumbItem,Card,CardBody,CardText,CardTitle,CardImg,
    Button, Row, Col, Label, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

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
           
            this.props.postComment(this.props.dishId, values.rating, values.name, values.comment);
           
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

function RenderComments({comments, postComment, dishId}) {
       
    if(comments != null){
                return ( 
                    <div className="col-12 col-md-5 m-1">
                        <h4>Comments</h4>
                        <ul className="list-unstyled">
                        <Stagger in>
                            {comments.map((comment) => {
                                return (
                                    <Fade in>
                                    <li key={comment.id}>
                                    <p>{comment.comment}</p>
                                    <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                                    </li>
                                    </Fade>
                                );
                            })}
                        </Stagger>
                        </ul>
                        <CommentForm dishId={dishId} postComment={postComment} />
                    </div>
                );
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
                <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                    <Card>
                        <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                        <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </FadeTransform>
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
               
                <RenderComments comments={props.comments} postComment={props.postComment} dishId={props.dish.id} />
                
            </div>
            </div>
        );}
    }

  

export default dishdetail;