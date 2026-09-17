import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { ITransactionExtended } from "../_types/Transaction";
import { convertToIDR } from "@/lib/utils";
import { format } from "date-fns";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
  },
  header: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  brandImage: {
    width: 50,
    height: 50,
  },
  headerTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#00646a",
  },
  headerDescription: {
    fontSize: 14,
    color: "#49595a",
  },
  separatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    gap: 10,
  },
  separatorLine: {
    height: 8,
    backgroundColor: "#00646a",
    flexGrow: 1,
  },
  separatorText: {
    fontSize: 18,
    color: "#00646a",
  },
  dateRow: {
    marginTop: 15,
    flexDirection: "row",
  },
  dateLabel: {
    fontSize: 12,
  },
  dateValue: {
    fontSize: 12,
    color: "#6b7280",
  },
  table: {
    marginTop: 15,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingBottom: 8,
  },
  tableHeaderCell: {
    fontSize: 12,
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  tableCell: {
    fontSize: 12,
  },
  colIndex: {
    width: "10%",
  },
  colName: {
    width: "60%",
  },
  colPrice: {
    width: "30%",
  },
  downPaymentContainer: {
    marginTop: 15,
    flexDirection: "row",
    fontSize: 12,
    justifyContent: "flex-end",
  },
  totalContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  totalBox: {
    backgroundColor: "#00646a",
    color: "white",
    padding: 10,
    fontWeight: "bold",
    fontSize: 12,
  },
  termsContainer: {
    fontSize: 12,
    marginTop: "20px",
    textWrap: "balance",
  },
  termsHeader: {
    fontWeight: "bold",
    marginBottom: "5px"
  },
  termsDescription: {
    color: "#49595a",
  },
  paymentInfoContainer: {
    fontSize: 12,
    marginTop: "20px",
  },
  paymentInfoHeader: {
    marginBottom: "5px",
    fontWeight: "bold",
  },
  paymentInfoSubText: {
    color: "#49595a",
  },
});

interface PropTypes {
  transaction: ITransactionExtended;
}

export default function TransactionDocument(props: PropTypes) {
  const { transaction } = props;

  let totalPrice = 0;
  transaction.transactionItems.map((item) => (totalPrice += item.price));

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image src={"/assets/common/logo.png"} style={styles.brandImage} />
          <View>
            <Text style={styles.headerTitle}>PanDev</Text>
            <Text style={styles.headerDescription}>Digital Agency</Text>
          </View>
        </View>
        <View style={styles.separatorContainer}>
          <View style={styles.separatorLine} />
          <Text style={styles.separatorText}>INVOICE</Text>
          <View style={[styles.separatorLine, { flexGrow: 0, width: 40 }]} />
        </View>
        <View style={styles.dateRow}>
          <Text style={styles.dateLabel}>Date: </Text>
          <Text style={styles.dateValue}>
            {format(transaction.date.toISOString(), "dd-MM-yyyy")}
          </Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, styles.colIndex]}>#</Text>
            <Text style={[styles.tableHeaderCell, styles.colName]}>
              Transaction Item
            </Text>
            <Text style={[styles.tableHeaderCell, styles.colPrice]}>Price</Text>
          </View>
          {transaction.transactionItems.map((item, index) => (
            <View key={`transaction-item-${index}`} style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.colIndex]}>
                {index + 1}
              </Text>
              <Text style={[styles.tableCell, styles.colName]}>
                {item.name}
              </Text>
              <Text style={[styles.tableCell, styles.colPrice]}>
                {convertToIDR(item.price)}
              </Text>
            </View>
          ))}
        </View>
        <View style={styles.downPaymentContainer}>
          <Text>
            Down Payment (DP): {convertToIDR((50 / 100) * totalPrice)}
          </Text>
        </View>
        <View style={styles.totalContainer}>
          <Text style={styles.totalBox}>Total: {convertToIDR(totalPrice)}</Text>
        </View>
        <View style={styles.paymentInfoContainer}>
          <Text style={styles.paymentInfoHeader}>Payment Info</Text>
          <Text style={styles.paymentInfoSubText}>
            Account: Seabank 9010 6219 3025
          </Text>
          <Text style={styles.paymentInfoSubText}>
            A/C Name: Masyitah Elwinda
          </Text>
        </View>
        <View style={styles.termsContainer}>
          <Text style={styles.termsHeader}>Terms & Conditions</Text>
          <Text style={styles.termsDescription}>
            Project work will commence once the agreed deposit (50% of the total
            project fee) has been received. The remaining balance is due upon
            project completion.
          </Text>
        </View>
      </Page>
    </Document>
  );
}
