import { useState } from "react";

function ReadingInput(){
    let [name,setName] = useState('');
    let [email,setEmail] = useState('');
    let [password,setPassword] = useState('');

    let [nameMsg,setNameMsg] = useState('');
    let [emailMsg,setEmailMsg] = useState('');
    let [passwordMsg,setPasswordMsg] = useState('');
    
    const process=()=>{   //REGEX
        console.log(name + '--' + email + '--' + password);
        let user={
            'name': name,
            'email': email,
            'password': password
        }
        let status = validate(user);

        if(status === true){
            console.log('sign up success, call API ')
        }
        else{
            console.log('sign up unsuccessful, wait ')
        }
    }

    const validate = (user)=>{
        if(user.name === ''){
            setNameMsg('name is required')
            return false
        }
        else 
        if(!(user.name.match(/(^[a-zA-Z ]+$)/))){
            console.log('line 36...')
            setNameMsg('small and capital characters(az- A-Z) with spaces are allowed')
            return false
        }
        else{
            setNameMsg('')
        }

        if(user.email === ''){
            setEmailMsg('email is required')
            return false
        }
        else 
        if(!user.email.match(/(^[a-zA-Z0-9.-_]+@[a-zA-Z0-9.-_]+\.[a-zA-Z]+$)/)){ //a@b.com
            setEmailMsg('email should be valid: ex. john@example.com')
            return false
        }
        else{
            setEmailMsg('')
        }

        if(user.password === ''){
            setPasswordMsg('password is required')
            return false
        }
        else 
        if(!user.password.match(/(^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$)/)){
            setPasswordMsg('password must follow following rules: one special char, atleast captial letter, atleast 1 digit0-9')
            return false
        }
        else{
            setPasswordMsg('')
        }

        return true
    }

    return(
        <div>
            <h3>Reading input from User: </h3>

            <div>
                <label>Please enter your name: </label>
                <input type="text" onChange={(e)=>setName(e.target.value) }/>
                <span>{nameMsg}</span>
                <br />
                <label>Please enter your email: </label>
                <input type="text" onChange={(e)=>setEmail(e.target.value) }/>
                <span>{emailMsg}</span>
                <br />
                <label>Please enter your Password: </label>
                <input type="text" onChange={(e)=>setPassword(e.target.value) }/>
                <span>{passwordMsg}</span>
                <br />
                
                <button onClick={()=>process()}>Sign Up</button>
            </div>
        </div>
    )
}

export default ReadingInput;