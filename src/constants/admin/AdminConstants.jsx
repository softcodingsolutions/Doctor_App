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
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { TbReport } from "react-icons/tb";

export const masterButtons = [
  {
    id: "2",
    name: "Questions",
    icons: <FaRegQuestionCircle size={18} />,
    to: "questions",
  },
  {
    id: "3",
    name: "Medicines",
    icons: <AiOutlineMedicineBox size={18} />,
    to: "medicine",
  },
  {
    id: "10",
    name: "Weight Reason",
    icons: <MdOutlinePostAdd size={18} />,
    to: "weight-reason",
  },
  {
    id: "4",
    name: "Diet",
    icons: <MdFoodBank size={18} />,
    to: "diet",
  },
  {
    id: "5",
    name: "Exercise / Yoga",
    icons: <GrYoga size={18} />,
    to: "exercise-yoga",
  },
  {
    id: "6",
    name: "Nutrition / Supplements",
    icons: <LiaCapsulesSolid size={18} />,
    to: "nutrition-supplements",
  },
  {
    id: "7",
    name: "Dos / Don'ts",
    icons: <BsNintendoSwitch size={18} />,
    to: "dos-donts",
  },
  {
    id: "8",
    name: "Family History",
    icons: <MdFamilyRestroom size={18} />,
    to: "family-reason",
  },
  {
    id: "9",
    name: "Complains",
    icons: <MdError size={18} />,
    to: "complains",
  },
  {
    id: "11",
    name: "Lab Tests",
    icons: <GrTest size={18} />,
    to: "lab-tests",
  },
  {
    id: "12",
    name: "Packages",
    icons: <LuPackagePlus size={18} />,
    to: "packages",
  },
];

export const reportButtons = [
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
    name: "View Patient",
    icons: <LuPackagePlus size={18} />,
    to: "/franchise/patients/customer-details/progress-questions",
  },
  // {
  //   id: "7",
  //   name: "Progress Report",
  //   icons: <TbReport size={18} />,
  //   to: "progress-report",
  // },
  // {
  //   id: "8",
  //   name: "Generate Report",
  //   icons: <MdOutlinePictureAsPdf size={18} />,
  //   to: "generate-report",
  // },
];

export const packagesButton = [
  //   {
  //     id: "1",
  //     name: "Profile",
  //     icons: <CiViewList size={18} />,
  //     to: "profile",
  //   },
  {
    id: "21",
    name: "Questions",
    icons: <FaRegQuestionCircle size={18} />,
    to: "progress-questions",
  },
  {
    id: "22",
    name: "Complains",
    icons: <MdError size={18} />,
    to: "progress-complains",
  },
  {
    id: "23",
    name: "Package",
    icons: <LuPackagePlus size={18} />,
    to: "package",
  },
  {
    id: "24",
    name: "Progress Report",
    icons: <TbReport size={18} />,
    to: "progress-report",
  },
  {
    id: "25",
    name: "Assigned Medicines",
    icons: <LiaProceduresSolid size={18} />,
    to: "package-medicine",
  },
  {
    id: "26",
    name: "Bill History",
    icons: <GoHistory size={18} />,
    to: "admin-bill-history",
  },
  {
    id: "27",
    name: "Analysis",
    icons: <TbBrandGoogleAnalytics size={18} />,
    to: "patient-analysis",
  },
  // {
  //   id:"20",
  //   name:"Complains",
  //   icons:  <MdError size={18} />,
  //   to: "user-complains",
  // }
  {
    id: "28",
    name: "Generate Report",
    icons: <MdOutlinePictureAsPdf size={18} />,
    to: "generate-report",
  },
];

export const reportTreatmentButtons = [
  {
    id: "1",
    name: "Medicines",
    icons: <AiOutlineMedicineBox size={18} />,
    to: "medicine",
  },
  {
    id: "2",
    name: "Diet",
    icons: <MdFoodBank size={18} />,
    to: "diet",
  },
  {
    id: "3",
    name: "Nutrition",
    icons: <LiaCapsulesSolid size={18} />,
    to: "nutrition",
  },
  {
    id: "4",
    name: "Exercise / Yoga",
    icons: <GrYoga size={18} />,
    to: "exercise",
  },
  {
    id: "5",
    name: "Dos",
    icons: <FaRegThumbsUp size={18} />,
    to: "dos",
  },
  {
    id: "6",
    name: "Don'ts",
    icons: <FaRegThumbsDown size={18} />,
    to: "donts",
  },
];
