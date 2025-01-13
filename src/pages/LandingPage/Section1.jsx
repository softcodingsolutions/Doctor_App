import image14 from "./../../assets/images/image14.png";

function Section1() {
  const renderContent = (image, text1, text2, text3, text4, key) => (
    <div key={key} className="relative h-full w-full">
      <div className="relative h-full w-full aspect-w-16 aspect-h-9">
        <img
          src={image}
          alt={key}
          className="object-cover w-full h-full opacity-90"
        />
      </div>
      <div
        className={`absolute text-gray-900 top-1/3 left-[200px] transform -translate-y-1/2 space-y-4 ${
          text1 === "Our " ||
          text1 === "Successful " ||
          text1 === "Personalized "
            ? "left-4 sm:left-16"
            : "right-4 sm:right-16"
        } bg-opacity-50`}
      >
        <div
          key={`${key}-1`}
          className="text-3xl sm:text-5xl lg:text-7xl font-semibold font-architects"
        >
          {text1} <span className="text-green-500">{text2}</span>
        </div>
        <div key={`${key}-2`} className="font-sans space-y-2">
          <div className="text-xl sm:text-3xl lg:text-4xl font-semibold">
            {text3}
          </div>
          <div className="text-sm sm:text-lg lg:text-2xl w-full text-green-500  sm:w-3/4">
            {text4}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center  h-screen overflow-hidden">
      {renderContent(
        image14,
        "Weight",
        "Loss",
        "Ayurvedic Treatments",
        "We provide 100% Ayurvedic FDA Approved Medicines for Weight Loss."
      )}
      {/* {renderContent(
        image2,
        "Personalized ",
        "Diet",
        "Just For You",
        "Make your own Password to Lose your Own Weight - Because you are different!"
      )}
      {renderContent(
        image3,
        "Experienced ",
        "Experts",
        "To Help You",
        "We have been helping patients lose weight using authentic methods with no side effects!"
      )}
      {renderContent(
        image4,
        "Successful ",
        "Results",
        "For 21 Years",
        "Till date we have helped over 10,000 patients successfully lose weight, with 57 Kgs being the maximum weight loss in a single patient."
      )}
      {renderContent(
        image5,
        "Our ",
        "Presence",
        "Across Gujarat",
        "We have 6 clinics across Gujarat providing online consultations worldwide to help overweight patients."
      )} */}
    </div>
  );
}

export default Section1;
