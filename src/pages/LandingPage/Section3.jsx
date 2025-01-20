import { useState } from "react";

function Section3() {
  const cardContents = [
    {
      id: 1,
      title: "Obesity & Stress",
      content:
        "Stress can play havoc with usual bodily metabolism, with weight gain often being the unfortunate result. Slim and Smile Ayu Care can help you combat this condition in a variety of different ways.",
    },
    {
      id: 2,
      title: "Obesity & PCOD",
      content:
        "Polycystic ovary disease (PCOD) is when female hormones end up being imbalanced. Typically seen in women of reproductive age, this frequently leads to disproportionate weight gain. We offer suitable treatment for this.",
    },
    {
      id: 3,
      title: "Obesity & Hypothyroidism",
      content:
        "Hypothyroidism is when the thyroid gland does not produce adequate thyroid hormone. While there are many different symptoms of hypothyroidism, weight gain is unfortunately one of them. We do help immensely on this front.",
    },
    {
      id: 4,
      title: "Obesity & Hypertension",
      content:
        "Excess body weight results in Hypertension in many cases; that eventually results in subsequent complications like heart disease and stroke. Slim and Smile Ayu Care helps on this front with customized weight loss treatments to help you reduce weight thus reducing possibilities of hypertension and its complications.",
    },
    {
      id: 5,
      title: "Obesity & Diabetes Mellitus",
      content:
        "Diabetes Mellitus (DM) is when the pancreas does not produce adequate insulin for the body to assimilate sugar suitably; with blood sugar going haywire. Weight gain and DM have a symptomatic relationship. The key is to maintain ideal body weight. We offer various treatment solutions on this front.",
    },
    {
      id: 6,
      title: "Obesity & Menopause",
      content:
        "The onset of menopause often leads to obesity in a lot of middle-aged women. Slim and Smile Ayu Care has suitable treatments for this condition.",
    },
  ];

  const [selectedCardId, setSelectedCardId] = useState(1);

  const handleMouseEnter = (id) => {
    setSelectedCardId(id);
  };

  const selectedCard = cardContents.find((card) => card.id === selectedCardId);

  return (
    <div
      className="flex flex-col items-center py-7"
      // style={{
      //   backgroundImage: `url(${image15})`,
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      // }}
    >
      <div className="flex flex-col items-center text-center mb-6">
        <div className="sm:text-lg lg:text-2xl font-sans font-medium">
          Special Treatments for Obesity
        </div>
        <div className="border-[2.5px] rounded-md border-teal-200 w-20 mt-3" />
      </div>

      <div className="grid  lg:grid-cols-2 grid-cols-1 justify-center w-full">
        {/* Button Section */}
        <div className="flex flex-col gap-4 p-2">
          {cardContents.map((card) => (
            <button
              key={card.id}
              onMouseEnter={() => handleMouseEnter(card.id)}
              className={`font-semibold p-2 rounded transition ${
                selectedCardId === card.id
                  ? "bg-green-500 text-white"
                  : "hover:bg-green-500"
              }`}
            >
              {card.title}
            </button>
          ))}
        </div>

        {/* Card Section */}
        <div className="w-full mt-2  bg-white rounded h-80 m-4">
          {selectedCard && (
            <div className="w-full p-2">
              <h3 className="font-semibold text-xl p-2 text-green-500">
                {selectedCard.title}
              </h3>
              <p className="p-2">{selectedCard.content}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Section3;
