import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import Modal from "react-modal";
import axios from "axios";
import logout from "../../public/images/icon-logout.svg";
import { Alert, } from "@material-tailwind/react";
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
  const [modalInput, setModalInput] = useState("");
  const [actionStatus, setActionStatus] = useState("0");
  const [isLoading, setIsLoading] = useState(true);
  const [showAlert1, setShowAlert1] = useState(false);
  const [filteredCustomerList, setFilteredCustomerList] = useState([]);
  const [customerList, setCustomerList] = useState([]);
  const [searchText, setSearchText] = useState("");


  const Token = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://bankcash1.herokuapp.com/Title",
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

  // const fetchDataTitleChoose = async () => {
  //   try {
  //     const responseTitle = await axios.get(
  //       `${api}/Title/Choose`,
  //       // "https://bankcash1.herokuapp.com/Title/Choose",
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Token ${Token}`,
  //         },
  //       }
  //     );
  //     // console.log(responseTitle.data);
  //     setListDataTitle(responseTitle.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };



  useEffect(() => {
    // fetchDataTitleChoose();

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


  // const handleEdit = (data) => {
  //   setModalData(data);
  //   setModalInput(data.title_auction_topic);
  //   setEditDataId(data.auction_topic_id);
  //   setisModalOpen(true);
  // };

  const closeModal = () => {
    setisModalOpen(false);
    setModalData(null);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (isModalOpen) {
      setModalInput(value);
    } else {
      setInputData(value);
    }
  };

  const handleSave = async () => {
    try {
      if (editDataId) {
        if (isModalOpen) {
          const dataIndex = listData.findIndex(
            (data) => data.auction_topic_id === editDataId
          );
          if (dataIndex !== -1) {
            const updatedData = {
              ...listData[dataIndex],
              title_auction_topic: modalInput,
              status_auction_topic: actionStatus,
            };
            // console.log(editDataId);
            const response = await axios.put(
              `https://bankcash1.herokuapp.com/Title/${editDataId}/edit`,
              updatedData,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Token ${Token}`,
                },
              }
            );
            // console.log(updatedData)
            // console.log(response.data);

            const newListData = [...listData];
            newListData[dataIndex] = updatedData;
            setListData(newListData);
            setModalInput("");
            setActionStatus("");
            setisModalOpen(false);
          } else {
            console.error("Data not found for editing");
          }
        } else {
          console.error("Missing modal input");
        }
      } else {
        const maxId =
          listData.length > 0
            ? Math.max(...listData.map((data) => data.auction_topic_id))
            : 0;
        const newData = {
          auction_topic_id: maxId + 1,
          title_auction_topic: inputData,
          status_auction_topic: actionStatus,
        };

        const response = await axios.post(
          "https://bankcash1.herokuapp.com/Title",
          newData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${Token}`,
            },
          }
        );
        // console.log(response.data);

        setListData((prevlistData) => [...prevlistData, response.data]);
        setInputData("");
        await fetchData();
        setShowAlert1(true);
        setTimeout(() => {
          setShowAlert1(false);
        }, 1500); // เวลาในหน่วยมิลลิวินาที (2000 มิลลิวินาที = 2 วินาที
      }
    } catch (error) {
      console.error(error);
    }

    setEditDataId(null);
    setisModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // const handleStatusChange = (value) => {
  //   setActionStatus(Number(value));
  // };

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
              onClick={handleSave}
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
                                รายชื่อผู้ร่วมประมูล
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
                                  <td className="whitespace-no-wrap border-b border-gray-200 text-center text-2xl ">
                                    <button
                                      className="rounded hover:bg-yellow-200 p-2"
                                    >
                                      <FaEdit className=" text-yellow-500 " />
                                    </button>
                                  </td>
                                  <td className="whitespace-no-wrap border-b border-gray-200 text-center text-3xl">
                                    <button
                                      className="   p-1 rounded hover:bg-red-200"
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
            <div className="bg-gray-200   flex flex-col   justify-center items-center align-middle text-center  ">
              <button
                className=" w-full flex justify-end font-bold text-2xl text-red-500"
                onClick={closeModal}
              >
                <BiLogOut className="  text-3xl  text-center justify-center" />
              </button>
              <h2 className=" text-center font-semibold text-xl  mb-5  md:mb-10 ">
                แก้ไขหัวข้อประมูล
              </h2>
              <input
                className="w-[70%] md:w-[55%] lg:w-[50%] xl:w-[40%] px-3 py-2 text-sm leading-tight text-gray-700 rounded-lg shadow-lg appearance-none focus:outline-none focus:shadow-outline mb-4"
                type="text"
                value={modalInput}
                onChange={handleInputChange}
              />
       

              <button
                className="w-[30%] lg:w-[20%] px-4 py-2 mt-7  text-green-500 font-semibold  bg-green-300 active:bg-green-300 active:text-white  bg-opacity-30  rounded-lg focus:outline-none focus:shadow-outline"
                onClick={handleSave}
              >
                บันทึก
              </button>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
}

export default Menu3;
