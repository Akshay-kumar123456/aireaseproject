
import { useState } from "react";

function MyClick(){
    let [msg, setMsg] =useState('');
    let [product,setProduct] = useState('');

    const display=(str)=>{
        console.log(str)
        if(str === 'morning'){
          setMsg('Welcome Harry, Good Morning')
          console.log('in morning if')
        } 
        else{
          setMsg('Welcome Harry, Good Evening')
          console.log('in morning else')
        }
      }

      const displayProduct =(category)=>{
        if(category === 'mobile')
          setProduct('Apple IPhone 13, Oppo A17')
        else
          setProduct('HP Envy, Macbook Air')
      }

    return(
        <div className="App">
      <h1>My First React App</h1>

      <div className="content">{msg}</div>
      <br />
      <div>
        <button onClick={() => display("morning")}>Wish Morning </button>
        &nbsp;&nbsp;
        <button onClick={() => display("evening")}>Wish Evening </button>
      </div>

      <hr />

      <div>
        <p>What do what to buy? </p>
        <button onClick={()=>displayProduct('mobile')}>Mobile</button>
        &nbsp;&nbsp;
        <button onClick={()=>displayProduct('laptop')}>Laptop</button>
      </div>
      <br />
      <div className="content">{product}</div>
    </div>
    )
}

export default MyClick;