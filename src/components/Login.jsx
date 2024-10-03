import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {

  const [emailId,setEmailId] = useState("userB@gmail.com");
  const [password,setPassword] = useState("Abcd@123");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try{
      const res = await axios.post(BASE_URL + "/login",{
        emailId,
        password,
      }, {
        withCredentials : true
      });
      dispatch(addUser(res.data));
      return navigate("/");
    }catch(err){
      setError(err?.response?.data || "Something went wrong!");
      console.log(err);
    }
  };

  return (
    <div className="grid grid-cols-6 mt-10">
      <div className="col-start-2 col-span-4 card lg:card-side bg-base-200 shadow-xl">
        <img
          className="bg-cover rounded-t-xl lg:rounded-l-xl lg:rounded-tr-none"
          src="https://static.designboom.com/wp-content/uploads/2024/06/vincent-van-gogh-starry-night-over-rhone-arles-exhibition-stars-designboom-500.jpeg"
          alt="Album" />
        <div className="card-body grid grid-cols-8">
          <div className="col-start-2 col-span-6">
            <div className="card-title justify-center text-2xl font-bold my-3">LOGIN</div>
            <div className="flex-col ">
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text text-lg">Email</span>
                  </div>
                  <input 
                    value={emailId} 
                    type="text" 
                    placeholder="Type here" 
                    className="input input-bordered w-full max-w-xs" 
                    onChange = {(e) => setEmailId(e.target.value)}
                  />
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text text-lg">Password</span>
                  </div>
                  <input 
                    value={password} 
                    type="text" 
                    placeholder="Type here" 
                    className="input input-bordered w-full max-w-xs" 
                    onChange = {(e) => setPassword(e.target.value)}
                  />
                </label>
                <p className="text-red-500">{error}</p>
                <div className="flex justify-center my-6">
                  <button 
                    className="btn btn-secondary w-1/2"
                    onClick={handleLogin}
                  >Login</button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
