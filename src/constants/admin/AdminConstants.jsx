import { AiOutlineMedicineBox } from "react-icons/ai";
import { BsNintendoSwitch } from "react-icons/bs";
import { CiViewList } from "react-icons/ci";
import { FaRegQuestionCircle } from "react-icons/fa";
import { GrTest, GrYoga } from "react-icons/gr";
import { LiaCapsulesSolid } from "react-icons/lia";
import { MdError, MdFamilyRestroom, MdFoodBank, MdOutlinePostAdd } from "react-icons/md";

export const masterButtons = [
    {
        id: "1",
        name: "List Franchise",
        icons: <CiViewList size={18} />,
        to: "list-franchise",
    },
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
        icons: <LiaCapsulesSolid
            size={18} />,
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
        name: "Family Reason",
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
        id: "10",
        name: "Weight Reason",
        icons: <MdOutlinePostAdd size={18} />,
        to: "weight-reason",
    },
    {
        id: "11",
        name: "Lab Tests",
        icons: <GrTest size={18} />,
        to: "lab-tests",
    },
];