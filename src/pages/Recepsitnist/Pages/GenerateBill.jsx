import React, { useState, useEffect } from "react";
import axios from "axios";

export default function GenerateBill() {
  const [medicine, setMedicine] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleMedicineList = () => {};
  const handleSearchTerm = (value) => {
    setSearchTerm(value);
  };
  return (
    <div className="w-full p-5">
      <div className="rounded-lg bg-card h-[90vh] bg-white">
        <div className="flex flex-col px-4 py-3 h-full space-y-4">
          <div>
            <div className="text-xl font-semibold">Generate Bill</div>
            <div className="w-full flex justify-center p-4 shadow-gray-400 shadow-inner border rounded-md border-gray-100 animate-once animate-ease-out overflow-auto h-[93%]">
              <div className="flex gap-5 p-2 w-full">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => handleSearchTerm(e.target.value)}
                  placeholder="search case number"
                  className="py-1 px-2 rounded-md border border-black w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
