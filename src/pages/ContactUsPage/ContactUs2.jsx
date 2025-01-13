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
      icon: <IoCall size={25} />,
    },
    {
      id: 2,
      type: "Email Us",
      contact: "inquiry@slimandsmile.com",
      action: "mailto:inquiry@slimandsmile.com",
      icon: <MdOutlineEmail size={25} />,
    },
  ];

  return (
    <div className="w-full bg-gray-50 py-12 px-4 md:px-20">
      {/* Location Section */}
      <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-10">
        {data.map((res) => (
          <div
            className="flex flex-col items-center text-center border border-gray-200 bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-transform duration-200 ease-out transform hover:scale-105"
            key={res.id}
          >
            <FaLocationDot size={30} className="text-red-500" />
            <h3 className="font-semibold text-lg lg:text-xl mt-3 text-gray-800">
              {res.city}
            </h3>
            <p className="text-sm lg:text-base text-gray-600">{res.address}</p>
          </div>
        ))}
      </div>

      {/* Contact Section */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-10">
        {data2.map((res) => (
          <div
            key={res.id}
            onClick={() => (window.location.href = res.action)}
            className="flex items-center gap-4 p-4 rounded-md transition-transform duration-150 ease-in-out transform hover:scale-105 hover:bg-gray-100 cursor-pointer shadow-sm hover:shadow-lg"
          >
            <div className="text-blue-500">{res.icon}</div>
            <div>
              <h3 className="font-semibold text-lg lg:text-xl text-gray-800">
                {res.type}
              </h3>
              <p className="text-sm lg:text-base text-gray-600">{res.contact}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContactUs2;
