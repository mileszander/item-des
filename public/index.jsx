import React from 'react'
import ReactDOM from 'react-dom'
class Helloworld extends React.Component {



render(){
    return(
        <div>
            <h2>IJ hello world</h2>
        </div>
    )
}

}
ReactDOM.render(<Helloworld />, document.getElementById('root'))