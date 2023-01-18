import { v4 as uuidv4 } from "uuid";

const Form = ({
  getData,
  tableData,
  setTableData,
  inputField,
  setInputField,
  isEditable,
  setEditable,
  errors,
  setErrors
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputField((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getData(inputField);
    const data = {
      id: uuidv4(),
      isChecked: false,
      ...inputField,
    };
    if (validate()) {
      setInputField({});
    }

    if (isEditable) {
      const updateValue = tableData.map((item) => {
        return item.id === isEditable.id ? { ...item, ...inputField } : item;
      });
      setTableData(updateValue);
      setInputField({
        firstName: "",
        lastName: "",
        password: "",
        state: "",
        city: "",
        zipCode: "",
      });
      setEditable(null);
    } else {
      setTableData([...tableData, data]);
      const emptyInput = {
        firstName: "",
        lastName: "",
        password: "",
        state: "",
        city: "",
        zipCode: "",
      };
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


  const handleBlur = () => {
    const input = { ...inputField };
    let errors = {};
    let isValid = true;

    if (input?.firstName === "") {
      isValid = false;
      errors.firstName = "First name is required";
      if (input?.lastName === "") {
        isValid = false;
        errors.lastName = "Last name is required";
      }
    } 

    else if (input?.lastName === "") {
      isValid = false;
      errors.lastName = "Last name is required";
    }

    else if (input?.password === "") {
      isValid = false;
      errors.password = "Passowrd is required";
    }

    else if (input?.state === "") {
      isValid = false;
      errors.state = "State is required";
    } 

    else if (input?.city === "") {
      isValid = false;
      errors.city = "City is required";
    } 

    else if (input?.zipCode === "") {
      isValid = false;
      errors.zipCode = "Zip code is required";
    } 

     setErrors(errors);
    return isValid;
  };

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
            onBlur={handleBlur} 
          />
           {errors.firstName && <div className="text-sm text-red-700">{errors.firstName}</div>}
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
            onBlur={handleBlur} 
          />
           {errors.lastName && <div className="text-sm text-red-700">{errors.lastName}</div>}
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
          />
          <p className="text-gray-600 text-xs italic">
            Make it as long and as crazy as you'd like
          </p>
          {errors.password && <div className="text-sm text-red-700">{errors.password}</div>}
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-2">
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
        
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-city"
          >
            State
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-city"
            type="text"
            placeholder="State name"
            name="state"
            value={inputField.state}
            onChange={handleChange}
            onBlur={handleBlur} 
          />
           {errors.state && <div className="text-sm text-red-700">{errors.state}</div>}
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
              name="city"
              placeholder="Select the City"
              value={inputField.city}
              onChange={handleChange}
              onBlur={handleBlur} 
            >
              <option>Indore</option>
              <option>Bhopal</option>
              <option>Ujjain</option>
              <option>Ratlam</option>
              <option>Dewas</option>
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
          {errors.city && <div className="text-sm text-red-700">{errors.city}</div>}
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
            onBlur={handleBlur} 
          />
            {errors.zipCode && <div className="text-sm text-red-700">{errors.zipCode}</div>}
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
