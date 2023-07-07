import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import Modal from "react-modal";
import axios from "axios";
import logout from "../../public/images/icon-logout.svg";
import { Alert } from "@material-tailwind/react";
import { MdDeleteOutline } from "react-icons/md";

// API
import { api } from "../api/api";

Modal.setAppElement("#root");

function Menu3() {
  const [inputData, setInputData] = useState("");
  const [listData, setListData] = useState([]);
  const navigate = useNavigate();
  const [editDataId, setEditDataId] = useState(null);
  const [isModalOpen, setisModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [modalIsOpen2, setModalIsOpen2] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [modalInputName, setModalInputName] = useState("");
  const [modalInputAddr, setModalInputAddr] = useState("");
  const [modalInputTel, setModalInputTel] = useState("");
  const [modalInputLine, setModalInputLine] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showAlert1, setShowAlert1] = useState(false);
  const [filteredCustomerList, setFilteredCustomerList] = useState([]);
  const [customerList, setCustomerList] = useState([]);
  const [searchText, setSearchText] = useState("");

  const Token = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://bankcash1.herokuapp.com/Customer",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${Token}`,
          },
        }
      );
      // console.log(response.data);
      setListData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchCustomerList = async () => {
      try {
        const response = await axios.get(
          `${api}/Customer`,
          // "https://bankcash1.herokuapp.com/Customer",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${Token}`,
            },
          }
        );
        setCustomerList(response.data);
        setFilteredCustomerList(response.data);
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
      }
    };
    fetchCustomerList();
  }, []);

  useEffect(() => {
    if (searchText === "") {
      setFilteredCustomerList(customerList);
    } else {
      const filteredList = customerList.filter((customer) =>
        customer.customer_name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredCustomerList(filteredList);
    }
  }, [searchText, customerList]);

  const handleAddCustomer = async () => {

    if (
      modalInputName.trim() === "" ||
      modalInputAddr.trim() === "" ||
      modalInputTel.trim() === "" ||
      modalInputLine.trim() === ""
    ) {
      return;
    }
    const newData = {
      customer_name: modalInputName,
      customer_address: modalInputAddr,
      customer_tel: modalInputTel,
      customer_line: modalInputLine,
    };

    try {

      const response = await axios.post(
        `https://bankcash1.herokuapp.com/Customer`,
        newData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${Token}`,
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
    try {
      const response = await axios.get(
        `${api}/Customer`,
        // "https://bankcash1.herokuapp.com/Customer",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${Token}`,
          },
        }
      );
      console.log(response.data)
      setCustomerList(response.data);
      setFilteredCustomerList(response.data);
      closeModal2();
      setModalData(null);
      setModalInputName("");
      setModalInputAddr("");
      setModalInputTel("");
      setModalInputLine("");
      setEditDataId(null);
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
    }
  }

  const handleEdit = (data) => {
    setModalData(data);
    setModalInputName(data.customer_name);
    setModalInputAddr(data.customer_address);
    setModalInputTel(data.customer_tel);
    setModalInputLine(data.customer_line);
    setEditDataId(data.id);
    setisModalOpen(true);
  };

  const handleSaveEdit = async () => {
    if (
      modalInputName.trim() === "" ||
      modalInputAddr.trim() === "" ||
      modalInputTel.trim() === "" ||
      modalInputLine.trim() === ""
    ) {
      return;
    }
    const newData = {
      customer_name: modalInputName,
      customer_address: modalInputAddr,
      customer_tel: modalInputTel,
      customer_line: modalInputLine,
    };

    try {
      if (!editDataId) {
        console.error("editDataId is not set");
        return;
      }

      const response = await axios.put(
        `https://bankcash1.herokuapp.com/Customer/${editDataId}/edit`,
        newData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${Token}`,
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
    try {
      const response = await axios.get(
        `${api}/Customer`,
        // "https://bankcash1.herokuapp.com/Customer",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${Token}`,
          },
        }
      );
      setCustomerList(response.data);
      setFilteredCustomerList(response.data);
      closeModal();
      setModalData(null);
      setModalInputName("");
      setModalInputAddr("");
      setModalInputTel("");
      setModalInputLine("");
      setEditDataId(null);
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
    }
  };

  const closeModal = () => {
    setisModalOpen(false);
    setModalData(null);
  };

  useEffect(() => {
    if (modalIsOpen2) {
      setShowModal2(true);
    } else {
      setShowModal2(false);
    }
  }, [modalIsOpen2]);

  const openModal2 = () => {
    setModalIsOpen2(true);
  };

  const closeModal2 = () => {
    setModalIsOpen2(false);
    // setModalData(null);
  };

  const handleInputNameChange = (e) => {
    const value = e.target.value;
    if (isModalOpen || showModal2) {
      setModalInputName(value);
    } else {
      setInputData(value);
    }
  };
  const handleInputAddrChange = (e) => {
    const value = e.target.value;
    if (isModalOpen || showModal2) {
      setModalInputAddr(value);
    } else {
      setInputData(value);
    }
  };
  const handleInputTelChange = (e) => {
    const value = e.target.value;
    if (isModalOpen || showModal2) {
      setModalInputTel(value);
    } else {
      setInputData(value);
    }
  };
  const handleInputLineChange = (e) => {
    const value = e.target.value;
    if (isModalOpen || showModal2) {
      setModalInputLine(value);
    } else {
      setInputData(value);
    }
  };

  const handleDelete = async (data) => {
    const id = data.id;
    try {
      const response = await axios.delete(
        `https://bankcash1.herokuapp.com/Customer/${id}/delete`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${Token}`,
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
    try {
      const response = await axios.get(
        `${api}/Customer`,
        // "https://bankcash1.herokuapp.com/Customer",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${Token}`,
          },
        }
      );
      setCustomerList(response.data);
      setFilteredCustomerList(response.data);
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
    }
  };


  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className=" flex flex-col  bg-gray-200 h-screen ms-0 ">
      <div className="flex  items-center justify-between item-center text-white bg-red-400 px-5 py-[20px] sm:py-[20px] md:py-[22px] lg:py-[22px] xl:py-[23px] ">
        <div className="flex  w-full lg:w-[30%]  ">
          <h1 className="w-full text-start lg:text-lg">ผู้ร่วมประมูล</h1>
        </div>
        <div className="flex w-[30%] items-center align-bottom  text-end">
          {showAlert1 && (
            <Alert
              open={open}
              onClose={() => setShowAlert1(false)}
              className=" flex bg-red-50 bg-opacity-25 text-end text-green-600 font-semibold  justify-center align-middle items-center my-0 py-0  text-lg "
              animate={{
                mount: { y: 0 },
                unmount: { y: 100 },
              }}
            >
              \\ --- บันทึกสำเร็จ --- //
            </Alert>
          )}
        </div>

        <div className="flex w-[50%] md:w-[10%]  justify-end text-center">
          <button
            onClick={handleLogout}
            className="flex justify-center  text-center align-middle rounded-lg  font-bold hover:text-black"
          >
            <img src={logout} className="  text-center  justify-center" />
          </button>
        </div>
      </div>
      <div className="flex flex-col   bg-white rounded-lg my-5 mx-5">
        <div className=" w-full  px-3  flex flex-col md:flex-row py-3  justify-center lg:justify-start align-middle text-center ">
          {/* Content here will take full width on small screens, and half width on larger screens */}
          <div className="flex md:w-[90%] lg:w-[50%] justify-center items-center align-middle mt-3 md:mt-0   ">
            <input
              type="text"
              placeholder="ใส่ชื่อที่ต้องการค้นหา"
              className="flex w-[80%] sm:w-[60%] md:w-[90%] lg:w-full border rounded-lg bg-gray-200 text-center sm:mt-5 md:mt-0 lg:mt-0 lg:py-2  py-1 md:py-2 leading-tight text-gray-700  shadow-md appearance-none focus:outline-none focus:shadow-outline"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <div className="w-full lg:w-[25%] flex justify-center items-center md:justify-start">
            <button
              className=" flex  sm:[50%] sm:ms-5 my-3   px-10 py-2  justify-center text-center items-center  shadow-lg  text-green-500 font-semibold  bg-green-300 active:bg-green-300 active:text-white  bg-opacity-30  rounded-lg focus:outline-none focus:shadow-outline "
              // onClick={handleAddCustomer}
              onClick={openModal2}
            >
              <span className=" flex text-center justify-center text-xs  sm:text-lg">
                เพิ่มผู้ประมูล
              </span>
            </button>
          </div>
        </div>
        <div className="w-full  p-4  flex justify-center items-center mt-2 md:mt-0">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <div className="align-middle overflow-x-auto inline-block min-w-full shadow overflow-y-auto sm:rounded-lg border border-gray-200 max-h-96">
              <table className="w-full border border-gray-300 shadow-lg bg-white p-5  ">
                <thead className="sticky top-0 ">
                  <tr>
                    <th className=" px-6 py-3 border-b border-gray-200 bg-indigo-300 text-center font-semibold text-sm leading-4  tracking-wider">
                      ผู้ร่วมประมูล
                    </th>
                    <th className=" px-6 py-3 border-b border-gray-200 bg-indigo-300 text-center font-semibold text-sm leading-4  tracking-wider">
                      ที่อยู่
                    </th>
                    <th className=" px-6 py-3 border-b border-gray-200 bg-indigo-300 text-center font-semibold text-sm leading-4  tracking-wider">
                      เบอร์โทรศัพท์
                    </th>
                    <th className=" px-6 py-3 border-b border-gray-200 bg-indigo-300 text-center font-semibold text-sm leading-4  tracking-wider">
                      Line ID
                    </th>
                    <th className="px-6 py-3 border-b border-gray-200  bg-indigo-300  text-center text-sm leading-4 font-semibold   tracking-wider">
                      แก้ไข
                    </th>
                    <th className="px-6 py-3 border-b border-gray-200  bg-indigo-300  text-center text-sm leading-4 font-semibold   tracking-wider">
                      ลบ
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {filteredCustomerList.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-4">
                        ไม่มีข้อมูล
                      </td>
                    </tr>
                  ) : (
                    filteredCustomerList.map((data, index) => (
                      <tr key={index} className="hover:bg-gray-100">
                        <td className="whitespace-no-wrap border-b border-gray-200 text-center py-2">
                          {data.customer_name}
                        </td>
                        <td className="whitespace-no-wrap border-b border-gray-200 text-center py-2">
                          {data.customer_address}
                        </td>
                        <td className="whitespace-no-wrap border-b border-gray-200 text-center py-2">
                          {data.customer_tel}
                        </td>
                        <td className="whitespace-no-wrap border-b border-gray-200 text-center py-2">
                          {data.customer_line}
                        </td>
                        <td className="whitespace-no-wrap border-b border-gray-200 text-center text-2xl ">
                          <button
                            className="rounded hover:bg-yellow-200 p-2"
                            onClick={() => handleEdit(data)}
                          >
                            <FaEdit className=" text-yellow-500 " />
                          </button>
                        </td>
                        <td className="whitespace-no-wrap border-b border-gray-200 text-center text-3xl">
                          <button
                            className="   p-1 rounded hover:bg-red-200"
                            onClick={() => handleDelete(data)}
                          >
                            <MdDeleteOutline className=" text-red-500 " />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* modal 1 */}

        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Edit Modal"
          style={{
            content: {
              width: "70%",
              height: "70%",
              // position:"fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
              backgroundColor: "rgb(229 231 235)",
            },
            overlay: {
              display: "flex",
              justifyContent: "center",
              backdropFilter: "blur(2px)",
            },
          }}
        >
          {modalData && (
            <div className="bg-gray-200 flex flex-col align-middle">
              <button
                className="w-full flex justify-end font-bold text-2xl text-red-500"
                onClick={closeModal}
              >
                <BiLogOut className="text-3xl text-center justify-center" />
              </button>
              <h2 className="text-center font-semibold text-xl mb-5 md:mb-10">
                แก้ไขข้อมูลผู้ร่วมประมูล
              </h2>
              <div className="lg:w-[60%] lg:mx-48 text-center flex-col justify-center items-center">
                <div className="flex flex-col lg:flex-row lg:space-x-3 justify-center items-center mb-4">
                  <label className="mr-2 fon">ชื่อผู้ร่วมประมูล:</label>
                  <input
                    className="w-[70%] md:w-[55%] lg:w-[50%] xl:w-[250px] px-3 py-2 text-sm leading-tight text-gray-700 rounded-lg shadow-lg appearance-none focus:outline-none focus:shadow-outline"
                    type="text"
                    value={modalInputName}
                    onChange={handleInputNameChange}
                  />
                </div>
                <div className="flex flex-col lg:flex-row lg:space-x-3 justify-center items-center mb-4">
                  <label className="mr-2">ที่อยู่:</label>
                  <input
                    className="w-[70%] md:w-[55%] lg:w-[300px] xl:w-[320px] px-3 py-2 text-sm leading-tight text-gray-700 rounded-lg shadow-lg appearance-none focus:outline-none focus:shadow-outline"
                    type="text"
                    value={modalInputAddr}
                    onChange={handleInputAddrChange}
                  />
                </div>
                <div className="flex flex-col lg:flex-row lg:space-x-3 justify-center items-center mb-4">
                  <label className="mr-2">เบอร์โทรศัพท์:</label>
                  <input
                    className="w-[70%] md:w-[55%] lg:w-[250px] xl:w-[260px] px-3 py-2 text-sm leading-tight text-gray-700 rounded-lg shadow-lg appearance-none focus:outline-none focus:shadow-outline"
                    type="text"
                    value={modalInputTel}
                    onChange={handleInputTelChange}
                  />
                </div>
                <div className="flex flex-col lg:flex-row lg:space-x-3 justify-center items-center mb-4">
                  <label className="mr-2">Line ID:</label>
                  <input
                    className="w-[70%] md:w-[55%] lg:w-[280px] xl:w-[300px] px-3 py-2 text-sm leading-tight text-gray-700 rounded-lg shadow-lg appearance-none focus:outline-none focus:shadow-outline"
                    type="text"
                    value={modalInputLine}
                    onChange={handleInputLineChange}
                  />
                </div>
              </div>

              <div className="flex flex-col justify-center text-center align-middle items-center">
                <button
                  className="w-[40%] lg:w-[20%] px-4 py-2 mt-1 text-center flex justify-center text-green-500 font-semibold bg-green-300 active:bg-green-300 active:text-white bg-opacity-30 rounded-lg focus:outline-none focus:shadow-outline"
                  onClick={handleSaveEdit}
                >
                  บันทึก
                </button>
              </div>
            </div>
          )}
        </Modal>

        {/* modal 2 */}
        {showModal2 && (
            <Modal
            isOpen={modalIsOpen2}
            onRequestClose={closeModal2}
            contentLabel="Add Modal"
            style={{
              content: {
                width: "70%",
                height: "70%",
                // position:"fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
                backgroundColor: "rgb(229 231 235)",
              },
              overlay: {
                display: "flex",
                justifyContent: "center",
                backdropFilter: "blur(2px)",
              },
            }}
          >
              <div className="bg-gray-200 flex flex-col align-middle">
                <button
                  className="w-full flex justify-end font-bold text-2xl text-red-500"
                  onClick={closeModal2}
                >
                  <BiLogOut className="text-3xl text-center justify-center" />
                </button>
                <h2 className="text-center font-semibold text-xl mb-5 md:mb-10">
                  เพิ่มรายชื่อผู้ร่วมประมูล
                </h2>
                <div className="lg:w-[60%] lg:mx-48 text-center flex-col justify-center items-center">
                  <div className="flex flex-col lg:flex-row lg:space-x-3 justify-center items-center mb-4">
                    <label className="mr-2 fon">ชื่อผู้ร่วมประมูล:</label>
                    <input
                      className="w-[70%] md:w-[55%] lg:w-[50%] xl:w-[250px] px-3 py-2 text-sm leading-tight text-gray-700 rounded-lg shadow-lg appearance-none focus:outline-none focus:shadow-outline"
                      type="text"
                      // value={modalInputName}
                      onChange={handleInputNameChange}
                    />
                  </div>
                  <div className="flex flex-col lg:flex-row lg:space-x-3 justify-center items-center mb-4">
                    <label className="mr-2">ที่อยู่:</label>
                    <input
                      className="w-[70%] md:w-[55%] lg:w-[300px] xl:w-[320px] px-3 py-2 text-sm leading-tight text-gray-700 rounded-lg shadow-lg appearance-none focus:outline-none focus:shadow-outline"
                      type="text"
                      // value={modalInputAddr}
                      onChange={handleInputAddrChange}
                    />
                  </div>
                  <div className="flex flex-col lg:flex-row lg:space-x-3 justify-center items-center mb-4">
                    <label className="mr-2">เบอร์โทรศัพท์:</label>
                    <input
                      className="w-[70%] md:w-[55%] lg:w-[250px] xl:w-[260px] px-3 py-2 text-sm leading-tight text-gray-700 rounded-lg shadow-lg appearance-none focus:outline-none focus:shadow-outline"
                      type="text"
                      // value={modalInputTel}
                      onChange={handleInputTelChange}
                    />
                  </div>
                  <div className="flex flex-col lg:flex-row lg:space-x-3 justify-center items-center mb-4">
                    <label className="mr-2">Line ID:</label>
                    <input
                      className="w-[70%] md:w-[55%] lg:w-[280px] xl:w-[300px] px-3 py-2 text-sm leading-tight text-gray-700 rounded-lg shadow-lg appearance-none focus:outline-none focus:shadow-outline"
                      type="text"
                      // value={modalInputLine}
                      onChange={handleInputLineChange}
                    />
                  </div>
                </div>
  
                <div className="flex flex-col justify-center text-center align-middle items-center">
                  <button
                    className="w-[40%] lg:w-[20%] px-4 py-2 mt-1 text-center flex justify-center text-green-500 font-semibold bg-green-300 active:bg-green-300 active:text-white bg-opacity-30 rounded-lg focus:outline-none focus:shadow-outline"
                    onClick={handleAddCustomer}
                  >
                    บันทึก
                  </button>
                </div>
              </div>
          </Modal>
  

        )}

      


      </div>
    </div>
  );
}

export default Menu3;
