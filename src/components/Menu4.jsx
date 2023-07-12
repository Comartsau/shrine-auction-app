import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { BiLogOut } from "react-icons/bi";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { GrDocumentText } from "react-icons/gr";
import logout from "../../public/images/icon-logout.svg";
import { PDFViewer } from "@react-pdf/renderer";
import Delivery from "./Delivery";
import FileSaver from "file-saver";
import axios from "axios";
import { Alert } from "@material-tailwind/react";
import Modal from "react-modal";

import { api } from "../api/api";

function Menu4() {
  const [isLoading, setIsLoading] = useState(true);
  const [listData, setListData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchCustomer, setSearchCustomer] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [showAlert1, setShowAlert1] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalIsOpen2, setModalIsOpen2] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [id_auctionstarted, setid_auctionstarted] = useState("");

  const [reportData, setReportData] = useState({});
  const [detailData, setDetailData] = useState(null);

  const navigate = useNavigate();

  const Token = localStorage.getItem("token");

  const handleLogout = () => {
    navigate("/");
  };

  const openModal = () => {
    if (!modalIsOpen) {
      setModalIsOpen(true);
    }
  };

  const closeModal = () => {
    if (modalIsOpen) {
      setModalIsOpen(false);
    }
  };
  const openModal2 = () => {
    if (!modalIsOpen2) {
      setModalIsOpen2(true);
    }
  };

  const closeModal2 = () => {
    if (modalIsOpen2) {
      setModalIsOpen2(false);
    }
  };

  useEffect(() => {
    if (modalIsOpen) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [modalIsOpen]);

  useEffect(() => {
    if (modalIsOpen2) {
      setShowModal2(true);
    } else {
      setShowModal2(false);
    }
  }, [modalIsOpen2]);

  useEffect(() => {
    fetchDataAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (searchCustomer === "" && searchDate === "") {
      fetchDataAll();
      setIsLoading(false);
    } else if (searchCustomer && searchDate === "") {
      const filteredData = listData.filter((item) =>
        item.customer_name.toLowerCase().includes(searchCustomer.toLowerCase())
      );
      setFilteredData(filteredData);
      setIsLoading(false);
    } else if (searchCustomer === "" && searchDate) {
      const filteredData = listData.filter(
        (item) => item.auction_report_date === searchDate
      );
      setFilteredData(filteredData);
      setIsLoading(false);
    } else if (searchCustomer && searchDate) {
      const filteredData = listData.filter(
        (item) =>
          item.customer_name
            .toLowerCase()
            .includes(searchCustomer.toLowerCase()) &&
          item.auction_report_date === searchDate
      );
      setFilteredData(filteredData);
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchCustomer, searchDate, listData]);

  const fetchDataAll = async () => {
    try {
      const response = await axios.get(
        "https://bankcash1.herokuapp.com/search-report/",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${Token}`,
          },
        }
      );
      console.log(response.data)
      setListData(response.data);
      setFilteredData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setListData("");
    }
  };
  // console.log(listData)

  const fetchDataTotal = () => {
    setSearchCustomer("");
    setSearchDate("");
    fetchDataAll();
  };

  const fetchExcel_2 = async () => {
    if (!searchCustomer && !searchDate) {
      location.href = "https://bankcash1.herokuapp.com/download-reports/";
    } else if (searchCustomer) {
      location.href = `https://bankcash1.herokuapp.com/download-reports/?customer_name=${searchCustomer}`;
    } else if (searchDate) {
      let date = new Date(searchDate);

      let newFormat = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      alert(newFormat);

      location.href = `https://bankcash1.herokuapp.com/download-reports/?date=${newFormat}`;
    } else if (searchCustomer && searchDate) {
      let date = new Date(searchDate);

      let newFormat = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      location.href = `https://bankcash1.herokuapp.com/download-reports/?customer_name=${searchCustomer}&date=${newFormat}`;
    }
  };


  const handleView = (data) => {
    // console.log(data)
    setDetailData(data);
    console.log(detailData);
    openModal();
  };

  const handleGenerateDelivery = async (data) => {
    // console.log(data)
    try {
      const response = await axios.get(
        `${api}/aa?report_id=${data.id_auction_report}`,
        // `https://bankcash1.herokuapp.com/Show/Report/${id_auctionstarted}/Detail`,
        {
          headers: {
            Authorization: `Token ${Token}`,
            "Content-Type": "application/json",
          },
          maxBodyLength: Infinity,
        }
      );
      setReportData(response.data);
      openModal2();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className=" flex flex-col  bg-gray-200 sm:h-screen m-0   ">
      <div className="flex  items-center justify-between item-center text-white bg-red-400 px-5 py-[20px] sm:py-[20px] md:py-[22px] lg:py-[22px] xl:py-[23px] ">
        <div className="flex w-[15%]">
          <h1 className=" text-center lg:text-lg">รายงาน</h1>
        </div>
        <div className="flex w-[40%]md:w-[15%] items-center align-bottom  text-end">
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
              \\ --- ดาวโหลดสำเร็จ --- //
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
      <div className=" bg-white rounded-lg my-5 mx-5  ">
        {/* Content here will take full width on small screens, and half width on larger screens */}

        <div className=" w-full  px-3  flex flex-col sm:flex-col md:flex-col lg:px-5 lg:flex-row py-3 md:py-0 md:mt-5 xl:px-5  justify-center  md:justify-center align-middle text-center ">
          {/* Content here will take full width on small screens, and half width on larger screens */}
          <div className="lg:w-[70%] xl:w-[70%]">
            <input
              className=" w-[70%] md:w-[50%] lg:w-full   px-3  text-center sm:text-left py-2 mt-2  md:h-[43px]    md:mt-3 lg:mt-6 leading-tight bg-gray-200  border rounded-lg shadow-md appearance-none focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="ค้นหาจากผู้ประมูล"
              value={searchCustomer}
              // onChange={(e) => {
              // }}
              onChange={(e) => setSearchCustomer(e.target.value)}
            />
          </div>
          <div className="lg:w-[70%] xl:w-[60%] sm:mt-3 ">
            <input
              className="w-[70%] md:w-[50%] lg:w-[70%]  px-3 lg:px-2 lg:ms-3 text-center sm:text-left py-2 mt-2  md:h-[43px]   md:mt-3 leading-tight bg-gray-200  border rounded-lg shadow-md appearance-none focus:outline-none focus:shadow-outline"
              type="date"
              value={searchDate || ""}
              // onChange={(e) => {
              //   setSearchDate(e.target.value);
              // }}
              onChange={(e) => setSearchDate(e.target.value)}
            />
          </div>

          <div className="flex w-full lg:w-[50%] flex-col sm:flex-row sm:mt-5  lg:mt-3 ">
            {/* <div className="w-full  flex justify-center sm:justify-end  lg:w-[30%] xl:w-[30%] lg:ms-5    md:mt-0">
              <button
                className="flex w-[60%] sm:w-[10%] md:w-[50%] lg:w-full my-3  md:ms-0 lg:ms-3 lg:py-2   px-10 md:px-0  py-2  justify-center text-center items-center  shadow-lg  font-semibold   text-sky-500 bg-sky-300  active:bg-sky-300 active:text-white bg-opacity-30 rounded-lg  focus:outline-none focus:shadow-outline"
                // onClick={fetchData}
              >
                <span className="w-full flex text-center justify-center  text-xs sm:text-sm lg:text-base">
                  ค้นหา
                </span>
              </button>
            </div> */}
            <div className="w-full flex lg:ms-3  justify-center lg:w-[40%] xl:w-[40%]">
              <button
                className=" flex w-[60%] sm:w-[10%] md:w-[50%] lg:w-full lg:py-3 my-3 md:ms-0   px-10 py-2 md:px-0   justify-center text-center items-center  shadow-lg font-semibold   text-green-500 bg-green-300  active:bg-green-300 active:text-white bg-opacity-30 rounded-lg focus:outline-none focus:shadow-outline"
                onClick={fetchDataTotal}
              >
                <span className=" flex text-center justify-center text-xs sm:text-sm lg:text-base">
                  ทั้งหมด
                </span>
              </button>
            </div>
            <div className="w-full  flex justify-center lg:ms-3  sm:justify-start  lg:w-[40%] xl:w-[40%]">
              <button
                className=" flex w-[60%] sm:w-[10%] md:w-[50%]  lg:w-full lg:py-3  md:ms-0 my-3   px-10 md:px-0  py-2    justify-center text-center items-center  shadow-lg font-semibold  text-amber-500 bg-amber-300  active:bg-amber-300 active:text-white bg-opacity-30 rounded-lg  focus:outline-none focus:shadow-outline"
                onClick={fetchExcel_2}
              >
                <span className=" flex text-center justify-center text-xs sm:text-sm lg:text-base">
                  Excel
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* <button  onClick={fetchExcel_2}>sssss</button> */}

        <div className="w-full  p-4  flex justify-center items-center table-wrapper   mt-2">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <div className="align-middle overflow-x-auto inline-block min-w-full shadow overflow-y-auto sm:rounded-lg border border-gray-200   max-h-96 ">
              <table className="min-w-full">
                <thead className="sticky top-0">
                  <tr>
                    <th className="lg:w-[5%]  px-6 py-3 border-b border-gray-200 bg-indigo-300 font-bold text-center text-sm md:text-xs  xl:text-lg leading-4   uppercase tracking-wider">
                      #
                    </th>
                    <th className="md:w-[18%] lg:w-[20%]   px-6 py-3 border-b border-gray-200   bg-indigo-300 font-bold  text-center text-xs md:text-sm xl:text-lg leading-4   uppercase tracking-wider">
                      วันที่
                    </th>
                    <th className="md:w-[18%] lg:w-[30%] px-6 py-3 border-b border-gray-200   bg-indigo-300 font-bold  text-center text-sm md:text-xs xl:text-lg leading-4   uppercase tracking-wider">
                      ชื่อ
                    </th>
                    <th className="md:w-[18%] lg:w-[30%]   px-6 py-3 border-b border-gray-200   bg-indigo-300  font-bold text-center text-sm md:text-xs xl:text-lg leading-4   uppercase tracking-wider">
                      หัวข้อประมูล
                    </th>
                    <th className="md:w-[19%] lg:w-[5%]   px-6 py-3 border-b border-gray-200   bg-indigo-300 font-bold  text-center text-sm md:text-xs xl:text-lg leading-4   uppercase tracking-wider"></th>
                    <th className="md:w-[19%] lg:w-[10%]   px-6 py-3 border-b border-gray-200   bg-indigo-300 font-bold  text-center text-sm md:text-xs xl:text-lg leading-4   uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody className="bg-gray-200">
                  {filteredData.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-4">
                        ไม่มีข้อมูล
                      </td>
                      <td colSpan="5" className="text-center py-4"></td>
                    </tr>
                  ) : (
                    filteredData.map((data, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-no-wrap border-b text-xs  md:text-xs lg:text-base   border-gray-50 text-center">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b text-xs  md:text-xs lg:text-base   border-gray-50 text-center">
                          {data.auction_report_date}
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b text-xs  md:text-xs lg:text-base   border-gray-50 text-center">
                          {data.customer_name}
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b text-xs  md:text-xs lg:text-base   border-gray-50 text-center">
                          {data.auction_report_auctionstarted}
                        </td>
                        <td className=" py-4 whitespace-no-wrap border-b text-xs  md:text-xs lg:text-base     border-gray-50 text-center">
                          <button
                            className="text-3xl bg-green-300 px-1 py-1  rounded-lg text-green-600"
                            onClick={() => handleView(data)}
                          >
                            <MdOutlineRemoveRedEye />
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b text-xs  md:text-xs lg:text-base    border-gray-50 text-center">
                          <button
                            className="text-2xl  bg-yellow-300 px-2 py-2 rounded-lg "
                            onClick={() => handleGenerateDelivery(data)}
                          >
                            <GrDocumentText />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {showModal && (
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              contentLabel="Giveway Modal"
              style={{
                content: {
                  width: "60%",
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
              <div className="w-full h-full flex flex-col   justify-center items-center align-middle text-center">
                <button
                  className=" w-full flex justify-end font-semibold  text-red-500 mb-3"
                  onClick={closeModal}
                >
                  <BiLogOut className="  text-2xl  text-center justify-center" />
                </button>

                <div className="w-full h-full flex-col p-4 border-4 border-black ">
                  <div className="w-full h-full flex-col border-4 border-black ">
                    <div className="flex">
                      <div className="flex-col w-[90%]">
                        <h1 className="text-3xl mt-10  font-bold mb-7 ms-20">
                          รายละเอียดการประมูล
                        </h1>
                        <div className="flex justify-center space-x-3 mt-5 ms-20">
                          <h1 className=" font-bold">วันที่ประมูล :</h1>
                          <h1>{detailData.auction_report_date}</h1>
                        </div>
                        <div className="flex justify-center space-x-3 mt-5 ms-20">
                          <h1 className=" font-bold">สินค้าที่ประมูล :</h1>
                          <h1>{detailData.auction_report_auctionstarted}</h1>
                        </div>
                        <div className="flex justify-center space-x-3 mt-5 ms-20">
                          <h1 className=" font-bold">ผู้ชนะการประมูล :</h1>
                          <h1>{detailData.customer_name}</h1>
                        </div>
                        <div className="flex justify-center space-x-3 mt-5 ms-20">
                          <h1 className=" font-bold text-end w-[170px]">ของมงคลที่ได้ :</h1>
                          <h1 className="flex text-start">{detailData.auction_report_gift}</h1>
                        </div>
                        <div className="flex justify-center space-x-3 mt-5 ms-20">
                          <h1 className=" font-bold">ราคาที่ประมูลได้ :</h1>
                          <h1>
                            {detailData.auction_report_price.toLocaleString()}
                          </h1>
                          <h1>บาท</h1>
                        </div>
                      </div>
                      <div className="flex-col w-[20%] ">
                        <div className="w-full flex justify-center   ">
                          <img
                            src="../images/ribbon.png"
                            alt=""
                            className="w-full"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Modal>
          )}
          {showModal2 && (
            <Modal
              isOpen={modalIsOpen2}
              onRequestClose={closeModal2}
              contentLabel="Giveway Modal"
              style={{
                content: {
                  width: "90%",
                  height: "90%",
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
              <div className="w-full h-full flex flex-col   justify-center items-center align-middle text-center">
                <button
                  className=" w-full flex justify-end font-semibold  text-red-500 mb-3"
                  onClick={closeModal2}
                >
                  <BiLogOut className="  text-2xl  text-center justify-center" />
                </button>

                <div className="w-full h-full">
                  <PDFViewer width="100%" height="500px">
                    {reportData && <Delivery reportData={reportData} />}
                  </PDFViewer>
                </div>
              </div>
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
}

export default Menu4;
