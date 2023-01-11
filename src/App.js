import './App.css';
import { useEffect, useState } from "react";
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
  const [showFavList, setShowFavList] = useState([]);

  useEffect(() => {
    const filterArray = tableData.filter((item) => item.isChecked === true);
    setShowFavList(filterArray)
  }, [tableData]);
  console.log("--showFavList--",showFavList)


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
                   setInputField={setInputField}
                   setShowFavList={setShowFavList}
            />
             <Table 
                    tableData={showFavList} 
                    // setTableData={setTableData}
                    // setShowFavList={setShowFavList}

              />
                                    
    </div>
  );
}

export default App;
