import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { error } from 'util';
class Itemsview extends React.Component {
    constructor(props){
        super(props)
        this.state={
            id: '205506225',
            imagesArray:[],
            theClickedImg : '',
            brand: '',
            name: '',
            descrbtionArray: [],
            price: 0,
            quantity: 0
        }
    }


    componentDidMount(){
        window.addEventListener('getProduct', (e) => {
            console.log(e.detail.id)
            axios.get('/items',{headers: {id: e.detail.id }})
            .then((Response)=>{ 
                console.log(Response)
                const htmlImages = Response.data[1].map(item=> <img onClick={()=>this.onImegeClick(item.img_src)}
                 src={item.img_src} class="img-thumbnail" width='70%'></img>)
                const itemInfo = Response.data[0]
                const desc = itemInfo[0].description.split(';').map(item=> <li>{item}</li>)
                console.log(desc)
                this.imageMunt(htmlImages,itemInfo,desc,e.detail.id)
                return Response})
            .then((Response)=>{this.setState({theClickedImg: Response.data[1][0].img_src})})
            .catch(()=>console.log('error in componandddd'));
            
        })
    }   


    imageMunt(htmlImages,itemInfo,desc,id){
        console.log(id)
        this.setState({
            imagesArray: htmlImages,
            brand: itemInfo[0].brand,
            name: itemInfo[0].name,
            price: itemInfo[0].price,
            descrbtionArray: desc,
            id: id
            
        })
    }


    onImegeClick(imagePath){
        if(imagePath !== this.state.theClickedImg){
            this.setState({theClickedImg : imagePath})    
        }
    }


    incres(){
        this.state.quantity++;
        this.setState({quantity: this.state.quantity++})
    }


    decres(){
        if(this.state.quantity !== 0){
            this.state.quantity--;
            this.setState({quantity: this.state.quantity})
        }
    }

    addToCart(){
        window.dispatchEvent(
			new CustomEvent('addToCart', {
				detail: {id: this.state.id , quantity: this.state.quantity},
			})
        )
        this.setState({quantity:0})
    }


    render(){
        return(
            <div class="center-block" class="container" >
                <div class="row">
                    <div class="col-md-3">
                        <h6 >Internet #{this.state.id}</h6>
                        
                        {this.state.imagesArray}
                    </div>
                    <div class="col-lg-6">
                        <h6 > Model # DWHT51054 SKU #1001209802</h6>
                        <img  src={this.state.theClickedImg} width='100%'></img> 
                    </div>
                    <div class="col-lg-3">
                        <h4 ><strong>{this.state.brand}</strong></h4>
                        <h4 > {this.state.name} </h4>
                        <h5 >Write a Review</h5>
                        <h5>Questions & Answers (26)</h5>
                        <ul>
                            {this.state.descrbtionArray}
                        </ul>
                        <h2>${this.state.price}</h2>
                        <h5 ><strong>Save up to $100♢</strong> on your qualifying purchase.
                        Apply for a Home Depot Consumer Card</h5>
                        <form>
                            <input onClick={()=>this.decres()} type='button' value='-'></input>
                            <input type='number' min='0' value={this.state.quantity}></input>
                            <input onClick={()=>this.incres()} type='button' value='+'></input>
                            <input onClick={()=>this.addToCart()} type='button' value='Add to cart' ></input>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<Itemsview />, document.getElementById('root'))