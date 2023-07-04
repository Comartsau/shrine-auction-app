import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { BiLogOut } from "react-icons/bi";
import { PDFViewer } from "@react-pdf/renderer";
import logout from "../../public/images/icon-logout.svg";
import Modal from "react-modal";
import Delivery from "./Delivery";
import FileSaver from "file-saver";
import axios from "axios";
import { Alert } from "@material-tailwind/react";

Modal.setAppElement("#root");

function Menu5() {
    const [showAlert1, setShowAlert1] = useState(false);


    const navigate = useNavigate();

    const handleLogout = () => {
      navigate("/");
    };

   

  return (
    <div className=" flex flex-col  bg-gray-200 sm:h-screen m-0   ">
          <div className="flex  items-center justify-between item-center text-white bg-red-400 px-5 py-[20px] sm:py-[20px] md:py-[22px] lg:py-[22px] xl:py-[23px] ">
        <div className="flex w-[15%]">
          <h1 className=" text-center lg:text-lg">ใบส่งของ</h1>
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
      <h1>ออกใบส่งของ</h1>
      
              <div className="w-full h-full flex flex-col   justify-center items-center align-middle text-center">
                <div className="w-full h-full">
                  <PDFViewer width="100%" height="580px">
                    {/* {reportData && <Delivery reportData={reportData} />} */}
                    <Delivery  />
                 
                  </PDFViewer>
                </div>
              </div>
   
    </div>
  );
}

export default Menu5;
