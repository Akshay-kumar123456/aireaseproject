import './App.css';

import ReadingInput from './component/readingInput';
 
function App() {
  
  return (
    <div>
       {/* <MyClick /> : call function on click of a button and change the msg value*/} 
       {/* <MyArray /> : 
            Display the initial value of array using map. 
            call the function on click of button(sort-ASC,sort-DESC)
            sort the array in the function using sort method of JS
            When the state of the array changes, react will rerender the component and display
            latest value. 

            AND SO, always create a state and not a simple variable. 
       */}
       {/* <Employee /> 
            Create 3 objects having 4 props each. 
            add these object to an array and iterate over it through map. 
            call the function on click of button(sort-ASC,sort-DESC)
            sort the array in the function using sort method of JS as per salary
            When the state of the array changes, react will rerender the component and display
            latest value. 

       */}
       <ReadingInput />
       {/*  create input field in html and apply onChange event handler to it 
            <input type="" onChange="" />

            set the value types in input box by use to state variable using setState 
            const [name,setName] = useState(''); -- name=''
            <input type="text" onChange="(e)=>setName(e.target.value)" />
       */}
    </div>
  );
}

export default App;

/* npm start 
localhost:3000 
*/