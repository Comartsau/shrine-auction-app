import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";
import FontSarabun from "../fonts/Sarabun-Regular.ttf";
import FontSarabunBold from "../fonts/Sarabun-ExtraBold.ttf";
import FontSarabunLight from "../fonts/Sarabun-ExtraBold.ttf";
import Prompt from "../fonts/Prompt-Regular.ttf";
import Mitr from "../fonts/Mitr-Regular.ttf";

Font.register({
  family: "Sarabun",
  src: FontSarabun,
});
Font.register({
  family: "SarabunBold",
  src: FontSarabunBold,
});
Font.register({
  family: "SarabunLight",
  src: FontSarabunLight,
});
Font.register({
  family: "Prompt",
  src: Prompt,
});
Font.register({
  family: "Mitr",
  src: Mitr,
});

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
    padding: 20,
    margin: 1,
    fontFamily: "SarabunLight",
  },
  header1: {
    fontSize: 28,
    textAlign: "center",
    marginBottom: 20,
    marginTop: 100,
  },
  header: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
  },
  body: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  footer: {
    fontSize: 12,
    textAlign: "left",
    marginBottom: 10,
  },
  signature: {
    fontSize: 12,
    textAlign: "left",
  },
  flexrow: {
    display: "flex",
    flexDirection: "row",
  },
  flexrowbetween: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  flexrowcenter: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    textAlign: "center",
  },
  flexrowstart: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    textAlign: "left",
  },
  textsm: {
    fontSize: 12,
  },
  textbase: {
    fontSize: 16,
  },
  textlg: {
    fontSize: 18,
  },
  textxl: {
    fontSize: 24,
    fontFamily: "SarabunBold",
    fontWeight: "bold",
  },
  spacesm: {
    marginRight: 5,
  },
  spacemd: {
    marginRight: 20,
  },
  fontbase: {
    fontSize: 14,
    fontWeight: "normal",
    fontFamily: "SarabunLight",
  },
  fontbold: {
    fontSize: 18,
    fontWeight: "bold",
  },

  imageContainer: {
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  image: {
    width: 70,
    height: 70,
  },
  image1: {
    width: 70,
    height: 70,
  },
  mtsm: {
    marginTop: 10,
  },
  mtmd: {
    marginTop: 30,
  },
  underlineText: {
    textDecoration: "underline",
    textDecorationStyle: "dot",
  },
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    marginBottom: 10,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableCell1: {
    margin: "auto",
    fontSize: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: "#000",
    textAlign: "center",
    width: "10%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
  },
  tableCell2: {
    margin: "auto",
    fontSize: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: "#000",
    textAlign: "center",
    width: "30%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
  },
  tableCell3: {
    margin: "auto",
    fontSize: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: "#000",
    textAlign: "center",
    width: "10%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
  },
  tableCell4: {
    margin: "auto",
    fontSize: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: "#000",
    textAlign: "center",
    width: "30%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
  },
  tableCell5: {
    margin: "auto",
    fontSize: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: "#000",
    textAlign: "center",
    width: "20%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
  },
  tableCell6: {
    margin: "auto",
    fontSize: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: "#000",
    textAlign: "center",
    width: "40%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
  },
});

