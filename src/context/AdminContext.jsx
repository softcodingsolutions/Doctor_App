import { createContext, useContext, useState } from "react";

const AdminContext = createContext({
  selectedItem: "dashboard",
  setSelectedItem: () => {},
  selectedMasterButton: "list-franchise",
  setSelectedMasterButton: () => {},
});

export const AdminProvider = ({ children }) => {
  const [selectedItem, setSelectedItem] = useState("dashboard");
  const [selectedMasterButton, setSelectedMasterButton] =
    useState("list-franchise");

  return (
    <AdminContext.Provider
      value={
        (selectedItem,
        setSelectedItem,
        selectedMasterButton,
        setSelectedMasterButton)
      }
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminState = () => useContext(AdminContext);
