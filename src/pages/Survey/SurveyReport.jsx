import Table from "@mui/joy/Table";
function createData(reason, total, male, female) {
  return { reason, total, male, female };
}

const rows1 = [
  createData("Under Weight", "6%", "3%", "3%"),
  createData("Normal Weight", "3%", "1%", "2%"),
  createData("Midlyover Weight", "37%", "19%", "18%"),
  createData("Moderate obesity", "37%", "21%", "16%"),
  createData("Severe obesity", "16%", "8%", "7%"),
];

const row2 = [
  createData("Sedentary life (બેઠાડુ જીવન)", "24%", "19%", "5%"),
  createData("Over Eating (અતિશય આહાર)", "6%", "5%", "1%"),
  createData("After delivery (ડિલિવરી પછી)", "12%", "0%", "12%"),
  createData(
    "Excessive use of allopathiy medicine (એલોપથી દવાઓના અતિશય ઉપયોગ થી)",
    "3%",
    "1%",
    "2%"
  ),
  createData("Do not know (ખબર નથી)", "51%", "28%", "23%"),
  createData("After Surgery (સર્જરી પછી)", "4%", "1%", "3%"),
];

const row3 = [
  createData("Adrenal Stess", "22%", "9%", "13%"),
  createData("Hormonal Imbalance", "4%", "0%", "4%"),
  createData("Under Active Thyroid", "7%", "3%", "5%"),
  createData("Insulin Resistance", "2%", "1%", "1%"),
  createData("No Specific Reason", "45%", "26%", "19%"),
  createData("Lifestyle Disorders", "19%", "14%", "5%"),
];

const row4 = [
  createData("High B.P", "16%", "10%", "6%"),
  createData("Diabetes", "7%", "5%", "2%"),
  createData("Heart Problem", "3%", "2%", "1%"),
  createData("Hypothyroidism", "6%", "1%", "5%"),
  createData("Infertility", "1%", "0%", "1%"),
  createData("Pcod/Pcos", "5%", "0%", "5%"),
  createData("Joint Pain", "18%", "7%", "11%"),
  createData("Back Pain", "22%", "9%", "13%"),
  createData(
    "Did you observe that you have regained your body weight? શું તમારુ ઘટેલું વજન ફરીથી વધ્યું છે?",
    "15",
    "6%",
    "8%"
  ),
  createData("No Complain", "45%", "27%", "18%"),
];

function createDataa(string, number) {
  return { string, number };
}

const gender = [createDataa("Male", "53%"), createDataa("Female", "47%")];
const age = [
  createDataa("1 to 15", "1%"),
  createDataa("16 to 40", "62%"),
  createDataa("41 to 1000", "37%"),
];

const summary = [
  createData("Belly Area  (પેટ ના ભાગમા)", "76%", "43%", "32%"),
  createData("West Area  (પેટ ના બાજુ ના ભાગમા)", "48%", "26%", "21%"),
  createData("Thighs  (સાથળ ના ભાગમા)", "42%", "18%", "25%"),
  createData("Hips  (નિતંબ ના ભાગમા)", "31%", "11%", "20%"),
  createData("Arms  (હાથ ના ભાગમા)", "22%", "5%", "17%"),
  createData("Chest  (છાતી ના ભાગમા)", "28%", "14%", "14%"),
  createData("Full Body  (આખા શરીર મા)", "39%", "15%", "24%"),
];

const styles = {
  reason: {
    backgroundColor: "#F6F5F2",
  },
  total: {
    backgroundColor: "#F86D5E",
    borderColor: "white",
    padding: "8px",
    border: "1px solid white",
  },
  male: {
    backgroundColor: "#60A6B2",
    borderColor: "white",
    padding: "8px",
    border: "1px solid white",
  },
  female: {
    backgroundColor: "#D2890E",
    borderColor: "white",
    padding: "8px",
    border: "1px solid white",
  },
};

const tableContainerStyle = {
  width: "80%",
  margin: "0 auto",
};

