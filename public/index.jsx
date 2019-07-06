import React from 'react'
import ReactDOM from 'react-dom'
class Itemsview extends React.Component {
    constructor(props){
        super(props)
        this.state={
            theClickedImg :'../imges/0 - dewalt-claw-hammers-dwht51054-64_1000.jpg'
        }
    }
    onImegeClick(imagePath){
        if(imagePath !== this.state.theClickedImg){
            this.setState({theClickedImg : imagePath})    
        }
    }
    render(){
        return(
            <div class="center-block" class="container" >
                <div class="row">
                <div class="col-md-3">
                <h6 >Internet #205594063Store</h6>
                    <img onClick={()=>this.onImegeClick('../imges/0 - dewalt-claw-hammers-dwht51054-64_1000.jpg')} src='../imges/0 - dewalt-claw-hammers-dwht51054-64_1000.jpg' class="img-thumbnail" width='70%'></img>
                    <img onClick={()=>this.onImegeClick('../imges/1 - dewalt-claw-hammers-dwht51054-c3_1000.jpg')} src='../imges/1 - dewalt-claw-hammers-dwht51054-c3_1000.jpg'  class="img-thumbnail" width='70%'></img>
                    <img onClick={()=>this.onImegeClick('../imges/2 - dewalt-claw-hammers-dwht51054-4f_1000.jpg')} src='../imges/2 - dewalt-claw-hammers-dwht51054-4f_1000.jpg' class="img-thumbnail" width='70%'></img>  
                </div>
                <div class="col-lg-6">
                <h6 > Model # DWHT51054 SKU #1001209802</h6>
                <img  src={this.state.theClickedImg} width='100%'></img> 
                </div>
                <div class="col-lg-3">
                        <h4 >DEWALT</h4>
                        <h3 > 20 oz. Hammer </h3>
                        <img src="../imges/reviw.png" width='40%'/>
                        <h5 >Write a Review</h5>
                        <h5>Questions & Answers (26)</h5>
                        <ul>
                            <li>Weight is optimized for a controlled swing</li>
                            <li>Easily pull stubborn nails with the side nail puller</li>
                            <li>Balanced hammer reduces user fatigue</li>
                        </ul>
                        <h1>$24.97</h1>
                        
                            <img src='../imges/credit-center-icon.gif' width='40%' ></img>
                        <h5 ><strong>Save up to $100♢</strong> on your qualifying purchase.
                            Apply for a Home Depot Consumer Card</h5>
                    </div>

                    
                </div>

                   
                   


                    
                    {/* <h5><strong>Save up to $100♢</strong> on your qualifying purchase.
                            Apply for a Home Depot Consumer Card</h5> */}
            </div>
        )
    }

}
ReactDOM.render(<Itemsview />, document.getElementById('root'))