import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView,SafeAreaView } from "react-native";

export default function FundsPage() {
  return (
       <SafeAreaView backgroundColor="#5B2C6F" style={{flex: 1}}  >
     <View style={styles.header}>
              
                <Text style={styles.logo}
            >StockAI</Text>
                <View>
                  <Text style={styles.headerTitle}>Funds</Text>
              
              
                </View>
            
                  </View>
    <ScrollView style={styles.container}>
           
      {/* Total Cash */}
      <View style={styles.section}>
        <View style={styles.row}>
          <View>
            <Text style={styles.title}>Total cash</Text>
            <Text style={styles.subtitle}>All segments</Text>
          </View>
          <Text style={styles.amount}>₹ 9,321.05</Text>
        </View>

        {/* Available to trade */}
        <TouchableOpacity style={styles.row}>
          <Text style={styles.itemText}>Available to trade</Text>
          <Text style={styles.amount}>₹ 9,321.05</Text>
        </TouchableOpacity>

        {/* Margin used */}
        <TouchableOpacity style={styles.row}>
          <Text style={styles.itemText}>Margin used</Text>
          <Text style={styles.amount}>₹ 0.00</Text>
        </TouchableOpacity>

        {/* Unavailable to trade */}
        <TouchableOpacity style={styles.row}>
          <Text style={styles.itemText}>Unavailable to trade</Text>
          <Text style={styles.amount}>₹ 0.00</Text>
        </TouchableOpacity>
      </View>

      {/* Recent transactions */}
      <TouchableOpacity style={styles.section}>
        <Text style={styles.sectionTitle}>Recent transactions</Text>
      </TouchableOpacity>

      {/* Available to withdraw */}
      <TouchableOpacity style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.sectionTitle}>Available to withdraw</Text>
          <Text style={styles.amount}>₹ 9,321.05</Text>
        </View>
      </TouchableOpacity>

      {/* Total collateral */}
      <TouchableOpacity style={styles.section}>
        <View style={styles.row}>
          <View>
            <Text style={styles.sectionTitle}>Total collateral</Text>
            <Text style={styles.subtitle}>Futures & Options</Text>
          </View>
          <Text style={styles.amount}>₹ 0.00</Text>
        </View>
      </TouchableOpacity>

      {/* Offer Banner */}
      <View style={styles.banner}>
        <Text style={styles.bannerText}>
          Get <Text style={styles.bannerHighlight}>₹12,070</Text> in your wallet in just 5 mins!
        </Text>
        <Text style={styles.bannerSub}>Increase your overall buying power</Text>

        <View style={styles.bannerButtons}>
          <TouchableOpacity style={styles.outlineButton}>
            <Text style={styles.outlineText}>Explore Pledge</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.textButton}>
            <Text style={styles.textLink}>Learn more</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Buttons */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.outlineButtonBig}>
          <Text style={styles.outlineText}>Withdraw funds</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filledButtonBig}>
          <Text style={styles.filledText}>Add funds</Text>
        </TouchableOpacity>
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
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  section: {
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
  },
  subtitle: {
    fontSize: 13,
    color: "#777",
  },
  itemText: {
    fontSize: 14,
    color: "#000",
  },
  amount: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
  },
  banner: {
    backgroundColor: "#f9f7ff",
    margin: 16,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#eee",
  },
  bannerText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#000",
  },
  bannerHighlight: {
    color: "#5B2C6F",
    fontWeight: "700",
  },
  bannerSub: {
    fontSize: 13,
    color: "#555",
    marginTop: 4,
    marginBottom: 12,
  },
  bannerButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  outlineButton: {
    borderWidth: 1,
    borderColor: "#5B2C6F",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  outlineText: {
    color: "#5B2C6F",
    fontWeight: "600",
  },
  textButton: {},
  textLink: {
    color: "#5B2C6F",
    fontWeight: "500",
  },
  bottomButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    gap: 12,
  },
  outlineButtonBig: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#5B2C6F",
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: "center",
  },
  filledButtonBig: {
    flex: 1,
    backgroundColor: "#5B2C6F",
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: "center",
  },
  filledText: {
    color: "#fff",
    fontWeight: "600",
  },
});
