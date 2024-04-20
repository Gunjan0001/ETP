import React from "react";
import deleteicon from "../assets/images/svg/delete.svg";
const DeletePage = (props) => {
  const { statuspopup, handledelete } = props;
  function handlecancelpopup() {
    statuspopup(false);
  }
  function handleDeleteproject() {
    handledelete();
    handlecancelpopup();
  }

  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-30 z-[100]">
        <div className="py-5 px-[30px] w-[600px] mx-auto bg-white rounded-md">
          <div className="flex flex-col justify-center items-center">
            <img className="cursor-pointer " src={deleteicon} alt="delete" />
            <p className="ff-outfit text-[35px] font-medium ">Delete Project?</p>
            <p className="ff-outfit font-normal text-lg text-[#ACACAC] ">
              Are you sure you want to delete the Project permanently ?
            </p>
            <div className=" w-full flex items-center gap-5">
              <button
                onClick={handlecancelpopup}
                class="rounded-lg border border-solid border-red-600 border-1.5 w-1/2 py-3 px-4 mt-5 ff-outfit  text-base font-normal bg-gradient-to-r from-red-900 via-red-600 to-orange-500 text-transparent bg-clip-text"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteproject}
                class="rounded-lg bg-gradient-to-r from-red-900 via-red-600 to-orange-500 border border-solid  w-1/2 py-3 px-4 mt-5 ff-outfit  text-base font-normal text-white "
              >
                
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeletePage;
