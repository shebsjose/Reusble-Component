
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen,faTrashCan } from "@fortawesome/free-solid-svg-icons";


const Table = ({ tableData, setTableData, setEditable } ) => {

  const handleEdit = (data) => {
    setEditable({
      firstName : data.firstName,
      lastName : data.lastName,
      password : data.password,
      state : data.state,
      city: data.city,
      zipCode : data.zipCode, 
    })
  }
    
  const handleDelete = (id) => {
    const filterData = tableData.filter(( row ) => {
      return row.id !== id
    })
    setTableData(filterData)
    console.log(filterData)
  }
  return (
    <>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-white border-b">
                  <tr>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      First Name
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Last Name
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      State
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      City
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Zip Code
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Edit
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Delete
                    </th>
                    

                  </tr>
                </thead>
                <tbody>
                    { tableData.length > 0 ?
                    tableData?.map((data,i) => (
                  <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                      key={i}
                  >
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {data.firstName}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {data.lastName}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {data.state}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {data.city}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {data.zipCode}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    <FontAwesomeIcon icon={faPen} 
                            onClick={() => handleEdit(data)}
                    />
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    <FontAwesomeIcon icon={faTrashCan}
                            onClick={()=> handleDelete(data.id)}
                    />
                    </td>
                  </tr>
                  )) : 
                    <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                      There is no data in the table
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
