import { useState, useEffect } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  Image,
  Font,
} from "@react-pdf/renderer";
import iconsSlime from "../../../../assets/images/icons_slime.png";
import { useOutletContext } from "react-router-dom";
import NotoSansGujarati from "../../../../assets/fonts/NotoSansGujarati-Regular.ttf";
import TiroDevanagariHindi from "../../../../assets/fonts/TiroDevanagariHindi-Regular.ttf";
import { BsDownload } from "react-icons/bs";
import InsideLoader from "../../../InsideLoader";

Font.register({
  family: "Noto Sans Gujarati",
  src: NotoSansGujarati,
});

Font.register({
  family: "Tiro Devanagari Hindi",
  src: TiroDevanagariHindi,
});

const styles = StyleSheet.create({
  page: { padding: 10 },
  section: { margin: 5, padding: 5 },
  header: {
    fontSize: 18,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  body: { justifyContent: "center" },
  s: { marginBottom: 15, justifyContent: "center" },
  heading: { margin: 5, padding: 5, display: "grid" },
  subtitle: { fontSize: 14, marginTop: 5 },
  Name: { fontSize: 14, fontFamily: "Tiro Devanagari Hindi" },
  table: { display: "table", width: "auto", margin: "5px 0" },
  tableRow: { flexDirection: "row" },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    padding: 3,
  },
  tableCell: {
    margin: "auto",
    marginTop: 3,
    fontSize: 8,
    fontFamily: "Noto Sans Gujarati",
  },
  tableCellHindi: {
    margin: "auto",
    marginTop: 3,
    fontSize: 8,
    fontFamily: "Tiro Devanagari Hindi",
  },
  image: { width: 120, height: 40 },
});

