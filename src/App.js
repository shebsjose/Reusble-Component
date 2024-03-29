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
    country : '',
    state : '',
    city: '',
    zipCode : '',  
  }
  const initialErrors = {
    firstNameError : '',
    lastNameError : '',
    passwordError : '',
    CountryError: '',
    stateError : '',
    cityError: '',
    zipCodeError : '',  
  }
  const [inputField, setInputField] = useState(initialValues);
  const [tableData, setTableData]= useState([]);
  const [isEditable, setEditable] = useState(null);
  const [showFavList, setShowFavList] = useState([]);
  const [errors, setErrors] = useState(initialErrors)                                       
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  

  useEffect(() => {
    handleApi();
  }, []);
  console.log("--inputField--",inputField)
console.log("--cityList--",cityList)

  const handleApi = async () => {
     const data = await axios("http://localhost:3000/posts");
    //  const {data} = await axios("http://localhost:3000/posts");
     setTableData(data.data);
    //  setTableData(data);
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
                  inputField={inputField}
                  setInputField={setInputField}
                  tableData={tableData}  
                  setTableData={setTableData} 
                  isEditable={isEditable}
                  setEditable={setEditable}
                  errors={errors}
                  setErrors={setErrors}
                  countryList={countryList}
                  setCountryList={setCountryList}
                  stateList={stateList}
                  setStateList={setStateList}
                  cityList={cityList}
                  setCityList={setCityList}
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
