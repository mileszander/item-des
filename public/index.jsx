import React from 'react'
import ReactDOM from 'react-dom'
import StarRatings from 'react-star-ratings';
import axios from 'axios'
import { error } from 'util';
import { throws } from 'assert';
import '../client/styleibra.css'
const font ={
    fontSize: '2.0vw'
}
class Itemsview extends React.Component {
    constructor(props){
        super(props)
        this.state={
            id: '',
            imagesArray:[],
            theClickedImg : '',
            brand: '',
            name: '',
            descrbtionArray: [],
            price: 0,
            quantity: 1,
            ratingArray: [],
            ratingAvg:0,
            isWidthToSmall: false,
            frequentlyBoughtTogetherArray:[]
        }
    }


    componentDidMount(){
        window.addEventListener('resize', (resize)=>{
            if(resize.currentTarget.innerWidth < 860){
                 this.setState({isWidthToSmall: true})
            }else{
                this.setState({isWidthToSmall: false})
            }
        })
       
        if(this.state.id === ''){
            this.getData(window.location.pathname.slice(10))
            this.getReview(window.location.pathname.slice(10))
        }
        window.addEventListener('updatePath', (e) => {
            this.getData(e.detail.id)
            this.getReview(e.detail.id)
        })
       
        
 
    }   

    getReview(id){
        axios.get(`http://homedepottreviews.us-east-2.elasticbeanstalk.com/reviews/${id}`)
        .then((Response)=> {return Response})
        .then((Response)=> {
            this.setState({ratingArray: Response.data.map(item=> item.rating)})
            this.setState({ratingAvg: this.getAvgRating(this.state.ratingArray)})
        })
        .catch((error)=> console.log(error))
    }

    getAvgRating(ratingArray){
        let sum =0;
        for(let i = 0; i<ratingArray.length;i++){
            sum =sum +ratingArray[i]
        }
        return sum/ratingArray.length;
    }

    getData(id){

        axios.get(`/items-data/${id}`)
        .then((Response)=>{
            const htmlImages = this.gitImages(Response.data[1]);
            console.log(htmlImages)
            // const carouselImages = this.gitImagesCarousel(Response.data[1]);
            const frequentlyBoughtTogether = this.gitfrequentlyBoughtTogether(Response.data[2],Response.data[3],Response.data[0].id);
            const itemInfo = Response.data[0]
            const desc = this.getDescrption(itemInfo[0].description)
            this.dataMunt(htmlImages,itemInfo,desc,id,frequentlyBoughtTogether)
            return Response})
        .then((Response)=>{this.setState({theClickedImg: Response.data[1][0].img_src})})
        .catch(()=>console.log('error in componandddd'));
        
   
    }

    gitfrequentlyBoughtTogether(info,images,id){
        const infoNew =[]
        info.map((item,index)=> item.src=images[index])
        for(let i =0; i<info.length;i++){
            if(info[i].id !== id && infoNew.length <3){
                infoNew.push(info[i])
            }
        }
        return infoNew;
       
    }

//     gitImagesCarousel(Response){
//         Response =  Response.map(item=>item.img_src)
//    return Response;
//     }

    gitImages(Response){
        Response =  Response.map(item=><div> <img  onClick={()=>this.onImegeClick(item.img_src)}
             src={item.img_src}  width='50%'></img></div>)
        return Response;
    }

    getDescrption(description){
    description = description.split(';').map(item=> <li  >{item}</li>)
        return description;
    }
    

