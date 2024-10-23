import { GiCheckMark } from "react-icons/gi";
function HairAndBeauty3() {
  return (
    <div className=" bg-gray-50 flex flex-col items-center py-2">
      <div className="flex flex-col items-center">
        <div className="text-2xl font-sans font-medium mt-8 md:text-3xl lg:text-4xl">
          Hair Care
        </div>
        <div className="border-[2.5px] rounded-md border-teal-200 w-20 " />
      </div>

      <div className="w-full pt-8 flex flex-col justify-center px-5 md:px-16 gap-8 ">
        <div className="leading-relaxed text-base md:text-lg lg:text-xl">
          Every day, we come across new tips, tricks, and product names
          promising the best results for hair health. However, it's important to
          remember that shampoo, conditioner, hair oil, and spa treatments alone
          do not necessarily improve hair health.
        </div>
        <div className="leading-relaxed text-base md:text-lg lg:text-xl">
          These products primarily cleanse and somewhat nourish your hair, but
          they do not address the underlying issues causing hair problems. At
          Slim and Smile Ayu Care, we offer hair treatment packages that involve
          a thorough and detailed analysis of your hair and scalp. This analysis
          helps us identify the root cause of your hair issues, allowing us to
          select the most effective treatments and products for optimal results.
        </div>
      </div>

      <div className="w-full flex flex-col justify-start px-5 text-pretty mb-8 lg:ml-5">
        <div className="flex flex-col ">
          <div className="font-semibold pt-7 text-green-600 leading-relaxed text-xl md:text-xl lg:ml-5">
            Treatments We Provide:
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 p-5 pt-6">
            <div className="flex bg-white shadow-lg rounded-lg p-4">
              <div className="text-xl"><GiCheckMark size={16} className="m-2 mt-1  text-green-600" /></div>
              <p className="leading-loose text-base md:text-md lg:text-lg">
                Treatments for Hair Fall, Split Ends, Hair Greying or White
                Hair, Rough Hair, Itchiness, and Dandruff using 100%
                chemical-free Ayurvedic herbal products and medicines.
              </p>
            </div>
            <div className="flex bg-white shadow-lg rounded-lg p-4">
              <div className="text-xl"><GiCheckMark size={16} className="m-2 mt-1 text-green-600" /></div>
              <p className="leading-loose text-base md:text-md lg:text-lg">
                Special 3-Month Hair Re-Growth Treatment (All our patients
                treated with this special treatment have achieved desired
                results).
              </p>
            </div>
            <div className="flex bg-white shadow-lg rounded-lg p-4">
              <div className="text-xl"><GiCheckMark size={16} className="m-2 mt-1 text-green-600" /></div>
              <p className="leading-loose text-base md:text-md lg:text-lg">
                10-Day Special Shirodhara Treatment Package.
              </p>
            </div>
            <div className="flex bg-white shadow-lg rounded-lg p-4">
              <div className="text-xl"><GiCheckMark size={16} className="m-2 mt-1 text-green-600" /></div>
              <p className="leading-loose text-base md:text-md lg:text-lg">
                Customized Scalp Detox Treatment to remove toxins and improve
                overall scalp health.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HairAndBeauty3;