export const BillDocument = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Image
          style={styles.image}
          className="border border-gray-300"
          src={iconsSlime}
        />
      </View>
      <View style={styles.heading}>
        <View>
          <Text style={styles.Name}>
            Case Number :{" "}
            <Text style={{ fontSize: 14 }}>{data?.case_number}</Text>
          </Text>
          <Text style={styles.Name}>
            Name :{" "}
            <Text style={{ fontSize: 14 }}>
              {data?.first_name || "No Name"} {data?.last_name || ""}
            </Text>
          </Text>
        </View>
        <View>
          <Text style={styles.Name}>
            Email : <Text style={{ fontSize: 14 }}>{data?.email}</Text>
          </Text>
          <Text style={styles.Name}>
            Doctor :{" "}
            <Text style={{ fontSize: 14 }}>
              {data?.doctor?.first_name + " " + data?.doctor?.last_name}
            </Text>
          </Text>
          <Text style={styles.Name}>
            Height :{" "}
            <Text style={{ fontSize: 14 }}>
              {data?.personal_detail?.height} cm
            </Text>
          </Text>
          <Text style={styles.Name}>
            Weight :{" "}
            <Text style={{ fontSize: 14 }}>
              {data?.personal_detail?.weight} kg
            </Text>
          </Text>
        </View>
      </View>
      <View style={styles.body}>
        {/* Diet */}
        {data.treatment_packages?.[0]?.treatment_package?.diet?.length !==
          0 && (
          <View style={styles.s}>
            <Text style={styles.subtitle}>Diet</Text>
            <View style={styles.table}>
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "black",
                  color: "white",
                }}
              >
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Name</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>English</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Gujarati</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Hindi</Text>
                </View>
              </View>
              {data.treatment_packages?.[0]?.treatment_package?.diet?.map(
                (diet, index) => (
                  <View style={styles.tableRow} key={index}>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{diet.name}</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{diet.chart_english}</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>
                        {diet.chart_gujarati}
                      </Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCellHindi}>
                        {diet.chart_hindi}
                      </Text>{" "}
                    </View>
                  </View>
                )
              )}
            </View>
          </View>
        )}

        {/* Don'ts */}
        {data.treatment_packages?.[0]?.treatment_package?.dont?.length !==
          0 && (
          <View style={styles.s}>
            <Text style={styles.subtitle}>{"Don'ts"}</Text>
            <View style={styles.table}>
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "black",
                  color: "white",
                }}
              >
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Name</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>English</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Gujarati</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Hindi</Text>
                </View>
              </View>
              {data.treatment_packages?.[0]?.treatment_package?.dont?.map(
                (diet, index) => (
                  <View style={styles.tableRow} key={index}>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{diet.name}</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>
                        {diet.details_in_english}
                      </Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>
                        {diet.details_in_gujarati}
                      </Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCellHindi}>
                        {diet.details_in_hindi}
                      </Text>{" "}
                    </View>
                  </View>
                )
              )}
            </View>
          </View>
        )}

        {/* Dos */}
        {data.treatment_packages?.[0]?.treatment_package?.dos?.length !== 0 && (
          <View style={styles.s}>
            <Text style={styles.subtitle}>Dos</Text>
            <View style={styles.table}>
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "black",
                  color: "white",
                }}
              >
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Name</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>English</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Gujarati</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Hindi</Text>
                </View>
              </View>
              {data.treatment_packages?.[0]?.treatment_package?.dos?.map(
                (diet, index) => (
                  <View style={styles.tableRow} key={index}>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{diet.name}</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>
                        {diet.details_in_english}
                      </Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>
                        {diet.details_in_gujarati}
                      </Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCellHindi}>
                        {diet.details_in_hindi}
                      </Text>{" "}
                    </View>
                  </View>
                )
              )}
            </View>
          </View>
        )}

        {/* Medicines */}
        {data.treatment_packages?.[0]?.treatment_package?.medicines?.length !==
          0 && (
          <View style={styles.s}>
            <Text style={styles.subtitle}>Medicines</Text>
            <View style={styles.table}>
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "black",
                  color: "white",
                }}
              >
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Name</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Dosage</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Time</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Quantity</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>With Milk</Text>
                </View>
              </View>
              {data.treatment_packages?.[0]?.treatment_package?.medicines?.map(
                (diet, index) => (
                  <View style={styles.tableRow} key={index}>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{diet.medicine_name}</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{diet.dosage}</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>
                        {diet.frequency?.join(", ")}
                      </Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>
                        {diet.quantity?.join(", ")}
                      </Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCellHindi}>
                        {diet.with_milk}
                      </Text>{" "}
                    </View>
                  </View>
                )
              )}
            </View>
          </View>
        )}

        {/* Exercises */}
        {data.treatment_packages?.[0]?.treatment_package?.exercise?.length !==
          0 && (
          <View style={styles.s}>
            <Text style={styles.subtitle}>Exercises</Text>
            <View style={styles.table}>
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "black",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Name</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>English</Text>
                </View>
              </View>
              {data.treatment_packages?.[0]?.treatment_package?.exercise?.map(
                (diet, index) => (
                  <View style={styles.tableRow} key={index}>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{diet.name}</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{diet.details}</Text>
                    </View>
                  </View>
                )
              )}
            </View>
          </View>
        )}

        {/* Nutritions */}
        {data.treatment_packages?.[0]?.treatment_package?.nutrition?.length !==
          0 && (
          <View style={styles.s}>
            <Text style={styles.subtitle}>Nutrition</Text>
            <View style={styles.table}>
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "black",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Name</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Reason</Text>
                </View>
              </View>
              {data.treatment_packages?.[0]?.treatment_package?.nutrition?.map(
                (diet, index) => (
                  <View style={styles.tableRow} key={index}>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{diet.name}</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{diet.weight_reason}</Text>
                    </View>
                  </View>
                )
              )}
            </View>
          </View>
        )}

        {/* LabTest */}
        {data.user_labtests?.length !== 0 && (
          <View style={styles.s}>
            <Text style={styles.subtitle}>Labtest</Text>
            <View style={styles.table}>
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "black",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Name</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Comment</Text>
                </View>
              </View>
              {data.user_labtests?.[
                data.user_labtests?.length - 1
              ]?.labtest?.map((test, index) => (
                <View style={styles.tableRow} key={index}>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{test.name}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{test.comments}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}
      </View>
    </Page>
  </Document>
);

const ReportGenerate = () => {
  const [pdfData, setPdfData] = useState({});
  const customer = useOutletContext();
  const role = localStorage.getItem("role");

  useEffect(() => {
    const customerData = customer[1];
    const convertedData = Array.isArray(customerData)
      ? customerData[0]
      : customerData;

    setPdfData(convertedData || {});
    console.log(convertedData, "convertedData");
  }, [customer]);

  return (
    <div className="w-full p-2">
      <div
        className={`rounded-lg bg-card ${
          role === "patient" ? "h-[85vh]" : "h-[89vh]"
        } bg-white`}
      >
        <div className="flex px-4 items-center justify-center py-3 h-full flex-col space-y-4">
          {pdfData?.treatment_packages?.length === 0 ? (
            <div className="bg-red-100 text-red-800 text-xl p-4 rounded border border-red-400">
              Your doctor will create a treatment package which you can download
              later!
            </div>
          ) : (
            <PDFDownloadLink
              document={<BillDocument data={pdfData} />}
              fileName="ReportGenerate.pdf"
            >
              {({ loading }) =>
                loading ? (
                  <InsideLoader />
                ) : (
                  <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white text-xl rounded shadow-md hover:bg-green-600">
                    <BsDownload size={21} /> Download PDF
                  </button>
                )
              }
            </PDFDownloadLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportGenerate;
