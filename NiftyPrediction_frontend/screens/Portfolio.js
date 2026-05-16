// Portfolio.js
import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons, Feather, Ionicons } from "@expo/vector-icons";

export default function Portfolio() {
  return (
    <SafeAreaView backgroundColor="#5B2C6F" style={styles.safe}>
      {/* Header */}

     <View style={styles.header}>
      
        <Text style={styles.logo}
    >StockAI</Text>
        <View>
          <Text style={styles.headerTitle}>Portfolio</Text>
      
        </View>
    
          </View>
<ScrollView   backgroundColor="#fff">
      {/* Tabs (Positions / Holdings) */}
      <View style={styles.tabRow}>
        <TouchableOpacity style={styles.tab}><Text style={styles.tabLabel}>Positions</Text></TouchableOpacity>
        <View style={styles.tabActive}><Text style={styles.tabActiveLabel}>Holdings (1)</Text></View>
      </View>

      {/* Filters (All / Pledge) */}
      <View style={styles.filterRow}>
        <TouchableOpacity style={styles.filterPillActive}><Text style={styles.filterPillTextActive}>All (1)</Text></TouchableOpacity>
        <TouchableOpacity style={styles.filterPill}><Text style={styles.filterPillText}>Pledge</Text></TouchableOpacity>
      </View>
 
    <View style={styles.card}>
      {/* Top Row - Invested & Current */}
      <View style={styles.row}>
        <View>
          <Text style={styles.label}>Invested</Text>
          <Text style={styles.value}>113,302.50</Text>
        </View>
        <View>
          <Text style={styles.label}>Current</Text>
          <Text style={styles.value}>115,045.00</Text>
        </View>
      </View>

      {/* Returns Row */}
      <View style={styles.row}>
        <View>
          <Text style={styles.label}>Total returns</Text>
          <Text style={styles.green}>+11,742.50 (+13.10%)</Text>
        </View>
        <View>
          <Text style={styles.label}>Today's returns</Text>
          <Text style={styles.red}>-142.50 (-0.28%)</Text>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Stock Item */}
      <View style={styles.row}>
        <View>
          <Text style={styles.stockName}>ETERNAL</Text>
          <Text style={styles.label}>Invested 113,302.50</Text>
          <Text style={styles.label}>Qty. 150</Text>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Text style={styles.green}>+11,742.50 (+13.10%)</Text>
          <Text style={styles.label}>1266.05 Avg.</Text>
          <Text style={styles.red}>1300.90 (-0.28%) LTP</Text>
        </View>
      </View>
    </View>
</ScrollView>
     
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({

logo: {

  color: '#fff',
    fontSize: 20,
    fontWeight: '600',

},
  safe: {
    flex: 1,
  },
    header: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: '#5B2C6F', // Upstox purple
  paddingHorizontal: 15,
  paddingVertical: 10,
   padding: 16,
},
 
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
 

  /* Tabs row */
  tabRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e6e6e6",
    backgroundColor: "#f6f6f6"
  },
  tab: { paddingVertical: 12, paddingHorizontal: 16 },
  tabLabel: { color: "#777", fontSize: 14 },
  tabActive: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 2,
    borderBottomColor: "#222",
    backgroundColor: "#f6f6f6",
  },
  tabActiveLabel: { color: "#111", fontSize: 14, fontWeight: "700" },

  /* Filters */
  filterRow: { flexDirection: "row", padding: 12, backgroundColor: "#fff" },
  filterPill: {
    backgroundColor: "#fff",
    borderWidth: 1, borderColor: "#ddd",
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, marginRight: 10
  },
  filterPillActive: {
    backgroundColor: "#5B2C6F",
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, marginRight: 10
  },
  filterPillText: { color: "#333", fontSize: 14 },
  filterPillTextActive: { color: "#fff", fontSize: 14, fontWeight: "700" },

  /* Content */
  content: { flex: 1 },

  /* Summary box (pale pink/purple background) */
  summaryBox: {
    backgroundColor: "#fbf5fb",
    marginHorizontal: 12,
    borderRadius: 8,
    marginTop: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#f0e7f6"
  },
  summaryCol: { width: "50%" },
  summaryColRight: { width: "50%", alignItems: "flex-end" },
  summaryLabel: { color: "#777", fontSize: 12 },
  summaryValue: { color: "#111", fontSize: 16, fontWeight: "700", marginTop: 4 },

  summaryLabelRight: { color: "#777", fontSize: 12 },
  summaryValueRight: { color: "#111", fontSize: 16, fontWeight: "700", marginTop: 4 },

  summaryBottom: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  returnCol: {},
  returnColRight: { alignItems: "flex-end" },
  returnLabel: { color: "#666", fontSize: 12 },
  returnValueGreen: { color: "#0a993c", fontWeight: "700", marginTop: 4 },
  returnValueRed: { color: "#d32f2f", fontWeight: "700", marginTop: 4 },

  /* Holding card */
  holdingCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 14,
    marginTop: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  holdingLeft: { flex: 1 },
  holdingName: { fontSize: 16, fontWeight: "800", color: "#111" },
  holdingMeta: { color: "#777", marginTop: 6, fontSize: 13 },
  holdingMetaSmall: { color: "#999", fontSize: 12, marginTop: 2 },

  holdingRight: { width: 140, alignItems: "flex-end", justifyContent: "center" },
  holdingGain: { color: "#0a993c", fontWeight: "800", fontSize: 15 },
  holdingGainPct: { color: "#0a993c", fontSize: 13, fontWeight: "600" },
  holdingLtp: { color: "#777", marginTop: 8, fontSize: 13 },
  holdingLtpChange: { color: "#d32f2f", fontSize: 13 },

  /* Info box */
  infoBox: {
    flexDirection: "row",
    backgroundColor: "#fafafa",
    padding: 12,
    marginTop: 10,
    marginHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#eee",
    alignItems: "center",
  },
  infoText: { color: "#777", fontSize: 13, marginLeft: 8, lineHeight: 18 },

  /* Promo card */
  promoCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: 12,
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#eee",
    marginTop: 14,
    alignItems: "center",
  },
  promoLeft: { flex: 1 },
  promoTitle: { fontWeight: "800", fontSize: 16, color: "#111" },
  promoSub: { color: "#666", marginTop: 6 },
  promoLink: { color: "#5B2C6F", marginTop: 8, fontWeight: "700" },
  promoRight: { width: 72, alignItems: "center", justifyContent: "center" },
  promoGraphic: { width: 56, height: 56, borderRadius: 28, backgroundColor: "#f3e9fb" },

  /* Bottom nav */
  bottomNav: {
    height: 68,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingBottom: 6,
  },
  navItem: { alignItems: "center" },
  navText: { color: "#777", fontSize: 12, marginTop: 4 },
  navTextActive: { color: "#111", fontWeight: "700" },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    margin: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e5e5",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  label: {
    fontSize: 13,
    color: "#666",
  },
  value: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
  },
  green: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0a8f08",
  },
  red: {
    fontSize: 15,
    fontWeight: "600",
    color: "#d32f2f",
  },
  divider: {
    height: 1,
    backgroundColor: "#e5e5e5",
    marginVertical: 12,
  },
  stockName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
  },
});
