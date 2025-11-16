import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({user}) => {
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const {_id, firstName, lastName, photoUrl, age, gender, about, skills} = user;

  const handleSendRequest = async (status, userId) => {
    try{
      const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        {withCredentials :true}
      );
      dispatch(removeUserFromFeed(userId))
    } catch(err) {
      setError(err?.response?.data || "Something went wrong!");
      console.log(err);
    }
  };
     
  return (
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
            <div className="card-actions justify-center my-4 gap-4">
              <button className="btn btn-primary" onClick={() => handleSendRequest("ignored", _id)}>Ignore</button>
              <button className="btn btn-secondary" onClick={() => handleSendRequest("interested", _id)}>Send Request</button>

            </div>
          </div>
        </div>
    </div>
  )
}

export default UserCard
