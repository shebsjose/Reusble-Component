import './App.css';
import { useEffect, useState } from "react";
import Form from './components/Form';
import Table from './components/Table.jsx'
import axios from "axios";

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
  const [errors, setErrors] = useState({})                                       
  const [tableData, setTableData]= useState([]);
  const [isEditable, setEditable] = useState(null);
  const [showFavList, setShowFavList] = useState([]);

  useEffect(() => {
    handleApi();
  }, []);

  const handleApi = async () => {
    const data = await axios("http://localhost:3000/posts");
    setTableData(data);
  }

  useEffect(() => {
    const filterArray = tableData.filter((item) => item.isChecked === true);
    setShowFavList(filterArray)
  }, [tableData]);
  
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
                  errors={errors}
                  setErrors={setErrors}
                  /> 
            <Table tableData={tableData} 
                   setTableData={setTableData}
                   setEditable={setEditable}
                   setInputField={setInputField}
                   setShowFavList={setShowFavList}
            />
             <Table 
                    tableData={showFavList} 
                    setTableData={setTableData}
                    setShowFavList={setShowFavList}

              />
                                    
    </div>
  );
}

export default App;
