import './App.css';
import { useState } from "react";
import Form from './components/Form';
import Table from './components/Table.jsx'

function App() {
  const initialValues = {
    firstName : '',
    lastName : '',
    password : '',
    state : '',
    city: '',
    zipCode : '',  
  }
  const [inputField, setInputField] = useState(initialValues);
  const [tableData, setTableData]= useState([]);
  const [isEditable, setEditable] = useState(null);

  

  const getData = (data) => {
    console.log(data)
  }

  return (
    <div className="App">
            <Form getData={getData} 
                  tableData={tableData}  
                  setTableData={setTableData} 
                  inputField={inputField}
                  setInputField={setInputField}
                  isEditable={isEditable}
                  setEditable={setEditable}
             /> 
            <Table tableData={tableData} 
                   setTableData={setTableData}
                   setEditable={setEditable}
                   
            />
    </div>
  );
}

export default App;
