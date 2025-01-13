import { CiViewList } from "react-icons/ci";
import { FaRegQuestionCircle } from "react-icons/fa";
import { MdOutlinePostAdd } from "react-icons/md";
import { GrYoga } from "react-icons/gr";
import { AiFillStop } from "react-icons/ai";
import { BsNintendoSwitch } from "react-icons/bs";

export const masterButtons = [
  {
    id: "1",
    name: "Health Problem",
    icons: <CiViewList size={18} />,
    to: "health-problem",
  },
  {
    id: "2",
    name: "Weight Gain Question",
    icons: <FaRegQuestionCircle size={18} />,
    to: "weight-gain-reason",
  },
  {
    id: "3",
    name: "Weight Gain Reason",
    icons: <MdOutlinePostAdd size={18} />,
    to: "weight-gain-name",
  },
  {
    id: "4",
    name: "Dos",
    icons: <BsNintendoSwitch size={18} />,
    to: "survey-dos",
  },
  {
    id: "5",
    name: "Donts",
    icons: <AiFillStop size={18} />,
    to: "survey-donts",
  },
  {
    id: "6",
    name: "Exercise",
    icons: <GrYoga size={18} />,
    to: "survey-exercise",
  },
];
