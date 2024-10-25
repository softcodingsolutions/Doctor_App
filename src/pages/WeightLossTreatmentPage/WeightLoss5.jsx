import abdominall from "../../assets/images/abdominall.png";
import img2 from "../../assets/images/fat-img-2.png";
import img3 from "../../assets/images/fat-img-3.png";
import img4 from "../../assets/images/fat-img-4.png";
import image35 from "../../assets/images/image35.png";

function WeightLoss5() {
  return (
    <div className=" bg-gray-50 flex flex-col items-center py-7">
      <div className="w-full pt-14 flex flex-col justify-center px-6 md:px-16 gap-10">
        <div className="text-lg md:text-xl font-semibold">
          Certain parts of the body are more prone to excess fat accumulation
          compared to others. Common areas include:
        </div>
      </div>

      <div className="w-full flex flex-wrap gap-6 md:gap-8 justify-center px-4 md:px-5 text-pretty pt-8">
        {/* Abdominal Fat */}
        <div className="flex flex-col items-center gap-1.5 w-1/2 md:w-auto">
          <img src={abdominall} alt="Abdominal Fat" className="w-24 md:w-32" />
          <div className="text-base md:text-lg text-green-500">Abdominal Fat</div>
        </div>

        {/* Love Handle Fat */}
        <div className="flex flex-col items-center gap-1.5 w-1/2 md:w-auto">
          <img src={img2} alt="Love Handle Fat" className="w-24 md:w-32" />
          <div className="text-base md:text-lg text-green-500">Love Handle Fat</div>
        </div>

        {/* Hip/Thigh Fat */}
        <div className="flex flex-col items-center gap-1.5 w-1/2 md:w-auto">
          <img src={img3} alt="Hip/Thigh Fat" className="w-24 md:w-32" />
          <div className="text-base md:text-lg text-green-500">Hip/Thigh Fat</div>
        </div>

        {/* Full Body Fat */}
        <div className="flex flex-col items-center gap-1.5 w-1/2 md:w-auto">
          <img src={image35} alt="Full Body Fat" className="w-24 md:w-32 " />
          <div className="text-base md:text-lg text-green-500">Full Body Fat</div>
        </div>
      </div>

      <div className="px-6 md:px-16 pt-8 md:pt-11 text-base md:text-lg leading-relaxed">
        The reason for fat gain in different areas is often related to
        imbalances in various hormones. Consequently, the treatment for fat loss
        in each body part may need to be tailored differently to address these
        specific hormonal imbalances.
      </div>
    </div>
  );
}

export default WeightLoss5;
