import {useState } from "react";

function MyArray() {
    let [arry, setArry] = useState([5,3,1,6,2,0,2,9,4]); //100X: 5 3 1
    const sortArry=(direction)=>{
        if(direction === 'ASC'){
            //sort ascending
             //a>b: +ve(swap)  a<b: -ve(nothing)  a=b: 0(nothing)
            let temp = arry.sort((a, b) => a - b);  //100X
            setArry([...temp])//200X
        }
        else{
            //sort descending
              //a>b: +ve(swap)  a<b: -ve(nothing)  a=b: 0(nothing)
              let temp = arry.sort((a, b) => b - a);  //100X
              setArry([...temp])//200X
        } 
    }
    return (
      <div>
        <h5>My Array:</h5>
            {
                arry.map((e,index)=>
                    <span key={index} className="arry">
                       {e}
                    </span>
                    )
            }
            <br /><br />
            <button onClick={()=>sortArry('ASC')}>Sort ASC</button> 
            &nbsp;&nbsp;
            <button onClick={()=>sortArry('DESC')}>Sort DESC</button>
      </div>
    );
}

export default MyArray;