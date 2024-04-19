import React, { useState } from 'react'
import AddNew from '../../../components/AddNew';
import { FaCircleArrowRight } from 'react-icons/fa6';

function ListFranchise() {
    const [isOpen, setIsOpen] = useState(false);

    const handleAdd = () => {
      setIsOpen(true);
    };
  
    return (
      <div className="w-full p-2">
        <div className="rounded-lg bg-card h-[85vh] bg-white overflow-auto">
          <div className="flex p-4 h-full flex-col">
            <div className="">
              <div className="flex items-center">
                <div className="font-semibold text-xl">List of franchise</div>
                <div className="flex-grow" />
  
                {isOpen ? (
                  <div className="animate-fade-left animate-delay-100 animate-once animate-ease-out sm:w-[45%] md:w-[31%] w-[90%] border border-gray-400 border-r-0 rounded-tl-[2rem] rounded-bl-[2rem] absolute top-[12rem] right-10 xl:top-[5rem] sm:top-[8rem] xl:right-10 sm:right-10 h-[82vh] bg-[#dfdbda] shadow-md z-50">
                    <button
                      onClick={() => setIsOpen(false)}
                      className={`mx-3 my-3 `}
                    >
                      <FaCircleArrowRight size={38} />
                    </button>
                    <AddNew />
                  </div>
                ) : (
                  <div className="animate-fade-right animate-duration-[700ms] animate-once animate-ease-out flex flex-col z-50 absolute right-10 xl:top-20 sm:top-32 xs:top-44 py-3.5">
                    <button
                      className="border border-black hover:bg-black hover:text-white p-1.5 rounded-md"
                      onClick={handleAdd}
                    >
                      Add Franchise
                    </button>
                  </div>
                )}
              </div>
            </div>
  
            <div className="flex-grow"></div>
          </div>
        </div>
      </div>
    );
}

export default ListFranchise