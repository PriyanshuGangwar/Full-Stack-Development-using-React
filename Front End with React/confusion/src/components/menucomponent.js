import React, {Component} from 'react';
import {Card,CardBody,CardImg,CardTitle,CardImgOverlay,CardBody, CardText} from 'reactstrap';

class Menu extends Component {
    constructor(props){
        super(props);
        this.state = {
            selecteddish:null
        };

    }
    ondishSelect(dish){
        this.setstate({selecteddish: dish});
    }

    renderdish(dish){
        if(dish != null){
            return (
                <Card>
                    <CardImg top src = {dish.image} alt = {dish.name}/>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        }

        else{
            return(
                <div></div>
            );
        }
    }

    render() {
        const menu = this.state.dishes.map((dish)=>{
            return(
                <div key = {dish.id} className = "col-12 mt-5">
                    <Card>
                        <CardImg width=100% src = {dish.image} alt = {dish.name}/>
                        <CardImgOverlay>
                            <CardTitle>{dish.name}</CardTitle>
                        </CardImgOverlay>
                    </Card>
                </div>
                );
        });

        return(
            <div className = "container">
                <div className = "row">
                        {menu}
                </div>
                <div className = "row">
                    <div className = "col-12 col-md-5 m-1">
                        {this.renderdish(this.state.selecteddish)}
                    </div>
                </div>
            </div>
            );
    }

}

export default Menu;
