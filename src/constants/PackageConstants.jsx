import { AiOutlineMedicineBox } from "react-icons/ai";
import { BsNintendoSwitch } from "react-icons/bs";
import {
  FaRegQuestionCircle,
  FaRegThumbsDown,
  FaRegThumbsUp,
} from "react-icons/fa";
import { GoHistory } from "react-icons/go";
import { GrTest, GrYoga } from "react-icons/gr";
import { LiaCapsulesSolid, LiaProceduresSolid } from "react-icons/lia";
import { LuPackagePlus } from "react-icons/lu";
import {
  MdError,
  MdFamilyRestroom,
  MdFoodBank,
  MdOutlinePictureAsPdf,
  MdOutlinePostAdd,
} from "react-icons/md";
import { TbReport } from "react-icons/tb";

export const reportButtons = [
  //   {
  //     id: "1",
  //     name: "Profile",
  //     icons: <CiViewList size={18} />,
  //     to: "profile",
  //   },
  {
    id: "2",
    name: "Questions",
    icons: <FaRegQuestionCircle size={18} />,
    to: "questions",
  },
  {
    id: "3",
    name: "Past History",
    icons: <GoHistory size={18} />,
    to: "past-history",
  },
  {
    id: "4",
    name: "Treatment",
    icons: <LiaProceduresSolid size={18} />,
    to: "treatment/medicine",
  },
  {
    id: "5",
    name: "Lab Tests",
    icons: <GrTest size={18} />,
    to: "lab-tests",
  },
  {
    id: "6",
    name: "Package",
    icons: <LuPackagePlus size={18} />,
    to: "package",
  },
  {
    id: "7",
    name: "Progress Report",
    icons: <TbReport size={18} />,
    to: "progress-report",
  },
  // {
  //   id: "8",
  //   name: "Generate Report",
  //   icons: <MdOutlinePictureAsPdf size={18} />,
  //   to: "generate-report",
  // },
];
