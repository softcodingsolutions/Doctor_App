import weightlossbgimage from "./../../assets/images/weightlossbgimage_converted.webp";

function WeightLoss4() {
  return (
    <div className=" w-full bg-gray-200 flex flex-col items-center text-pretty">
      <div className="w-full pt-14 flex flex-col justify-center px-6 md:px-16 gap-10">
        <div className="leading-relaxed text-base md:text-lg">
          From an Ayurvedic standpoint, undue weight gain among a large populace
          is often attributed to insufficient Med-Dhatvagni. However, body fat
          can be controlled effectively when hormones and Basal Metabolic Rate
          (BMR) are properly managed.
        </div>
        <div className="leading-relaxed text-base md:text-lg">
          There are six hormones in everyone’s body that promote fat burning and
          three different hormones that help store fat. An imbalance in any of
          these hormones can disrupt the fat burning or storing process,
          potentially leading to overweight conditions.
        </div>
      </div>

      <div className="w-full h-full flex flex-col md:flex-row justify-center px-4 md:px-5 text-pretty gap-8">
        {/* Left Column: Fat Burning Hormones */}
        <div className="flex flex-col w-full md:w-1/2 py-5 md:pl-9 items-start">
          <div className="font-semibold pt-7 leading-relaxed text-lg md:text-xl text-green-500">
            Hormones, for instance, play a role in burning fat. Examples
            include:
          </div>
          <div className="flex justify-start w-full pt-4 pl-4">
            <ul className="space-y-2.5 leading-loose text-base md:text-lg">
              <li>
                <span className="text-xl">&#11037;</span> Growth Hormone
              </li>
              <li>
                <span className="text-xl">&#11037;</span> Insulin-like Growth
                Hormone
              </li>
              <li>
                <span className="text-xl">&#11037;</span> Glucagon
              </li>
              <li>
                <span className="text-xl">&#11037;</span> Adrenaline
              </li>
              <li>
                <span className="text-xl">&#11037;</span> Thyroid Hormones T3
                and T4
              </li>
              <li>
                <span className="text-xl">&#11037;</span> Testosterone
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Fat Storing Hormones */}
        <div className="flex flex-col w-full md:w-1/2 py-5 md:pl-9 items-start">
          <div className="font-semibold pt-7 leading-relaxed text-lg md:text-xl text-green-500">
            As a corollary, there are hormones that work toward storing fat as
            well. These include:
          </div>
          <div className="flex justify-start w-full pt-4 pl-4">
            <ul className="space-y-2.5 leading-loose text-base md:text-lg">
              <li>
                <span className="text-xl">&#11037;</span> Insulin
              </li>
              <li>
                <span className="text-xl">&#11037;</span> Estrogen
              </li>
              <li>
                <span className="text-xl">&#11037;</span> Cortisol
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeightLoss4;
