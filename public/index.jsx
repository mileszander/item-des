import React from 'react'
import ReactDOM from 'react-dom'
class Helloworld extends React.Component {



render(){
    return(
    <div className="container">
        <h2>hello world IJ</h2>
        {/* <div class="row">
            <h6 class="col-lg-2">Internet #205594063Store</h6>
            <h6 class="col-lg-2"> Model # DWHT51054 </h6>
            <h6 class="col-lg-2"> SKU #1001209802</h6>
        </div>
        <div class="row">
            <h6 class="col-lg-2">Internet #205594063Store</h6>
            <h6 class="col-lg-2"> Model # DWHT51054 </h6>
            <h6 class="col-lg-2"> SKU #1001209802</h6>
        </div> */}
    </div>
    )
}

}
ReactDOM.render(<Helloworld />, document.getElementById('root'))