import bgImage from "../images/bg.jpg";
import lanternRight2 from "../images/lantern-right-2.png";
import lionright from "../images/lion-right.gif";
import { useEffect, useState } from "react";

import axios from "axios";
import "../App.css";

// naii
import io from "socket.io-client";
let socket = io.connect("https://socket-api-1-752301fd194d.herokuapp.com/");
import { api } from "../api/api";

function Board() {
  const [data, setData] = useState("");
  const [showTop, setShowTop] = useState([]);
  const [showTopTier, setShowTopTier] = useState([]);
  // const [loadStatus, setLoadStatus] = useState(false);
  const [loadStatus, setLoadStatus] = useState(localStorage.getItem("loadStatus") || false);
  // const [delayRender, setDelayRender] = useState(false);
  const [delayRender, setDelayRender] = useState(localStorage.getItem("delayRender") || 0);

  // naii State

  // const [Title, setTitle] = useState("");
  // const [gift, setGift] = useState("");
  // const [customer, setCustomer] = useState([]);
  // const [number, setNumber] = useState("");
  // const [id, setId] = useState("");
  // const [statusA, setStatusA] = useState("");
  // const [statusB, setStatusB] = useState("");

const [Title, setTitle] = useState(localStorage.getItem("Title") || "");
const [gift, setGift] = useState(localStorage.getItem("gift") || "");
const [customer, setCustomer] = useState(localStorage.getItem("customer") || "")
const [price, setPrice] = useState(localStorage.getItem("price") || "")
const [number, setNumber] = useState(localStorage.getItem("number") || "");
const [id, setId] = useState(localStorage.getItem("id") || "");
const [statusA, setStatusA] = useState(localStorage.getItem("statusA") || "");
const [statusB, setStatusB] = useState(localStorage.getItem("statusB") || "");

  // naii
  useEffect(() => {
    // socket_1
    socket.on("show_display_1", (newData) => {
      console.log(newData)
      newData.map((data) => {
        return (
          setTitle(data.auctionstarted_auction_topic),
          setId(data.id_auctionstarted),
          setStatusA(data.auctionstarted_status_A),
          setStatusB(data.auctionstarted_status_B),
          setLoadStatus("1"),
          setDelayRender(false)
        );
        
      });
    });

    // socket_2
    socket.on("show_display_2", (newData) => {
      console.log("display2 " + JSON.stringify(newData.main))
      console.log("display2 " + JSON.stringify(newData.main[0].id_auctionstarted))

      setTitle(newData.main[0].auctionstarted_auction_topic),
      setId(newData.main[0].id_auctionstarted),
      setStatusA(newData.main[0].auctionstarted_status_A),
      setStatusB(newData.main[0].auctionstarted_status_B),
      setLoadStatus("1"),
      setDelayRender(false),
      setGift(newData.main[0].auctionstarted_gift)
    });

    // socket_3
    socket.on("show_display_3", (newData) => {
      console.log("display3 " + JSON.stringify(newData))

      setTitle(newData[0].auctionstarted_auction_topic),
      setId(newData[0].id_auctionstarted),
      setStatusA(newData[0].auctionstarted_status_A),
      setLoadStatus("1"),
      setDelayRender(false),
      setGift(newData[0].auctionstarted_gift)
      setCustomer(newData.main[0].user_auction);
      setStatusB("1");
      setPrice(newData.main[0].auction_result_price);
      
    });

    // // socket_4
    // socket.on("show_display_4", (newData) => {
    //   if (newData === "ลบแล้ว") {
    //     setTitle("");
    //     setGift("");
    //     setCustomer([]);
    //     setNumber("");
    //     setId("");
    //   }
    // });

    socket.on("show_display_4", (newData) => {
      if (newData === "ลบแล้ว") {
        setTitle("");
        setGift("");
        setCustomer([]);
        setNumber("");
        setId("");
        localStorage.removeItem("Title");
        localStorage.removeItem("gift");
        localStorage.removeItem("number");
        localStorage.removeItem("id");
        localStorage.removeItem("statusA");
        localStorage.removeItem("statusB");
        localStorage.removeItem("delayRender");
        localStorage.removeItem("customer");
      }
    });

    // number_0
    socket.on("show_number_0", (newData) => {
      console.log("number0" + JSON.stringify(newData))
      setTitle(newData.main[0].auctionstarted_auction_topic),
      setId(newData.main[0].id_auctionstarted),
      setStatusA(newData.main[0].auctionstarted_status_A),
      setStatusB(newData.main[0].auctionstarted_status_B),
      setLoadStatus("1"),
      setDelayRender(false),
      setGift(newData.main[0].auctionstarted_gift)

      // setCustomer(newData.main[0].user_auction);
      // setPrice(newData.main[0].auction_result_price);
      
      setNumber(newData.data);
    });
    // number_1
    socket.on("show_number_1", (newData) => {
      console.log("number1" + JSON.stringify(newData))
      setTitle(newData.main[0].auctionstarted_auction_topic),
      setId(newData.main[0].id_auctionstarted),
      setStatusA(newData.main[0].auctionstarted_status_A),
      setStatusB(newData.main[0].auctionstarted_status_B),
      setLoadStatus("1"),
      setDelayRender(false),
      setGift(newData.main[0].auctionstarted_gift)
      setNumber(newData.data);
    });
    // number_2
    socket.on("show_number_2", (newData) => {
      console.log("number2" + JSON.stringify(newData))
      setTitle(newData.main[0].auctionstarted_auction_topic),
      setId(newData.main[0].id_auctionstarted),
      setStatusA(newData.main[0].auctionstarted_status_A),
      setStatusB(newData.main[0].auctionstarted_status_B),
      setLoadStatus("1"),
      setDelayRender(false),
      setGift(newData.main[0].auctionstarted_gift)
      setNumber(newData.data);
    });
    // number_3
    socket.on("show_number_3", (newData) => {
      console.log("number3" + JSON.stringify(newData.data))
      setTitle(newData.main[0].auctionstarted_auction_topic),
      setId(newData.main[0].id_auctionstarted),
      setStatusA(newData.main[0].auctionstarted_status_A),
      setStatusB(newData.main[0].auctionstarted_status_B),
      setLoadStatus("1"),
      setDelayRender("1"),
      setGift(newData.main[0].auctionstarted_gift)
      setNumber(newData.data);
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${api}/Show/List/Top`);
        setShowTop(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึกข้อมูล", error);
      }
    };

    const interval = setInterval(fetchData, 1000); // 1000 milliseconds = 1 second

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // if (!loadStatus) {
    //   setData("");
    //   setShowTop([]);
    // }

    if (loadStatus == 0) {
      setData("");
      setShowTop([]);
      localStorage.removeItem("Title");
      localStorage.removeItem("gift");
      localStorage.removeItem("number");
      localStorage.removeItem("id");
      localStorage.removeItem("statusA");
      localStorage.removeItem("statusB");
      localStorage.removeItem("loadStatus");
      localStorage.removeItem("delayRender");
    }
  }, [loadStatus]);

  useEffect(() => {
    if (number == 3) {
      setTimeout(async () => {
        try {
          const response1 = await axios.get(`${api}/Show/List/TopTire`);
          // console.log(response1.data);
        } catch (error) {
          console.error("ไม่สามารถเรียกดูข้อมูล TopTire ได้", error);
          const response2 = await axios.get(`${api}/Show/Report/${id}/Detail`);
          setShowTopTier(response2.data);
        }
        // localStorage.setItem("delayRender", true);
        setDelayRender(1);
      }, 3000);
    } else {
      setDelayRender(0);
    }
  }, [number, id]);

  useEffect(() => { 
    localStorage.setItem("Title", Title);
    localStorage.setItem("gift", gift);
    localStorage.setItem("number", number);
    localStorage.setItem("id", id);
    localStorage.setItem("statusA", statusA);
    localStorage.setItem("statusB", statusB);
    localStorage.setItem("loadStatus", loadStatus);
    localStorage.setItem("delayRender", delayRender);
    localStorage.setItem("customer", customer);
    localStorage.setItem("price", price);
  }, [Title, gift, number, id, statusA, statusB,loadStatus,delayRender,customer,price]);




  return (
    <div
      className="flex flex-col h-screen w-screen bg-red-200  items-center "
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {!id && (
  <div className="flex w-[80%] mt-48 text-white text-6xl break-all justify-center">
    กรุณารอการประมูลรอบถัดไป
  </div>
)}
      
      <div className="w-full flex justify-between z-10 ">
        <div className=" flex w-[15%] sm:w-[17%] md:w-[13%] lg:w-[10%] xl:w-[10%]  absolute top-0 left-0 z-10  ">
          <img src={lanternRight2} alt="lanternLeft" />
        </div>
        <div className=" flex w-[15%] sm:w-[17%] md:w-[13%] lg:w-[10%] xl:w-[10%]   absolute top-0 right-0  z-20">
          <img
            style={{ transform: "scaleX(-1)" }}
            src={lanternRight2}
            alt="lanternRight"
          />
        </div>
        {delayRender == 1 ? (
          <div className="flex w-full ">
            <div className=" flex w-[30%] sm:w-[25%] md:w-[25%] lg:w-[18%] xl:w-[15%]  absolute bottom-0 left-[-20px] sm:left-[-20px] md:left-[5px] lg:left-[-5px] xl:left-[5px]  z-10  ">
              <img
                style={{ transform: "scaleX(-1)" }}
                src={lionright}
                alt="lanternLeft"
              />
            </div>
            <div className=" flex w-[30%] sm:w-[25%] md:w-[25%] lg:w-[18%] xl:w-[15%]  absolute bottom-0 right-0  md:right-[5px] lg:right-[-5px] xl:right-[5px]  z-10  ">
              <img src={lionright} alt="lanternLeft" />
            </div>

            <div className=" flex flex-col justify-center items-center w-full  pb-36  sm:mt-5 lg:mt-0 bg-opacity-40 bg-red-200  transform translate-y-20 mx-3 lg:mx-16  sm:pb-10 md:pb-15 lg:pb-20   rounded-3xl">
              <div className="flex justify-center ">
                <h1 className="text-stroke-white1 text-gradient1 text-2xl sm:text-4xl sm:mt-12 lg:text-5xl mt-28 lg:mt-12  text-center font-black ">
                  ขอแสดงความยินดี
                </h1>
              </div>

              <div className="flex w-[90%] justify-center text-center items-center mt-7 sm:w-[80%] md:w-[90%] lg:mt-10 text-3xl sm:text-5xl lg:text-6xl bg-red-900 rounded-lg border-2 sm:py-1 border-yellow-400 text-white">
                <h1>
                  {/* {customer} */}
        
                  {showTop?.[0]?.user_auction && showTop[0].user_auction !== ""
                    ? showTop[0].user_auction
                    : ""}
                </h1>
              </div>

              <div className="flex justify-center  ">
                <h1 className=" text-stroke-white2 text-gradient2 text-6xl sm:text-6xl text-center mt-5 sm:mt-10  font-bold">
                  {Title && Title ? Title : ""}
                </h1>
              </div>
              <div className="flex w-[90%] justify-center text-center  mt-3 sm:mt-5 sm:text-3xl md:mt-5 lg:text-3xl lg:py-3 font-semibold ">
                {(gift && gift) || "ของมงคล : ไม่มีรายการ"}
              </div>

              <div>
                <h1 className="text-stroke-white text-gradient1 py-2  text-2xl sm:text-5xl text-center mt-5  font-bold ">
                  มูลค่า{" "}
                  <span>
                    {" "}
                    {showTop?.[0]?.auction_result_price?.toLocaleString() &&
                    showTop?.[0].auction_result_price?.toLocaleString() !== ""
                      ? showTop?.[0].auction_result_price?.toLocaleString()
                      : ""}
                  </span>{" "}
                  บาท{" "}
                </h1>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full flex ">
            {loadStatus == 1 && statusB === "1" ? (
              <div
                className={` ${
                  number < 1 || number > 3
                    ? ""
                    : "bg-white shadow-lg shadow-black"
                }  w-20 h-20 sm:w-24 sm:h-24 md:w-30 md:h-30  translate-y-12 translate-x-9 lg:translate-x-0  lg:translate-y-12 rounded-full flex items-center justify-center right-10 absolute z-40`}
              >
                {number === "1" && (
                  <img
                    src="/images/no-first.png"
                    alt="first"
                    style={{ width: "80%", height: "auto" }}
                    className="ms-2"
                  />
                )}
                {number === "2" && (
                  <img
                    src="/images/no-second.png"
                    alt="first"
                    style={{ width: "70%", height: "auto" }}
                  />
                )}
                {number === "3" && (
                  <img
                    src="/images/no-third.png"
                    alt="first"
                    style={{ width: "80%", height: "auto" }}
                  />
                )}
              </div>
            ) : (
              <div></div>
            )}

            {id && id ? (
              <div
                className={`w-full  pt-5 pb-32 bg-opacity-40  ${
                  Title ? "bg-red-200   " : ""
                }  transform translate-y-20 mx-5 md:mx-10 lg:mx-10 xl:mx-10  lg:pt-5  sm:pb-3 lg:py-10   rounded-3xl  `}
              >
                <div className="flex justify-center ">
                  <h1 className=" pt-5 pb-5 text-stroke-white text-gradient text-3xl sm:text-7xl text-center  font-bold">
                    {Title ? Title : ""}
                  </h1>
                </div>
                <div className="flex justify-center mt-5  ">
                  {gift && gift ? (
                    <div
                      className={`flex w-[90%] justify-center ${
                        gift ? "bg-white" : ""
                      }  text-center text-xl   rounded-full px-5 py-3 shadow-lg  border-black font-bold  text-red-700  sm:text-3xl md:text-3xl`}
                    >
                      {gift && gift}
                    </div>
                  ) : (
                  ""
                  )}
                </div>
                {statusB == 0 && id ? (
                  <div className="flex w-full justify-center sm:mt-5 text-3xl md:text-5xl py-6   text-center items-center align-middle font-bold">
                    <div className="flex flex-col">
                      <h1 className=" mb-2 sm:mb-10">ขอเชิญร่วมการประมูล</h1>
                      <h1>ของมงคลได้ค่ะ</h1>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col justify-center items-center mt-5">
                    {showTop.length > 0 && showTop[0] && (
                      <div className="w-full max-w-[90%] md:w-[80%] lg:w-[100%] xl:w-[100%]  mt-3 sm:mt-5 font-bold  bg-opacity-70 bg-red-100 sm:text-3xl md:text-4xl lg:text-4xl py-4  shadow-md shadow-black rounded-2xl px-3">
                        <div className="flex justify-between">
                          <div>
                            <h1>
                              1. <span>{showTop?.[0]?.user_auction}</span>
                            </h1>
                          </div>
                          <div>
                            <h1>
                              <span>
                                {showTop?.[0]?.auction_result_price.toLocaleString()}
                              </span>{" "}
                              บาท
                            </h1>
                          </div>
                        </div>
                      </div>
                    )}
                    {showTop.length > 1 && showTop[1] && (
                      <div className="w-full max-w-[90%] md:w-[80%] lg:w-[100%] xl:w-[100%] mt-5 text-sm sm:mt-1 md:mt-5 font-bold  sm:text-xl md:text-4xl lg:text-4xl py-4 md:py-2 lg:py-5 rounded-lg px-3">
                        <div className="flex justify-between">
                          <div>
                            <h1>
                              2. <span>{showTop?.[1]?.user_auction}</span>
                            </h1>
                          </div>
                          <div>
                            <h1>
                              <span>
                                {showTop?.[1]?.auction_result_price.toLocaleString()}
                              </span>{" "}
                              บาท
                            </h1>
                          </div>
                        </div>
                      </div>
                    )}
                    {showTop.length > 2 && showTop[2] && (
                      <div className="w-full max-w-[90%] md:w-[80%] lg:w-[100%] xl:w-[100%] mt-5 font-bold text-sm   sm:text-xl md:text-4xl lg:text-4xl   md:py-2 lg:py-4 rounded-lg px-3 ">
                        <div className="flex justify-between">
                          <div>
                            <h1>
                              3. <span>{showTop?.[2]?.user_auction}</span>
                            </h1>
                          </div>
                          <div>
                            <h1>
                              <span>
                                {showTop?.[2]?.auction_result_price.toLocaleString()}
                              </span>{" "}
                              บาท
                            </h1>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div> </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Board;
