import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {

  const [emailId,setEmailId] = useState("");
  const [password,setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [isLoginForm, setIsLoginForm] = useState(true);

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

  const handleSignUp = async () => {
    try{
      const res = await axios.post(BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password
        },
        {withCredentials : true}
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");//user should create their profile after signup
    }catch(err) {
      setError(err?.response?.data || "Something went wrong!");
      console.log(err);
    }
  };

  return (
    <div className="grid grid-cols-6 mt-10">
      <div className="col-start-2 col-span-4 card lg:card-side bg-base-200 shadow-xl">
        <img
          className="bg-cover rounded-t-xl lg:rounded-l-xl lg:rounded-tr-none"
          src={isLoginForm ? "https://static.designboom.com/wp-content/uploads/2024/06/vincent-van-gogh-starry-night-over-rhone-arles-exhibition-stars-designboom-500.jpeg" : 
            "https://beyondvangogh.com/wp-content/uploads/2024/04/Van-Gogh-Home-775x520.jpg"
          }
          width={600}
          height={700}
          alt="Album" />
        <div className="card-body grid grid-cols-8">
          <div className="col-start-2 col-span-6">
            <div className="card-title justify-center text-2xl font-bold my-3">{isLoginForm ? "LOGIN" : "SIGNUP"}</div>
            <div className="flex-col ">

                {!isLoginForm && <><label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text text-lg">First Name</span>
                  </div>
                  <input 
                    value={firstName} 
                    type="text" 
                    placeholder="" 
                    className="input input-bordered w-full max-w-xs" 
                    onChange = {(e) => setFirstName(e.target.value)}
                  />
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text text-lg">Last Name</span>
                  </div>
                  <input 
                    value={lastName} 
                    type="text" 
                    placeholder="" 
                    className="input input-bordered w-full max-w-xs" 
                    onChange = {(e) => setLastName(e.target.value)}
                  />
                </label></>}

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text text-lg">Email</span>
                  </div>
                  <input 
                    value={emailId} 
                    type="text" 
                    placeholder="" 
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
                    placeholder="" 
                    className="input input-bordered w-full max-w-xs" 
                    onChange = {(e) => setPassword(e.target.value)}
                  />
                </label>

                <p className="text-red-500">{error}</p>
                <div className="my-6">
                  <button 
                    className="btn btn-secondary w-full max-w-xs my-2"
                    onClick={isLoginForm ? handleLogin : handleSignUp}
                  >{isLoginForm ? "Login" : "Sign Up"}</button>
                </div>
            </div>
            <p className="m-auto cursor-pointer py-2 hover:underline hover:text-blue-600" onClick={() => setIsLoginForm(!isLoginForm)}>
                  {isLoginForm ? "New User? Signup here " : "Existing User? Login Here"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
