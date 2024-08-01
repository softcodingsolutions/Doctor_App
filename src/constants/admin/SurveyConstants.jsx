import { CiViewList } from "react-icons/ci";
import { FaRegQuestionCircle } from "react-icons/fa";
import { MdOutlinePostAdd } from "react-icons/md";
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
];