    dataMunt(htmlImages,itemInfo,desc,id,frequentlyBoughtTogether){
        this.setState({
            imagesArray: htmlImages,
            brand: itemInfo[0].brand,
            name: itemInfo[0].name,
            price: itemInfo[0].price,
            descrbtionArray: desc,
            id: id,
            frequentlyBoughtTogetherArray:frequentlyBoughtTogether
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
        if(this.state.quantity !== 1){
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
        this.setState({quantity:1})
    }

    addAllItemsToCart(){
        window.dispatchEvent(
        new CustomEvent('addToCart', {
            detail: {id: this.state.id , quantity: 1},
        })
        )
        window.dispatchEvent(
        new CustomEvent('addToCart', {
            detail: {id: this.state.frequentlyBoughtTogetherArray[0] , quantity: 1},
        })
        )
        window.dispatchEvent(
        new CustomEvent('addToCart', {
            detail: {id: this.state.frequentlyBoughtTogetherArray[1] , quantity: 1},
        })
        )
    }
    fullSizeScreen(){
        return      (
            <>   
            <div className="col-3">
                <h6 >Internet #{this.state.id}</h6>
                
                {this.state.imagesArray}
            </div>
        
            <div id='mainImage' className="col-6">
                <h6 > Model # DWHT51054 SKU #1001209802</h6>

                <img default-src='none' src={this.state.theClickedImg} width='70%'></img> 
            </div>
        </>         )
    }


    // phoneSizeImage(){
    //     return <div><div id="IbrahimmyCarousel" className="carousel slide" data-ride="carousel">
  
    //     <ol className="carousel-indicators">
    //       <li data-target="#IbrahimmyCarousel" data-slide-to="0" className="active"></li>
    //       <li data-target="#IbrahimmyCarousel" data-slide-to="1"></li>
    //       <li data-target="#IbrahimmyCarousel" data-slide-to="2"></li>
    //     </ol>
    //     <div className="carousel-inner">
    //       <div className="carousel-item-active">
    //         <img src={this.state.carouselImagesArray[0]} alt="0"></img>
    //       </div>
      
    //      {this.state.carouselImagesArray[1]?<div className="carousel-item">
    //         <img src={this.state.carouselImagesArray[1]} alt="1"></img>
    //       </div>:console.log()} 
      
    //       {this.state.carouselImagesArray[2]?<div className="carousel-item">
    //         <img src={this.state.carouselImagesArray[1]} alt="1"></img>
    //       </div>:console.log()}
    //     </div>
    //     <a className="carousel-control-prev" href="#IbrahimmyCarousel" data-slide="prev">
    //       <span className="carousel-control-prev-icon"></span>
    //       <span className="sr-only">Previous</span>
    //     </a>
    //     <a className="carousel-control-next" href="#IbrahimmyCarousel" data-slide="next">
    //       <span className="carousel-control-next-icon"></span>
    //       <span className="sr-only">Next</span>
    //     </a>
    //   </div></div>
    // }

    frequentlyBoughtTogetherRender(){
        return <>
            <div className="col-2">
                <img 
             src={this.state.theClickedImg}  width='60%'></img>
             <h6 >{this.state.name}</h6>
                    </div>
                    
                    <div className="col-1">
                        <h2 style={{marginTop:'60px'}}>+</h2>
                    </div>
                    <div className="col-2" onClick={()=>console.log('hi')}>
                <img 
             src={this.state.frequentlyBoughtTogetherArray[0].src}  width='60%'></img>
             <h6 >{this.state.frequentlyBoughtTogetherArray[0].name}</h6>
                    </div>
                    <div className="col-1">
                        <h2 style={{marginTop:'60px'}}>+</h2>
                    </div>
                    <div className="col-2">
             <img onClick={()=>{this.setState({id: this.state.frequentlyBoughtTogetherArray[1].id})}}
             src={this.state.frequentlyBoughtTogetherArray[1].src}  width='60%'></img>
             <h6 >{this.state.frequentlyBoughtTogetherArray[1].name}</h6>
                    </div>
                       
                           <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3"  >
                           <h3 style={{marginLeft: '5px',marginLeft: '20px' ,marginTop:'60px'}} type='text'>${this.state.price+this.state.frequentlyBoughtTogetherArray[0].price+this.state.frequentlyBoughtTogetherArray[1].price}</h3>

                        <form style={{alignItems:'center',marginRight: 'auto',marginLeft: '20px'}}>
                            <input  style={{backgroundColor:"#f96302" ,color :'#fff'  ,width:'170px',marginRight: 'auto',marginLeft: '5px', height:'35px'}} onClick={()=>this.addAllItemsToCart()} type='button' value='Add all items to cart' ></input>

                        </form>
                        </div>
               

        </>
    }
    
    render(){
        return(
            
            <div className="container-fluid row" >
                <div className="row" style={{margin:'20px'}}>
                    {this.state.isWidthToSmall?<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12"> <img default-src='none' src={this.state.theClickedImg} width='100%'></img></div>:this.fullSizeScreen()}

                    <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12" >
                        <h6><strong>{this.state.brand}</strong></h6>
                        <h6 > {this.state.name} </h6>
                        <StarRatings
                        rating={this.state.ratingAvg}
                        starRatedColor="#f96302"
                        starDimension="20px"
                        starSpacing="2px"
                        />
                        <h6 >Write a Review</h6>
                        <h6>Questions & Answers ({this.state.ratingArray.length})</h6>
                        <ul>
                            {this.state.descrbtionArray}
                        </ul>
                        <h5  >${this.state.price}</h5>
                        <img style={{maxWidth: '20px',width:'15%'}} src="https://assets.homedepot-static.com/p/static/images/icons/Credit-Card_Icon.svg"></img>
                        <div>
                        <small marginBottom ='10px' ><strong>Save up to $100♢</strong> on your qualifying purchase.
                        Apply for a Home Depot Consumer Card</small></div>
                        <div marginTop='15px'>
                        <form  width='100px' >
                            <input style={{maxWidth: '25px' }} onClick={()=>this.decres()} type='button' value='-'></input>
                            <input style={{maxWidth: '30px' ,width: '100%',marginLeft:'1px'}} type='text' min='1' value={this.state.quantity}></input>
                            <input style={{maxWidth: '25px' ,marginLeft:'1px'}} onClick={()=>this.incres()} type='button' value='+'></input>
                            <input style={{width:'100px', backgroundColor:"#f96302" ,color :'#fff'}} onClick={()=>this.addToCart()} type='button' value='Add to cart' ></input>
                        </form>
                        </div>
                    </div>
                </div >
            

                
                <div className='row Ibrahimfrec' style={{margin:'5px'}}>
                    <h2 >Frequently Bought Together</h2>
                    <hr></hr>
                </div>
            <div className='row'>
                {this.state.frequentlyBoughtTogetherArray.length>1?this.frequentlyBoughtTogetherRender():<div></div>}

            </div>
        
        </div>
        )
    }
}

ReactDOM.render(<Itemsview />, document.getElementById('product'))







//     // fullSizeScreen(){
//     //     return      <div>    <div className="col-xl-3 col-lg-3 col-md-3 ">
//     //     <h6 style={{fontSize: '1.0vw'}}>Internet #{this.state.id}</h6>
        
//     //     {this.state.imagesArray}
//     // </div>
   
//     // <div id='mainImage' className="col-xl-6 col-lg-6 col-md-6 ">
//     //     <h6 style={{fontSize: '1.0vw'}}> Model # DWHT51054 SKU #1001209802</h6>

//     //     <img default-src='none' src={this.state.theClickedImg} width='100%'></img> 
//     // </div></div>          
//     // }


//     // phoneSizeImage(){
//     //     return <div><div id="myCarousel" className="carousel slide" data-ride="carousel">
  
//     //     <ol className="carousel-indicators">
//     //       <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
//     //       <li data-target="#myCarousel" data-slide-to="1"></li>
//     //       <li data-target="#myCarousel" data-slide-to="2"></li>
//     //     </ol>
//     //     <div className="carousel-inner">
//     //       <div className="item active">
//     //         <img src={this.state.carouselImagesArray[0]} alt="0"></img>
//     //       </div>
      
//     //      {this.state.carouselImagesArray[1]?<div className="item">
//     //         <img src={this.state.carouselImagesArray[1]} alt="1"></img>
//     //       </div>:console.log()} 
      
//     //       {this.state.carouselImagesArray[2]?<div className="item">
//     //         <img src={this.state.carouselImagesArray[1]} alt="1"></img>
//     //       </div>:console.log()}
//     //     </div>
//     //     <a className="left carousel-control" href="#myCarousel" data-slide="prev">
//     //       <span className="glyphicon glyphicon-chevron-left"></span>
//     //       <span className="sr-only">Previous</span>
//     //     </a>
//     //     <a className="right carousel-control" href="#myCarousel" data-slide="next">
//     //       <span className="glyphicon glyphicon-chevron-right"></span>
//     //       <span className="sr-only">Next</span>
//     //     </a>
//     //   </div></div>
//     // }

//     frequentlyBoughtTogetherRender(){
//         return <div>
//             <div className="IbrahimFreqItems1">
//                 <img
//              src={this.state.theClickedImg}  width='100%'></img>
//              <h6 style={{fontSize: '1.4vw'}}>{this.state.name}</h6>
//                     </div>
                    
//                     <div className="IbrahimFreqItems2">
//                         <h2 style={{marginTop:'135px'}}>+</h2> 
//                                        <img
//              src={this.state.frequentlyBoughtTogetherArray[1].src}  width='100%'></img>
//              <h6 style={{fontSize: '1.4vw'}}>{this.state.frequentlyBoughtTogetherArray[1].name}</h6>
//                     </div>
//                     <div className="IbrahimFreqItems3">
//                         <h2 style={{marginTop:'135px'}}>+</h2> 
//                                     <img
//              src={this.state.frequentlyBoughtTogetherArray[2].src}  width='100%'></img>
//              <h6 style={{fontSize: '1.4vw'}}>{this.state.frequentlyBoughtTogetherArray[2].name}</h6>
//                     </div>
         
                           
//                         <form style={{alignItems:'center',marginRight: 'auto',marginLeft: 'auto'}}>
//                         <label  style={{maxWidth:'300px',maxHeight:'100px',display:'block',marginRight: 'auto',marginLeft: '5px',fontSize: '3.0vw'}} type='text'>${this.state.price+this.state.frequentlyBoughtTogetherArray[1].price+this.state.frequentlyBoughtTogetherArray[2].price}</label>
//                             <input   style={{backgroundColor:"#f96302" ,color :'#fff'  ,maxWidth:'200px',maxHeight:'170px',display:'block',marginRight: 'auto',marginLeft: '1px',width: '80%', height:'35px'}} onClick={()=>this.addAllItemsToCart()} type='button' value='Add all items to cart' ></input>

//                         </form>
                

//         </div>
//     }
    
//     render(){
//         return(
//             <div>
//             <div  className="Ibrahimcontainer" >
//                     {this.state.isWidthToSmall?  <div  className="IbrahimMainImage">
       

//         <img default-src='none' src={this.state.theClickedImg} width='100%'></img> 
//     </div>:<div>    <div className="IbrahimImages">
//         <h6 style={{fontSize: '1.0vw'}}>Internet #{this.state.id}</h6>
        
//         {this.state.imagesArray}
//     </div>
   
//     <div  className="IbrahimMainImage ">
//         <h6 style={{fontSize: '1.0vw'}}> Model # DWHT51054 SKU #1001209802</h6>

//         <img default-src='none' src={this.state.theClickedImg} width='40%'></img> 
//     </div></div>  }

//                     <div className="IbrahimitemInfo" >
//                         <h4 style={font}><strong>{this.state.brand}</strong></h4>
//                         <h4  style={font}> {this.state.name} </h4>
//                         <StarRatings
//                         rating={this.state.ratingAvg}
//                         starRatedColor="#f96302"
//                         starDimension="20px"
//                         starSpacing="2px"
//                         />
//                         <h5  style={font}>Write a Review</h5>
//                         <h5 style={font}>Questions & Answers ({this.state.ratingArray.length})</h5>
//                         <ul>
//                             {this.state.descrbtionArray}
//                         </ul>
//                         <h1  style={{fontSize: '2.4vw'}}>${this.state.price}</h1>
//                         <img style={{maxWidth: '20px',width:'15%'}} src="https://assets.homedepot-static.com/p/static/images/icons/Credit-Card_Icon.svg"></img>
//                         <h6 style={{fontSize: '1.2vw'}}><strong>Save up to $100♢</strong> on your qualifying purchase.
//                         Apply for a Home Depot Consumer Card</h6>
//                         <form margin='10px' >
//                             <input style={{maxWidth: '25px' }} onClick={()=>this.decres()} type='button' value='-'></input>
//                             <input style={{maxWidth: '20px' }} type='text' min='1' value={this.state.quantity}></input>
//                             <input style={{maxWidth: '25px' }} onClick={()=>this.incres()} type='button' value='+'></input>
//                             <input style={{maxWidth:'100px',width: '50%', backgroundColor:"#f96302" ,color :'#fff'}} onClick={()=>this.addToCart()} type='button' value='Add to cart' ></input>
//                         </form>
//                     </div>
//                     </div>
//                     <div className='Ibrahimcontainer'>
//                 <div className="IbrahimFreqWord">
//                     <h2 style={{fontSize: '3.4vw'}}>Frequently Bought Together</h2>
//                     <hr></hr>
//                 </div>
//         </div>
//            <div className='Ibrahimcontainer'>
//                 {/* <h1>{this.state.frequentlyBoughtTogetherArray.length}</h1> */}
//                 {this.state.frequentlyBoughtTogetherArray.length>1?<div>
//             <div className="IbrahimFreqItems1">
//                 <img
//              src={this.state.theClickedImg}  width='100%'></img>
//              <h6 style={{fontSize: '1.4vw'}}>{this.state.name}</h6>
//                     </div>
                    
//                     <div className="IbrahimFreqItems2">
//                         <h2 style={{marginTop:'135px'}}>+</h2> 
//                                        <img
//              src={this.state.frequentlyBoughtTogetherArray[1].src}  width='100%'></img>
//              <h6 style={{fontSize: '1.4vw'}}>{this.state.frequentlyBoughtTogetherArray[1].name}</h6>
//                     </div>
//                     <div className="IbrahimFreqItems3">
//                         <h2 style={{marginTop:'135px'}}>+</h2> 
//                                     <img
//              src={this.state.frequentlyBoughtTogetherArray[2].src}  width='100%'></img>
//              <h6 style={{fontSize: '1.4vw'}}>{this.state.frequentlyBoughtTogetherArray[2].name}</h6>
//                     </div>
         
                           
//                         <form style={{alignItems:'center',marginRight: 'auto',marginLeft: 'auto'}}>
//                         <label  style={{maxWidth:'300px',maxHeight:'100px',display:'block',marginRight: 'auto',marginLeft: '5px',fontSize: '3.0vw'}} type='text'>${this.state.price+this.state.frequentlyBoughtTogetherArray[1].price+this.state.frequentlyBoughtTogetherArray[2].price}</label>
//                             <input   style={{backgroundColor:"#f96302" ,color :'#fff'  ,maxWidth:'200px',maxHeight:'170px',display:'block',marginRight: 'auto',marginLeft: '1px',width: '80%', height:'35px'}} onClick={()=>this.addAllItemsToCart()} type='button' value='Add all items to cart' ></input>

//                         </form>
                

//         </div>:<div></div>}
//            </div>
              
// </div>
         
        
       
//         )
//     }
// }

// ReactDOM.render(<Itemsview />, document.getElementById('product'))