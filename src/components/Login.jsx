
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate()

  const [errorMessage,setErrorMessage] = useState("")
  const [userLogin, setUserLogin] = useState({
    username: "",
    password: "",
  });

  // useEffect(() => {
  //   const storedUserLogin = localStorage.getItem("userLogin");
  //   if (storedUserLogin) {
  //     setUserLogin(JSON.parse(storedUserLogin));
  //   }
  // }, []);
  // -------------------------------------------------------
  
  // check have Token to /admin

  useEffect(() => {
    const storedUserLogin = localStorage.getItem("userLogin");
    if (storedUserLogin) {
      setUserLogin(JSON.parse(storedUserLogin));
    }

    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      navigate("/admin");
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    setUserLogin({
        ...userLogin,
        [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post(
        "https://bankcash1.herokuapp.com/login",
        {
          username: userLogin.username,
          password: userLogin.password,
        },      
        { headers: { 
          "Content-Type": "application/json",
          // Authorization: `Token ${token}`
        },
      }
      );
      // console.log(response)

      // ตรวจสอบผลลัพธ์ที่ได้จากเว็บเซิร์ฟเวอร์
      if (response.data.check === "1"  ) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/admin");
      } if (response.data.check === "0" ) {
        navigate("/board")

      } else {
        setErrorMessage("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการส่งคำขอ:", error);
      setErrorMessage("เชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 min-h-screen">
      <div className="w-full max-w-xs bg-white rounded-lg shadow-lg ">
          <div className="mb-6 mt-7 text-center w-full  font-bold text-lg text-indigo-800 " >
            <p className="">ระบบประมูลศาลเจ้า</p>
            <p>ปึงเถ่า-กงม่า</p>
          </div>
        <form className="px-8  pb-8 py-5" onSubmit={handleSubmit}>
          <div>
            <h1 className=" text-gray-700 mb-3">ชื่อผู้ใช้ :</h1>
          </div>
          <div className="mb-6">
            <input
              className="w-full px-3 py-2 text-sm leading-tight text-gray-700 bg-gray-50 border rounded-lg  shadow-lg appearance-none focus:outline-none focus:shadow-outline"
              id="username"
              name="username"
              type="text"
              placeholder="ป้อนชื่อผู้ใช้งาน"
              value={userLogin.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-6">
          <div>
            <h1 className="text-gray-700 mb-3">รหัสผ่าน :</h1>
          </div>
            <input
              className="w-full px-3 py-2  text-sm leading-tight text-gray-700 bg-gray-50 border rounded-lg shadow-lg appearance-none focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              name="password"
              placeholder="ป้อนรหัสผ่าน"
              value={userLogin.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-12 ">
            {errorMessage && (
              <p className=" text-red-600 text-sm">{errorMessage}</p>
            )}
          </div>

          <div className="  text-center  justify-center align-middle">
            <button
              className=" w-[70%] px-5 py-2 font-bold  text-white shadow-lg bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:shadow-outline"
              type="submit"
            >
              เข้าสู่ระบบ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
