import React, { useState, useEffect } from "react";
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

Font.register({
  family: "Noto Sans Gujarati",
  src: NotoSansGujarati,
});

Font.register({
  family: "Tiro Devanagari Hindi",
  src: TiroDevanagariHindi,
});

const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { margin: 10, padding: 10 },
  header: {
    fontSize: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  body: { justifyContent: "center" },
  s: { marginBottom: 20, justifyContent: "center" },
  heading: { margin: 10, padding: 10, display: "grid" },
  subtitle: { fontSize: 16, marginTop: 10 },
  Name: { fontSize: 14, fontFamily: "Tiro Devanagari Hindi" },
  table: { display: "table", width: "auto", margin: "10px 0" },
  tableRow: { flexDirection: "row" },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    padding: 5,
  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
    fontSize: 10,
    fontFamily: "Noto Sans Gujarati",
  },
  tableCellHindi: {
    margin: "auto",
    marginTop: 5,
    fontSize: 10,
    fontFamily: "Tiro Devanagari Hindi",
  },
  image: { width: 120, height: 50 },
});

export const BillDocument = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Image style={styles.image} src={iconsSlime} />
      </View>
      <View style={styles.heading}>
        <View>
          <Text style={styles.Name}>
            Name : {data?.first_name || "No Name"} {data?.last_name || ""}
          </Text>
          <Text style={styles.Name}>Email : {data?.email}</Text>
        </View>
        <View>
          <Text style={styles.Name}>Case Number : {data?.case_number}</Text>
          <Text style={styles.Name}>
            Height : {data?.personal_detail?.height} cm
          </Text>
          <Text style={styles.Name}>
            Weight : {data?.personal_detail?.weight} kg
          </Text>
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.s}>
          <Text style={styles.subtitle}>Diet</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
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
                    <Text style={styles.tableCell}>{diet.chart_gujarati}</Text>
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

        <View style={styles.s}>
          <Text style={styles.subtitle}>Dont</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
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

        <View style={styles.s}>
          <Text style={styles.subtitle}>Dos</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
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

        <View style={styles.s}>
          <Text style={styles.subtitle}>Exercise</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
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

        <View style={styles.s}>
          <Text style={styles.subtitle}>Medicines</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
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
                    <Text style={styles.tableCell}>{diet.frequency}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{diet.quantity}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCellHindi}>{diet.with_milk}</Text>{" "}
                  </View>
                </View>
              )
            )}
          </View>
        </View>

        <View style={styles.s}>
          <Text style={styles.subtitle}>Nutrition</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
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
      </View>
    </Page>
  </Document>
);

const ReportGenerate = () => {
  const [pdfData, setPdfData] = useState({});
  const customer = useOutletContext();

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
      <div className="rounded-lg  bg-card h-[85vh] bg-white">
        <div className="flex px-4 items-center justify-center py-3 h-full flex-col space-y-4">
          {pdfData?.treatment_packages?.length > 0 ? (
            <PDFDownloadLink
              document={<BillDocument data={pdfData} />}
              fileName="ReportGenerate.pdf"
            >
              {({ blob, url, loading, error }) =>
                loading ? (
                  <button className="px-4 py-2 bg-blue-500 text-white text-xl rounded shadow-md hover:bg-blue-600">
                    Loading document...
                  </button>
                ) : (
                  <button className="px-4 py-2 bg-green-500 text-white text-xl rounded shadow-md hover:bg-green-600">
                    Download PDF
                  </button>
                )
              }
            </PDFDownloadLink>
          ) : (
            <div className="bg-red-100 text-red-700 text-xl p-4 rounded border border-red-400">
              You need to create the Treatment package
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportGenerate;
