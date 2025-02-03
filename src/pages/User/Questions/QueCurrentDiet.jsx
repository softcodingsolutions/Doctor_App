import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { CurrentDietSchema } from "../../../schemas/UserDetailsSchema";
import UserDetailsInput from "../../../components/User/UserDetailsInput";
import SaveUserDetailsButton from "../../../components/User/SaveUserDetailsButton";
import PrevPageButton from "../../../components/Admin/PrevPageButton";
import { useEffect,useState } from "react";
import Swal from "sweetalert2";

function QueCurrentDiet({
  onNext,
  onBack,
  onValidate,
  storedData,
  setStoreData,
}) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(CurrentDietSchema),
  });

  const submittedData = async (d) => {
    setStoreData((prev) => ({
      ...prev,
      diet: d,
    }));

    Swal.fire({
      position: "top-end",
      showConfirmButton: false,
      timer: 1500,
      icon: "success",
      title: "Saved!",
      text: "Your diet has been saved.",
    });
    onNext();
    reset();
  };
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    if (storedData) {
      reset({
        Morning: storedData.Morning || "",
        MidMorning: storedData.MidMorning || "",
        Lunch: storedData.Lunch || "",
        MidAfternoon: storedData.MidAfternoon || "",
        Evening: storedData.Evening || "",
        Dinner: storedData.Dinner || "",
        PostDinner: storedData.PostDinner || "",
      });
    }
  }, []);

  useEffect(() => {
    onValidate(isValid);
  }, [isValid, onValidate]);

  return (
    <div className="w-full p-2">
      <div className="rounded-lg bg-card h-[87vh] bg-white">
        <div className="flex p-2 px-4 h-full flex-col space-y-4">
          <div className="text-xl font-semibold text-[#1F2937] p-2">Current Diet</div>
          <div className="w-full flex justify-center p-4 border rounded-md animate-once animate-ease-out overflow-auto h-[91%]">
            <form
              onSubmit={handleSubmit(submittedData)}
              className="w-[80%] h-full flex flex-col items-center gap-10"
              method="post"
            >
              <div className="text-lg">
                Enter all your meal details from Breakfast to Dinner <br />
                સવારથી સાંજની બધી ખાવા-પીવાની આદત ભરો
              </div>
              <div className="flex flex-col justify-center  gap-5 w-full text-lg">
                <h2 className="text-[red]">YOUR LAST WEEK DIET....</h2>
                <div className="md:flex w-full gap-10">
                  <UserDetailsInput
                    errors={errors.Morning}
                    name="Morning"
                    type="text"
                    label="Morning** "
                    hook={register("Morning", {
                      required: true,
                      minLength: 2,
                    })}
                  />
                  <UserDetailsInput
                    name="MidMorning"
                    type="text"
                    label="Mid Morning "
                    hook={register("MidMorning", {
                      required: true,
                      minLength: 2,
                    })}
                  />
                </div>
                <div className="md:flex w-full gap-10">
                  <UserDetailsInput
                    errors={errors.Lunch}
                    name="Lunch"
                    type="text"
                    label="Lunch** "
                    hook={register("Lunch", {
                      required: true,
                      minLength: 2,
                    })}
                  />
                  <UserDetailsInput
                    name="Evening"
                    type="text"
                    label="Evening"
                    hook={register("Evening", {
                      required: true,
                      minLength: 2,
                    })}
                  />
                </div>
                <div className="md:flex w-full gap-10">
                  <UserDetailsInput
                    errors={errors.Dinner}
                    name="Dinner"
                    type="text"
                    label="Dinner** "
                    hook={register("Dinner", {
                      required: true,
                      minLength: 2,
                    })}
                  />
                  <UserDetailsInput
                    name="PostDinner"
                    type="text"
                    label="Post Dinner"
                    hook={register("PostDinner", {
                      required: true,
                      minLength: 2,
                    })}
                  />
                </div>
              </div>
              <div className="flex w-full justify-center gap-3">
                <PrevPageButton back={onBack} />
                <SaveUserDetailsButton name="Save & Continue" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QueCurrentDiet;