const Delivery = () => {
  // const date = new Date();
  return (
    <Document>
      {/* <Page size={[842, 595]} style={styles.page}> */}
      <Page size={[575, 875]} style={styles.page}>
        <View style={styles.flexrowbetween}>
          <View style={styles.flexrow}>
            <Text style={[styles.textsm, styles.spacesm]}>เล่มที่ </Text>
            <Text
              style={[
                styles.textsm,
                { fontWeight: "light" },
                { fontFamily: "Sarabun" },
              ]}
            >
              1234{" "}
            </Text>
          </View>
          <View style={styles.flexrow}>
            <Text style={[styles.textsm, styles.spacesm]}>เลขที่ </Text>
            <Text
              style={[
                styles.textsm,
                { fontWeight: "light" },
                { fontFamily: "Sarabun" },
              ]}
            >
              00001{" "}
            </Text>
          </View>
        </View>
        <View style={[styles.imageContainer, styles.flexrow]}>
          <Image src="../images/deliverylogo1.jpg" style={styles.image} />
          <Image src="../images/deliverylogo2.jpg" style={styles.image} />
        </View>
        <View>
          <Text
            style={[
              styles.flexrowcenter,
              styles.textlg,
              { fontWeight: "thin" },
            ]}
          >
            ใบรับของ{" "}
          </Text>
          <Text style={[styles.flexrowcenter, styles.textlg, styles.mtsm]}>
            คณะกรรมการจัดงานศาลเจ้าปึงเถ่ากงม่า ขอนแก่น{" "}
          </Text>
          <View style={styles.flexrowcenter}>
            <Text style={[styles.flexrowcenter, styles.textlg, styles.mtsm]}>
              ประจำปี{" "}
            </Text>
            <Text style={[styles.flexrowcenter, styles.textlg, styles.mtsm]}>
              {" "}
              2566{" "}
            </Text>
          </View>
          <View style={styles.flexrowstart}>
            <Text
              style={[
                { fontWeight: "extrabold" },
                { fontFamily: "SarabunBold" },
                { fontSize: "12" },
                { marginTop: "20" },
                styles.spacemd,
              ]}
            >
              วันที่{" "}
            </Text>
            <Text
              style={[
                { fontWeight: "light" },
                { fontFamily: "Sarabun" },
                { fontSize: "12" },
                { marginTop: "20" },
                styles.underlineText,
              ]}
            >
              04/07/2566{" "}
            </Text>
          </View>
          <View style={styles.flexrowstart}>
            <Text
              style={[
                { fontWeight: "extrabold" },
                { fontFamily: "SarabunBold" },
                { fontSize: "12" },
                styles.mtsm,
                styles.spacemd,
              ]}
            >
              ชื่อผู้บริจาค{" "}
            </Text>
            <Text
              style={[
                { fontWeight: "light" },
                { fontFamily: "Sarabun" },
                { fontSize: "12" },
                styles.mtsm,
                styles.underlineText,
              ]}
            >
              หจก.มงคลทรัพย์{" "}
            </Text>
          </View>
          <View style={styles.flexrowstart}>
            <Text
              style={[
                { fontWeight: "extrabold" },
                { fontFamily: "SarabunBold" },
                { fontSize: "12" },
                styles.mtsm,
                styles.spacemd,
              ]}
            >
              ที่อยู่ (จัดส่ง){" "}
            </Text>
            <Text
              style={[
                { fontWeight: "light" },
                { fontFamily: "Sarabun" },
                { fontSize: "12" },
                styles.mtsm,
                styles.underlineText,
              ]}
            >
              {" "}
              111/222 อ.เมือง จ.ขอนอแก่น 109876{" "}
            </Text>
          </View>
          <View style={styles.flexrow}>
            <View style={styles.flexrowstart}>
              <Text
                style={[
                  { fontWeight: "extrabold" },
                  { fontFamily: "SarabunBold" },
                  { fontSize: "12" },
                  styles.mtsm,
                  styles.spacemd,
                ]}
              >
                เบอร์โทร{" "}
              </Text>
              <Text
                style={[
                  { fontWeight: "light" },
                  { fontFamily: "Sarabun" },
                  { fontSize: "12" },
                  styles.mtsm,
                  styles.spacemd,
                  styles.underlineText,
                ]}
              >
                {" "}
                0861234567{" "}
              </Text>
            </View>
            <View style={styles.flexrowstart}>
              <Text
                style={[
                  { fontWeight: "extrabold" },
                  { fontFamily: "SarabunBold" },
                  { fontSize: "12" },
                  styles.mtsm,
                  styles.spacemd,
                ]}
              >
                ID LINE{" "}
              </Text>
              {/* <Text style={[{fontWeight:"light"},{textDecorationStyle:'dotted'},{textDecoration:"underline"}, {fontFamily:"Sarabun"}, styles.textbase , styles.mtsm, ]}> @abcdef </Text> */}
              <Text
                style={[
                  { fontWeight: "light" },
                  { textDecoration: "underline" },
                  { fontFamily: "Sarabun" },
                  { fontSize: "12" },
                  styles.mtsm,
                ]}
              >
                {" "}
                @abcdef{" "}
              </Text>
            </View>
          </View>

          <View style={[styles.table, {marginTop:"15"}]}>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell1}>ลำดับ </Text>
              <Text style={styles.tableCell2}>รายละเอียด </Text>
              <Text style={styles.tableCell3}>จำนวน </Text>
              <Text style={styles.tableCell4}>ล็อตเตอรี่/สลาก </Text>
              <Text style={styles.tableCell5}>จำนวนเงิน </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell1}> </Text>
              <Text style={styles.tableCell2}> </Text>
              <Text style={styles.tableCell3}> </Text>
              <Text style={styles.tableCell4}> </Text>
              <Text style={styles.tableCell5}> </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell1}> </Text>
              <Text style={styles.tableCell2}> </Text>
              <Text style={styles.tableCell3}> </Text>
              <Text style={styles.tableCell4}> </Text>
              <Text style={styles.tableCell5}> </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell1}> </Text>
              <Text style={styles.tableCell2}> </Text>
              <Text style={styles.tableCell3}> </Text>
              <Text style={styles.tableCell4}> </Text>
              <Text style={styles.tableCell5}> </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell1}> </Text>
              <Text style={styles.tableCell2}> </Text>
              <Text style={styles.tableCell3}> </Text>
              <Text style={styles.tableCell4}> </Text>
              <Text style={styles.tableCell5}> </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell1}> </Text>
              <Text style={styles.tableCell2}> </Text>
              <Text style={styles.tableCell3}> </Text>
              <Text style={styles.tableCell4}> </Text>
              <Text style={styles.tableCell5}> </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell1}> </Text>
              <Text style={styles.tableCell2}> </Text>
              <Text style={styles.tableCell3}> </Text>
              <Text style={styles.tableCell4}> </Text>
              <Text style={styles.tableCell5}> </Text>
            </View>
 
            <View style={styles.tableRow}>
              <Text style={styles.tableCell1}> </Text>
              <Text style={styles.tableCell2}> ออกสลากธนาคาร-ในนาม </Text>
              <Text style={styles.tableCell3}> </Text>
              <Text style={styles.tableCell4}> </Text>
              <Text style={styles.tableCell5}> </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell1}> </Text>
              <Text style={styles.tableCell2}> </Text>
              <Text style={styles.tableCell3}> </Text>
              <Text style={styles.tableCell4}> </Text>
              <Text style={styles.tableCell5}> </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell1}> </Text>
              <Text style={styles.tableCell6}> </Text>
              <Text style={styles.tableCell4}> รวมเงิน </Text>
              <Text style={styles.tableCell5}> </Text>
            </View>
          </View>
          <View style={styles.flexrowstart}>
            <Text
              style={[
                { fontWeight: "extrabold" },
                { fontFamily: "SarabunBold" },
                { fontSize: "12" },
                styles.mtsm,
                styles.spacemd,
              ]}
            >
              ชื่อผู้บริจาค/ผู้ได้รับของ{" "}
            </Text>
            <Text
              style={[
                { fontWeight: "light" },
                { fontFamily: "Sarabun" },
                { fontSize: "12" },
                styles.mtsm,
                styles.underlineText,
              ]}
            >
              หจก.มงคลทรัพย์{" "}
            </Text>
          </View>
          <View style={styles.flexrowstart}>
            <Text
              style={[
                { fontWeight: "extrabold" },
                { fontFamily: "SarabunBold" },
                { fontSize: "12" },
                styles.mtsm,
                styles.spacemd,
              ]}
            >
              กรรมการผู้ส่งของ{" "}
            </Text>
            <Text
              style={[
                { fontWeight: "light" },
                { fontFamily: "Sarabun" },
                { fontSize: "12" },
                styles.mtsm,
                styles.underlineText,
              ]}
            >
              นายเมธี ร่ำรวย{" "}
            </Text>
          </View>
          <View style={styles.flexrowstart}>
            <Text
              style={[
                { fontWeight: "extrabold" },
                { fontFamily: "SarabunBold" },
                { fontSize: "12" },
                styles.mtsm,
                styles.spacemd,
              ]}
            >
              ผู้รับเงิน{" "}
            </Text>
            <Text
              style={[
                { fontWeight: "light" },
                { fontFamily: "Sarabun" },
                { fontSize: "12" },
                styles.mtsm,
                styles.underlineText,
              ]}
            >
              นายเมธี ร่ำรวย{" "}
            </Text>
          </View>
          <View style={styles.flexrowstart}>
            <Text
              style={[
                { fontWeight: "extrabold" },
                { fontFamily: "SarabunBold" },
                { fontSize: "10" },{marginLeft:50},
                styles.mtsm,
                styles.spacemd,
              ]}
            >
              (กรณ๊ชำระเงินสดเท่านั้น)   </Text>
          </View>
        </View>
          <View style={[styles.imageContainer, styles.flexrow,{alignSelf:"flex-end"}, {marginHorizontal:"10"}]}>
          <Image src="../images/qrcode.png" style={styles.image1} />
        </View>
      </Page>
    </Document>
  );
};
export default Delivery;
