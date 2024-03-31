/* eslint-disable react/prop-types */


function Chat({data}) {

    const difference = Math.round(Date.now() - new Date(data?.createdAt).getTime());
  let time;

  if (Math.abs(difference) < 1000 * 60 * 60) {
    time = Math.round(Math.abs(difference) / (1000 * 60)) + "m";
  } else if (Math.abs(difference) < 1000 * 60 * 60 * 24) {
    time = Math.round(Math.abs(difference) / (1000 * 60 * 60)) + "h";
  } else if (Math.abs(difference) < 1000 * 60 * 60 * 24 * 365) {
    time = Math.round(Math.abs(difference) / (1000 * 60 * 60 * 24)) + "d";
  } else {
    time = Math.round(Math.abs(difference) / (1000 * 60 * 60 * 24 * 365)) + "y";
  }


    const userData =JSON.parse(localStorage.getItem('userData'))


  return (
    <div className={userData.userId ===data?.senderId?._id ? "d-flex flex-row-reverse justify-content-start ":"d-flex flex-row justify-content-start "} >
    <img
      src={`http://localhost:3000/`+data?.senderId?.image}
      alt={data?.senderId?.userName}
      style={{ width: "30px", height: "30px" }}
    />
    <div className='d-flex flex-column'>
      <p
        className={userData.userId ===data?.senderId?._id ?"small px-2 mx-2 mb-0 rounded-3 bg-primary  text-white":"small px-2 mx-2 mb-0 rounded-3 text-dark"}
        style={{ backgroundColor: "#acaeafb7" }}
      >
        {data?.message}
      </p>
      
      <h6 className={userData.userId ===data?.senderId?._id ?"small ms-3 me-2 mb-3 rounded-3 text-muted d-flex justify-content-end":"small ms-2 mb-3  rounded-3 text-muted d-flex justify-content-start"}>
        {time}
      </h6>
    </div>
  </div>
  )
}

export default Chat