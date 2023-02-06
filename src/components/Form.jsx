import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";
// import { getStateByCode } from "country-state-city/lib/state";
// import {City, Country, State} from "country-state-city";

const Form = ({
  getData,
  inputField,
  setInputField,
  tableData,
  setTableData,
  isEditable,
  setEditable,
  errors,
  setErrors,
  countryList,
  setCountryList,
  stateList,
  setStateList,
  cityList,
  setCityList,
}) => {

  // const countries = Country.getAllCountries();

  // const updatedCountries = countries
  //     .map((country) => ({ label: country.name, value: country.isoCode, ...country }));
  //     // console.log("--updatedCountries--", updatedCountries)
       
  // const updatedState =
  //    State.getStatesOfCountry(inputField.country)
  //   .map((state) => ({ label: state.name, value: state.isoCode, ...state }));
  //     // console.log("--updatedStates--",  updatedState)
  
  // const updatedCities  = City.getCitiesOfState(inputField.country, inputField.state)
  //     .map((city) => ({ label: city.name, value: city.isoCode, ...city }));
  //    // console.log("--updatedCities--", City.getCitiesOfState(inputField.country, inputField.state))
 
  // useEffect(() => {}, [inputField]);


 useEffect(() => { 
  getAllCountry()
  },[]);

  const countryOptions = {
    method: 'GET',
    url: 'https://api.countrystatecity.in/v1/countries',
    headers: {
      'X-CSCAPI-KEY': 'WXJoMFpnUUQxWUJrbk9heTBUbDdZbW1yNkpTYWt0bGZVMWtVWEdiZQ==',
    }
  };
  
  const getAllCountry = async () => {
    axios.request(countryOptions).then(function (response){
      setCountryList(response.data)
      //console.log("--response--",response.data);
    }).catch(function (error) {
      console.error(error);
    });
 }



const getCountryByState = async (inputField) => {
  const stateOptions = {
    method: 'GET',
    url: `https://api.countrystatecity.in/v1/countries/${inputField.country}/states`,
    headers: {
      'X-CSCAPI-KEY': 'WXJoMFpnUUQxWUJrbk9heTBUbDdZbW1yNkpTYWt0bGZVMWtVWEdiZQ==',
    }
  }; 

  axios.request(stateOptions).then(function (response){
    setStateList(response.data)
    //console.log("--setresponse--",response.data);
  }).catch(function (error) {
    console.error(error);
  });
}

const getStateByCity = async (inputField) => {
  const cityOptions = {
    method: 'GET',
    url: `https://api.countrystatecity.in/v1/countries/${inputField.country}/states/${inputField.state}/cities`,
    headers: {
      'X-CSCAPI-KEY': 'WXJoMFpnUUQxWUJrbk9heTBUbDdZbW1yNkpTYWt0bGZVMWtVWEdiZQ==',
    }
  }; 

  axios.request(cityOptions).then(function (response){
    setCityList(response.data)
    console.log("--setresponse--",response.data);
  }).catch(function (error) {
    console.error(error);
  });
}

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputField((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const editData = (updatedValue) => {
    axios.patch(`http://localhost:3000/posts/${updatedValue.id}`, updatedValue)
    .then(res => console.log(res.data.updatedValue));
  }


  const emptyInput = {
    firstName: "",
    lastName: "",
    password: "",
    state: "",
    city: "",
    zipCode: "",
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    getData(inputField);
    

    if (validate()) {
      setInputField({});
    }

    if (isEditable) {
      const updateValue = tableData.map((item) => {
        return item.id === isEditable.id ? { ...item, ...inputField } : item;
      });
      setTableData(updateValue);
      editData(inputField);
      setInputField(emptyInput);
      setEditable(null);

    } else {
      const data = {
        id: uuidv4(),
        isChecked: false,
        ...inputField,
      };
  
      axios.post("http://localhost:3000/posts", data)
       .then(response => { 
        setTableData([...tableData,response.data]);
        toast.success('Successfully Created the list');
      });

      // setTableData([...tableData, data]);
      setInputField(emptyInput);
    }
  };
  
  const validate = () => {
    const input = { ...inputField };
    let errors = {};
    let isValid = true;

    if (input?.firstName === "") {
      isValid = false;
      errors.firstName = "Please enter First Name";
    } else if (input.firstName?.length > 8) {
      isValid = false;
      errors.firstName = "Name cannot exceed 8 characters";
    }

    if (input?.lastName === "") {
      isValid = false;
      errors.lastName = "Please enter Last Name";
    } else if (input.lastName?.length > 8) {
      isValid = false;
      errors.lastName = "Name cannot exceed 8 characters";
    }

    if (input?.password === "") {
      isValid = false;
      errors.password = "Please enter your password.";
    } else {
      if (input.password.length > 6) {
        isValid = false;
        errors.password = "Please enter six length password.";
      }
    }

    if (input?.state === "") {
      isValid = false;
      errors.state = "Please enter State Name";
    } 

    if (input?.city === "") {
      isValid = false;
      errors.city = "Please enter City Name";
    } 

    if (input?.zipCode === "") {
      isValid = false;
      errors.zipCode = "Please enter Zip Code";
    }
    setErrors(errors);
    return isValid;
  };


  const handleFirstNameBlur = () => {
    const input = { ...inputField };
    if (input?.firstName === "") {
      setErrors({...errors, firstNameError: "FirstName is required"})
    } else {
      setErrors({...errors, firstNameError: ""})
    }
  }

  const handleLastNameBlur = () => {
    const input = { ...inputField };
    if (input?.lastName === "") {
      setErrors({...errors, lastNameError: "LastName is required"})
    } else {
      setErrors({...errors, lastNameError: ""})
    }
  }

  const handlePasswordBlur = () => {
    const input = { ...inputField };
    if (input?.password === "") {
      setErrors({...errors, passwordError: "Password is required"});
    }
    else {
      setErrors({...errors, passwordError: ""})
  }
}


const handleCountryBlur = () => {
  const input = { ...inputField };
  if (input?.country === "") {
    setErrors({...errors, countryError: "Country is required"});
}
else {
  setErrors({...errors, countryError: ""})
}
}

  const handleStateBlur = () => {
    const input = { ...inputField };
    if (input?.state === "") {
      setErrors({...errors, stateError: "State is required"});
  }
  else {
    setErrors({...errors, stateError: ""})
}
}

  const handleCityBlur = () => {
    const input = { ...inputField };
    if (input?.city === "") {
      setErrors({...errors, cityError: "City is required"});
    } 
    else {
      setErrors({...errors, cityError: ""})
  }
  }

  const handleZipeCodeBlur = () => {
    const input = { ...inputField };
    if (input?.zipCode === "") {
      setErrors({...errors, zipCodeError: "Zip code is required"});
    } 
    else {
      setErrors({...errors, zipCodeError: ""})
  }
  }

  return (
    <form
      className="w-full max-w-lg mt-12 px-6 pt-6 pb-8 mb-4"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-first-name"
          >
            First Name
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name"
            type="text"
            placeholder="Enter your first name"
            name="firstName"
            value={inputField.firstName}
            onChange={handleChange}
            onBlur={handleFirstNameBlur} 
          />
           {errors.firstNameError && <div className="text-sm text-red-700">{errors.firstNameError}</div>}
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-last-name"
          >
            Last Name
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-last-name"
            type="text"
            placeholder="Enter your last name"
            name="lastName"
            value={inputField.lastName}
            onChange={handleChange}
            onBlur={handleLastNameBlur} 
          />
           {errors.lastNameError && <div className="text-sm text-red-700">{errors.lastNameError}</div>}
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-password"
          >
            Password
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-password"
            type="password"
            placeholder="Enter your password"
            name="password"
            value={inputField.password}
            onChange={handleChange}
            onBlur={handlePasswordBlur} 
          />
          <p className="text-gray-600 text-xs italic">
            Make it as long and as crazy as you'd like
          </p>
          {errors.passwordError && <div className="text-sm text-red-700">{errors.passwordError}</div>}
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-2">
      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-state"
          >
            Country
          </label>
          <div className="relative">
            <select
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-state"
              type="select"
              placeholder="Select the Country"
              name="country"
              value={inputField.country}
              onChange={(e) => {
                setInputField({...inputField , country: e.target.value, state: null, city: null });
                getCountryByState({...inputField , country: e.target.value})
              }}
              onBlur={handleCountryBlur} 
            >
              {countryList?.map((country) => {
             return (<option value={ country.iso2 }>{country.name}</option>)
            })}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
          {errors.countryError && <div className="text-sm text-red-700">{errors.countryError}</div>}
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-state"
          >
            State
          </label>
          <div className="relative">
            <select
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-state"
              type="select"
              placeholder="Select the State"
              name="state"
              value={inputField.state}
              onBlur={handleStateBlur} 
              onChange={(e) => {
                setInputField({ ...inputField , state: e.target.value , city: null });
                getStateByCity({ ...inputField , state: e.target.value , })
              }}
            >
            {stateList?.map((state) => {
             return (
             <option value={ state.iso2 ? state.iso2 : "" }>{state.name}</option>
             )
            })}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
          {errors.stateError && <div className="text-sm text-red-700">{errors.stateError}</div>}
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-state"
          >
            City
          </label>
          <div className="relative">
            <select
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-state"
              type="select"
              placeholder="Select the City"
              name="city"
              value={inputField.city}
              onBlur={handleCityBlur} 
              onChange={(e) => {
                setInputField({...inputField , city: e.target.value });
              }}
            >
            {cityList.map((city) => {
             return (<option value={ city.iso2 ? city.iso2 : "" }>{city.name}</option>)
            })}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
          {errors.cityError && <div className="text-sm text-red-700">{errors.cityError}</div>}
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-zip"
          >
            Zip
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-zip"
            type="text"
            placeholder="Zip code"
            name="zipCode"
            value={inputField.zipCode}
            onChange={handleChange}
            onBlur={handleZipeCodeBlur} 
          />
            {errors.zipCodeError && <div className="text-sm text-red-700">{errors.zipCodeError}</div>}
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0 mt-5">
          {isEditable ? (
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full justify-center">
              Save
            </button>
          ) : (
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full justify-center">
              Submit
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default Form;
