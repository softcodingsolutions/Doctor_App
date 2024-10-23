import { FaLocationDot } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";

function ContactUs2() {
  const data = [
    {
      id: 1,
      city: "Ahmedabad",
      address:
        "634/ Solaris Business Hub, Opp Parshwnath Jain Temple, Bhuyangdev Cross Road, Bhuyangdev, Ahmedabad-380052",
    },
    {
      id: 2,
      city: "Mehsana",
      address:
        "A4, K B Complex, Near Lalbhai Hospital, Gopinala, Mehsana-384001",
    },
    {
      id: 3,
      city: "Kalol",
      address:
        "Opp. Shreeji Parlor Panchvati Plaza, Near Nana Garnala Highway, Kalol",
    },
    {
      id: 4,
      city: "Anand",
      address:
        "1st Floor, Municipal Shopping Center, Above Santram Medical, Mayfair Road, Anand-388001",
    },
    {
      id: 5,
      city: "Bhuj",
      address:
        "Parmarth Anorectal Hospital, Opp. Rajaram Complex, Hospital Road, Bhuj - 370001",
    },
    {
      id: 6,
      city: "Gandhidham",
      address:
        "Dr. Shrinath Goswami Hospital, Opposite Kutchuday Office, Near Oslo Circle, Gandhidham - 370201",
    },
  ];

  const data2 = [
    {
      id: 1,
      type: "Call Us",
      contact: "+91 99 2549 0091",
      action: "tel:+919925490091",
      icon : <IoCall size={25}/>,
    },
    {
      id: 2,
      type: "Email Us",
      contact: "inquiry@slimandsmile.com",
      action: "mailto:inquiry@slimandsmile.com",
      icon : <MdOutlineEmail size={25}/>,
    },
  ];

  return (
    <div className=" w-full bg-orange-50">
      <div className="px-4 md:px-20 py-10">
        <div className="w-full grid grid-cols-2 lg:grid-cols-3 justify-center lg:gap-10 gap-2 rounded-md">
          {data.map((res) => (
            <div
              className="flex flex-col items-center text-center border border-gray-300 bg-white shadow-lg rounded-lg p-5 hover:scale-105 cursor-default transition-transform gap-1.5 w-full sm:w-[22rem] h-[12rem]"
              key={res.id}
            >
              <div>
                <FaLocationDot size={25} />
              </div>
              <div className="font-semibold lg:pt-2 pt-0 text-sm lg:text-xl tracking-wide">
                {res.city}
              </div>
              <div className="text-sm md:text-base">{res.address}</div>
            </div>
          ))}
          {data2.map((res) => (
            <div
              className="flex flex-col items-center text-center border border-gray-300 bg-white shadow-lg rounded-lg p-5 hover:scale-105 cursor-pointer transition-transform gap-1.5 w-full sm:w-[22rem] h-[9rem]"
              key={res.id}
              onClick={() => (window.location.href = res.action)}
            >
              <div>
                {res.icon}
              </div>
              <div className="font-semibold pt-2 text-lg md:text-xl tracking-wide">
                {res.type}
              </div>
              <div className="text-sm md:text-base">{res.contact}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ContactUs2;
