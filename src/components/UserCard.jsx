
const UserCard = ({user}) => {
    const {firstName, lastName, photoUrl, age, gender, about, skills} = user;
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
              <button className="btn btn-primary">Ignore</button>
              <button className="btn btn-secondary">Send Request</button>

            </div>
          </div>
        </div>
    </div>
  )
}

export default UserCard