export default function SurveyReport() {
  return (
    <div className="">
      <header className="bg-[#FEFAF6]">
        <div className=" items-center absolute p-3">
          <img
            src="https://slimandsmile.com/assets/front/images/logo.png"
            alt=""
            className="h-16"
          />
        </div>
        <div className="flex justify-center p-3">
          <h1 className="text-2xl  text-[#1F2937] font-bold">
            Surveillance @ Overweight
          </h1>
        </div>
      </header>
      <main>
        <div className="bg-[#FEFAF6]">
          <div className="text-center font-semibold text-[#799351]">
            <h2>
              Summary of participants in the campaign of 'Surveillance @
              Overweight'
            </h2>
            <h4>Total number of Surveys: 4925</h4>
          </div>
          <div className="grid grid-cols-2 bg-[#F6F5F2]">
            <div className="flex flex-col p-10 items-center border-1 ">
              <label className="font-semibold  text-[#1F2937] text-lg">
                Obesity based on BMI
              </label>
              <Table aria-label="striped table">
                <thead>
                  <tr>
                    <th style={styles.reason}>Reason</th>
                    <th style={styles.total}>Total%</th>
                    <th style={styles.male}>Male%</th>
                    <th style={styles.female}>Female%</th>
                  </tr>
                </thead>
                <tbody>
                  {rows1.map((row) => (
                    <tr key={row.total}>
                      <td style={styles.reason}>{row.reason}</td>
                      <td style={styles.total}>{row.total}</td>
                      <td style={styles.male}>{row.male}</td>
                      <td style={styles.female}>{row.female}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            <div className="flex flex-col p-10 items-center border-1 ">
              <label className="font-semibold text-[#1F2937] text-lg">
                The key reason for the weight gain is base on participants
                opinion
              </label>
              <Table aria-label="striped table">
                <thead>
                  <tr>
                    <th style={styles.reason}>Reason</th>
                    <th style={styles.total}>Total%</th>
                    <th style={styles.male}>Male%</th>
                    <th style={styles.female}>Female%</th>
                  </tr>
                </thead>
                <tbody>
                  {row2.map((row) => (
                    <tr key={row.total}>
                      <td style={styles.reason}>{row.reason}</td>
                      <td style={styles.total}>{row.total}</td>
                      <td style={styles.male}>{row.male}</td>
                      <td style={styles.female}>{row.female}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            <div className="flex flex-col  p-10 items-center border-1 ">
              <label className="font-semibold text-[#1F2937] text-lg">
                As per our scientific study the following key possibility for
                weight gain
              </label>
              <Table aria-label="striped table">
                <thead>
                  <tr>
                    <th style={styles.reason}>Reason</th>
                    <th style={styles.total}>Total%</th>
                    <th style={styles.male}>Male%</th>
                    <th style={styles.female}>Female%</th>
                  </tr>
                </thead>
                <tbody>
                  {row3.map((row) => (
                    <tr key={row.total}>
                      <td style={styles.reason}>{row.reason}</td>
                      <td style={styles.total}>{row.total}</td>
                      <td style={styles.male}>{row.male}</td>
                      <td style={styles.female}>{row.female}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            <div className="flex flex-col p-10 items-center border-1 ">
              <label className="font-semibold text-[#1F2937] text-lg">
                Participants of the survey are suffering the following disease,
                due to overweight
              </label>
              <Table aria-label="striped table">
                <thead>
                  <tr>
                    <th style={styles.reason}>Reason</th>
                    <th style={styles.total}>Total%</th>
                    <th style={styles.male}>Male%</th>
                    <th style={styles.female}>Female%</th>
                  </tr>
                </thead>
                <tbody>
                  {row4.map((row) => (
                    <tr key={row.total}>
                      <td style={styles.reason}>{row.reason}</td>
                      <td style={styles.total}>{row.total}</td>
                      <td style={styles.male}>{row.male}</td>
                      <td style={styles.female}>{row.female}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
          <div className="flex items-center  justify-center text-center font-semibold text-2xl bg-[#FEFAF6] text-[#799351] h-20">
            <h2>Participants Ratio</h2>
          </div>
          <div className="grid grid-cols-2 bg-[#F6F5F2]">
            <div
              className="flex flex-col p-20 items-center border-1"
              style={tableContainerStyle}
            >
              <label className="font-semibold  text-[#1F2937] text-lg">
                Gender
              </label>
              <Table aria-label="striped table">
                <tbody>
                  {gender.map((row) => (
                    <tr key={row.number}>
                      <td>{row.string}</td>
                      <td>{row.number}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            <div
              className="flex flex-col p-10 items-center border-1 "
              style={tableContainerStyle}
            >
              <label className="font-semibold  text-[#1F2937] text-lg">
                Age
              </label>
              <Table aria-label="striped table">
                <thead>
                  <tr>
                    <th style={styles.reason}>Group</th>
                    <th style={styles.total}>Total%</th>
                  </tr>
                </thead>
                <tbody>
                  {age.map((row) => (
                    <tr key={row.total}>
                      <td style={styles.reason}>{row.string}</td>
                      <td style={styles.total}>{row.number}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
          <div className="bg-[#F6F5F2]">
            <div
              className="flex flex-col  p-10 items-center border-1 "
              style={tableContainerStyle}
            >
              <label className="font-semibold text-[#1F2937] text-lg">
                Summary of Fat Deposition Area
              </label>
              <Table aria-label="striped table">
                <thead>
                  <tr>
                    <th style={styles.reason}>Reason</th>
                    <th style={styles.total}>Total%</th>
                    <th style={styles.male}>Male%</th>
                    <th style={styles.female}>Female%</th>
                  </tr>
                </thead>
                <tbody>
                  {summary.map((row) => (
                    <tr key={row.total}>
                      <td style={styles.reason}>{row.reason}</td>
                      <td style={styles.total}>{row.total}</td>
                      <td style={styles.male}>{row.male}</td>
                      <td style={styles.female}>{row.female}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <h2 className="font-semibold text-[#1F2937] text-lg">
                Note:The overall report may vary by 1%
              </h2>
            </div>
          </div>
        </div>
      </main>
      <footer>
        <div className="flex justify-center items-center text-center bg-[#FEFAF6] h-16">
          <a className="text-lg text-[#799351] font-semibold" href="/">
            Contact Us @ Slim And Smile
          </a>
        </div>
      </footer>
    </div>
  );
}
