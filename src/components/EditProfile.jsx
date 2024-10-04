import { useState } from "react";
import UserCard from "./UserCard";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";


const EditProfile = ({user}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [age, setAge] = useState(user.age || "");
    const [gender, setGender] = useState(user.gender || "");
    const [about, setAbout] = useState(user.about || "");
    const [error, setError] = useState("");
    const [skills, setSkills] = useState(user.skills || []);
    const [showToast,setShowToast] = useState(false);

    const saveProfile = async () => {
        setError("");  
        try{
            const res = await axios.patch(BASE_URL + "/profile/edit",{firstName,lastName,photoUrl,age,gender,about},{withCredentials : true});
            dispatch(addUser(res?.data?.data));
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            },3000)
        }catch(err){
            setError(err?.response?.data || "Something went wrong!");
            navigate("/error");
        }
    }

  return (
    <>
        <div className="flex justify-center my-10 gap-10">
        <div className="flex justify-center">
          <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl">Edit Profile</h2>
          <div>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text text-lg">First Name</span>
              </div>
              <input
                type="text"
                value={firstName}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text text-lg">Last Name</span>
              </div>
              <input
                type="text"
                value={lastName}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text text-lg">PhotoURL</span>
              </div>
              <input
                type="text"
                value={photoUrl}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text text-lg">Age</span>
              </div>
              <input
                type="text"
                value={age}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setAge(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text text-lg">Gender</span>
              </div>
              <select className="select select-bordered w-full max-w-xs" onChange={(e) => setGender(e.target.value)} value={gender}>
                  <option>male</option>
                  <option>female</option>
                  <option>others</option>
                </select>
            </label>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text text-lg">About</span>
              </div>
              <textarea
                value={about}
                className="textarea textarea-bordered textarea-md w-full max-w-xs"
                onChange={(e) => setAbout(e.target.value)}
              >
              </textarea>
            </label>
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center m-2">
            <button className="btn btn-secondary text-lg" onClick={saveProfile}>Save Profile</button>
          </div>
        </div>
          </div>
        </div>
        {/* <UserCard user = {{firstName, lastName, photoUrl, age, gender, about}}/> */}
        <div>
        <div className="card card-compact bg-base-100 w-96 shadow-xl">
          <figure>
            <img
              src={photoUrl} alt="photo" />
          </figure>
          <div className="card-body">
            <div className="card-title text-2xl">{firstName + " " + lastName}</div>
            <div className="text-lg">{age && gender && <p>{age + " " + gender}</p>}</div>
           <div className="flex flex-wrap my-1">
                {skills && skills.map((skill) => <div className="badge badge-accent mr-2">{skill}</div>)}
           </div>
            <p>About Me: {about}</p>
          </div>
        </div>
        </div>
        </div>
        {showToast && <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile Saved Successfully!</span>
          </div>
        </div>}
    </>
  )
}

export default EditProfile
