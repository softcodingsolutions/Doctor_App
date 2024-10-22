import { useState, useEffect } from "react";
import img1 from "../../assets/images/result01.jpg";
import img2 from "../../assets/images/result02.jpg";
import img3 from "../../assets/images/result03.jpg";
import img4 from "../../assets/images/result04.jpg";

const cardContents = [
  {
    id: 1,
    details:
      "A weight loss of 57 kg (from 137 kg to 80 kg) achieved by one patient at Slim and Smile Ayu Care is one of our many successful outcomes.",
    src: img1,
  },
  {
    id: 2,
    details:
      "Dr. Manish Patel of Slim and Smile Ayu Care lost 30 kg and has successfully maintained the weight loss for over 15 years without regaining it.",
    src: img2,
  },
  {
    id: 3,
    details:
      "Successful weight loss of 30 kg, along with maintaining the weight loss through our Ayurvedic treatments and carefully crafted reverse diet plans.",
    src: img3,
  },
  {
    id: 4,
    details:
      "Weight loss journey from 81 kg to 69 kg, guided by Slim and Smile Ayu Care, with no side effects or weakness felt throughout the entire transformation.",
    src: img4,
  },
];

function WeightLoss6() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Use useEffect for automatic looping
  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex === cardContents.length - 1 ? 0 : prevIndex + 1));
    }, 5000); // Change the interval as needed (in milliseconds)

    return () => clearInterval(intervalId); // Cleanup function to prevent memory leaks
  }, []);

  return (
    <div className="flex flex-col items-center bg-gray-100 py-10">
      <h2 className="text-3xl font-bold mb-6">What Our Clients Say</h2>
      <div className="relative w-full max-w-[62rem] mx-auto overflow-hidden">
        {/* Display only the currently active testimonial */}
        <div key={cardContents[activeIndex].id}>
          <div className="flex items-center w-full p-4 bg-white shadow-lg rounded-lg">
            <img
              src={cardContents[activeIndex].src}
              alt={`Result ${cardContents[activeIndex].id}`}
              className="w-1/3 h-auto rounded-lg mr-4 co"
            />
            <div className="w-2/3">
              <p className="text-gray-700 italic">"{cardContents[activeIndex].details}"</p>
              <p className="text-gray-900 font-semibold mt-2">Success Story {cardContents[activeIndex].id}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeightLoss6;