import React, { useState } from "react";
import axios from "axios";

function Setting() {
  const user_id = localStorage.getItem("main_id");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    const formdata = new FormData();
    formdata.append("old_password", oldPassword);
    formdata.append("new_password", newPassword);
    formdata.append("user_id", user_id);
    try {
      const response = await axios.put(
        "/api/v1/users/reset_password",
        formdata
      );

      if (response.data.success) {
        setSuccess("Password changed successfully.");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setError(response.data.message || "Error changing password.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col  items-center justify-center w-full ">
      <div className="border flex flex-col items-center rounded-md p-4 w-[30rem]">
        <div className="flex flex-col w-96">
          <label className="flex justify-start text-xl font-bold ">
            Change Password
          </label>
          <span className="text-sm text-gray-600 ">
            Update your password to keep your account secure.
          </span>
        </div>

        <form onSubmit={handleChangePassword} className="space-y-6 mt-5 w-96 ">
          <div className="w-full">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Current Password
            </label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={oldPassword}
              placeholder="Enter your current password"
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </div>
          <div className="w-full">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              New Password
            </label>
            <input
              type="password"
              className=" w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={newPassword}
              placeholder="create unique new password"
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="w-full">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              className=" w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={confirmPassword}
              placeholder="confirm your new password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-2 rounded-lg font-semibold shadow-md hover:bg-green-700 transition"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default Setting;
