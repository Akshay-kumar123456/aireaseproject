import { useState } from "react";

function Employee(){
    let e1={
        'id':1,
        'name':'harry potter',
        'salary': 85000,
        'city':'mumbai'
    };

    let e2={
        'id':2,
        'name':'ronald weasley',
        'salary': 75000,
        'city':'chennai'
    };

    let e3={
        'id':3,
        'name':'hermione granger',
        'salary': 95000,
        'city':'mumbai'
    };

    const [employees,setEmployees] = useState([e1,e2,e3]); //array of objects

    const sortEmployee = (direction)=>{
        if(direction === 'ASC'){
            let temp = employees.sort((e1,e2) => e1.salary-e2.salary);
            setEmployees([...temp])
        }
        else{
            let temp = employees.sort((a,b) => b.salary-a.salary);
            setEmployees([...temp])
        }
    }

    return(
        <div>
            <div className="content">
                <button onClick={()=>sortEmployee('ASC')}>Sort Records by Salary-ASC</button>
                &nbsp;&nbsp;
                <button onClick={()=>sortEmployee('DESC')}>Sort Records by Salary-DESC</button>
            </div>
            <table className="tbl"> 
                <thead>
                        <tr>
                        <th>#ID</th>
                        <th>Name</th>
                        <th>Salary</th>
                        <th>city</th>
                        </tr>
                    </thead>
                <tbody>
                    
            {
                employees.map((emp,index)=>( // Each child in a list should have a unique "key" prop.
                    
                            <tr key={index}> 
                                <td>{emp.id}</td>
                                <td>{emp.name}</td>
                                <td>{emp.salary}</td>
                                <td>{emp.city}</td>
                            </tr>
                     
                ))    

            }
            </tbody>
            </table>

        </div>
    )
}
export default Employee;