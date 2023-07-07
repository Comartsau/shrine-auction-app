// import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useContext } from "react";
import { DisableButtonsContext } from "../App";
import Menu1 from "../components/Menu1";
import Menu2 from "../components/Menu2";
import Menu3 from "../components/Menu3";
import Menu4 from "../components/Menu4";
// import Menu5 from "../components/Menu5"
import logo from "../../public/images/project-logo.png";
import menu1Logo from "../../public/images/icon-info.svg";
import menu2Logo from "../../public/images/icon-monitor.svg";
import menu3Logo from "../../public/images/icon-people.svg";
import menu4Logo from "../../public/images/icon-list.svg";
// import menu5Logo from "../../public/images/icon-delivery.svg";

function Admin() {
  const [menuModal1, setMenuDal1] = useState(false);
  const [menuModal2, setMenuDal2] = useState(true);
  const [menuModal3, setMenuDal3] = useState(false);
  const [menuModal4, setMenuDal4] = useState(false);
  // const [menuModal5, setMenuDal5] = useState(false);

  const { disableButtons } = useContext(DisableButtonsContext);

  const checkActive = (path) => {
    switch (path) {
      case "/admin/menu1":
        return menuModal1
          ? " bg-purple-300 border-none  shadow-lg text-red-500   py-2 "
          : "  bg-white border-none  shadow-lg shadow-white    py-2    ";
      case "/admin/menu2":
        return menuModal2
          ? " bg-purple-300 border-none  shadow-lg text-red-500   py-2 "
          : "  bg-white border-none  shadow-lg shadow-white    py-2    ";
      case "/admin/menu3":
        return menuModal3
          ? " bg-purple-300 border-none  shadow-lg text-red-500  py-2 "
          : " bg-white border-none  shadow-lg shadow-white    py-2  ";
      case "/admin/menu4":
        return menuModal4
          ? " bg-purple-300 border-none  shadow-lg text-red-500  py-2 "
          : " bg-white border-none  shadow-lg shadow-white    py-2  ";
      // case "/admin/menu5":
      //   return menuModal5
      //     ? " bg-purple-300 border-none shadow-lg text-red-500  py-2"
      //     : " bg-white border-none  shadow-lg shadow-white    py-2 ";
      // default:
      //   return "text-white py-2";
    }
  };
  // --------------------------------------------------------------------------------------

  const openMenu1Modal = () => {
    if (!disableButtons) {
      checkActive();
      setMenuDal1(true);
      setMenuDal2(false);
      setMenuDal3(false);
      setMenuDal4(false);
      // setMenuDal5(false);
    }
  };
  const openMenu2Modal = () => {
    checkActive()
    setMenuDal1(false)
    setMenuDal2(true)
    setMenuDal3(false)
    setMenuDal4(false)
    // setMenuDal5(false);
  }
  const openMenu3Modal = () => {
    if (!disableButtons) {
      checkActive();
      setMenuDal1(false);
      setMenuDal2(false);
      setMenuDal3(true);
      setMenuDal4(false);
      // setMenuDal5(false);
    }
  };
  const openMenu4Modal = () => {
    if (!disableButtons) {
      checkActive();
      setMenuDal1(false);
      setMenuDal2(false);
      setMenuDal3(false);
      setMenuDal4(true);
      // setMenuDal5(false);
    }
  };
  // const openMenu5Modal = () => {
  //   if (!disableButtons) {
  //     checkActive();
  //     setMenuDal1(false);
  //     setMenuDal2(false);
  //     setMenuDal3(false);
  //     setMenuDal4(false);
  //     setMenuDal5(true);
  //   }
  // };

  return (
    <div className=" w-full flex flex-col lg:flex-row h-screen  ">
      <div className="flex w-full lg:flex-col  lg:w-[220px] lg:h-screen   ">
        <div className="w-full      flex  lg:flex-col   shadow-gray-600 shadow-lg lg:h-screen    ">

          <div className="flex w-[20%] sm:w-[30%]  flex-col  lg:flex-row lg:w-full justify-center md:justify-around align-middle items-center text-center  font-bold p-2  bg-gray-200">
            <div className=" w-full lg:h-[55px] sm:w-[59%] md:w-[25%] lg:w-[30%] flex justify-center md:justify-center text-center align-middle  items-center py-1">
              <img className="flex bg-cover w-full " src={logo} alt="logo" />
            </div>
            <div className="  hidden md:flex md:flex-col lg:flex-col justify-center items-center m-auto  text-center">
              <h1 className=" flex justify-center text-sm  ">
                ศาลเจ้าปึงเถ่า-กงม่า{" "}
              </h1>
              <h1 className=" flex  text-sm ">ขอนแก่น</h1>
            </div>
          </div>


          <div className="flex lg:flex-col  w-full justify-around ">
            <nav className="flex w-full lg:flex-col justify-around">
              <div
                onClick={() => openMenu1Modal()}
                className={`flex flex-col md:flex-row justify-center sm:justify-start text-center items-center  mt-3   mb-2 sm:mb-2 sm:pt-5    ${
                  disableButtons ? "cursor-no-drop" : "cursor-pointer"
                }${checkActive("/admin/menu1")}`}
              >
                <div>
                  <img
                    className=" mx-7 md:ms-5 md:mx-3   mb-2 md:mb-0 md:py-2 text-center  items-center justify-center "
                    src={menu1Logo}
                  />
                </div>
                <div className="text-xs md:text-base md:pr-5">หัวข้อประมูล</div>
              </div>
              <div
                onClick={() => openMenu2Modal()}
                className={`flex flex-col md:flex-row justify-center sm:justify-start text-center items-center  mt-3   mb-2 sm:mb-2 sm:pt-5    ${
                  disableButtons ? "cursor-no-drop" : "cursor-pointer"
                }${checkActive("/admin/menu2")}`}
              >
                <div>
                  <img
                    className=" mx-7 md:ms-5 md:mx-3   mb-2 md:mb-0 md:py-2 text-center  items-center justify-center "
                    src={menu2Logo}
                  />
                </div>
                <div className="text-xs md:text-base md:pr-5">เริ่มการประมูล</div>
              </div>
              <div
                onClick={() => openMenu3Modal()}
                className={`flex flex-col md:flex-row justify-center sm:justify-start text-center items-center  mt-3   mb-2 sm:mb-2 sm:pt-5    ${
                  disableButtons ? "cursor-no-drop" : "cursor-pointer"
                }${checkActive("/admin/menu3")}`}
              >
                <div>
                  <img
                    className=" mx-7 md:ms-5 md:mx-3   mb-2 md:mb-0 md:py-2 text-center  items-center justify-center "
                    src={menu3Logo}
                  />
                </div>
                <div className="text-xs md:text-base md:pr-5">ผู้ร่วมประมูล</div>
              </div>


              <div
                onClick={() => openMenu4Modal()}
                className={` flex flex-col md:flex-row justify-center sm:justify-start text-center  items-center  mt-3   mb-2 sm:mb-2 sm:pt-5   ${
                  disableButtons ? "cursor-no-drop" : "cursor-pointer"
                }${checkActive("/admin/menu4")}`}
              >
                <div>
                  <img
                    className=" mx-7  md:ms-5 md:mx-3   mb-3 md:mb-0 md:py-2 text-center  "
                    src={menu4Logo}
                  />
                </div>
                <div className="text-xs md:text-base md:ps-5 lg:ps-2 md:pr-5">รายงาน</div>
              </div>

              {/* <div
                onClick={() => openMenu5Modal()}
                className={` flex flex-col md:flex-row justify-center sm:justify-start text-center  items-center  mt-3   mb-2 sm:mb-2 sm:pt-5   ${
                  disableButtons ? "cursor-no-drop" : "cursor-pointer"
                }${checkActive("/admin/menu5")}`}
              >
                <div>
                  <img
                    className=" mx-7  md:ms-3 md:mx-3   mb-3 md:mb-0 md:py-2 text-center  "
                    src={menu5Logo}
                  />
                </div>
                <div className="text-xs md:text-base md:pr-5">ออกใบส่งของ</div>
              </div> */}
          
            </nav>
          </div>
        </div>
      </div>

      <div className="w-full sm:w-full md:w-full lg:w-[85%] ">
        {/* outlet-------------------------------------------- */}
        {/* <Outlet/> */}

        {/* modal---------------------------------------------- */}
        {menuModal1 && <Menu1 />}
        {menuModal2 && <Menu2 />}
        {menuModal3 && <Menu3 />}
        {menuModal4 && <Menu4 />}
        {/* {menuModal5 && <Menu5 />} */}
      </div>
    </div>
  );
}

export default Admin;
