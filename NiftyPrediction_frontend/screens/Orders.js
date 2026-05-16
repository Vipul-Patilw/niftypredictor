import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView,SafeAreaView ,StatusBar} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";

export default function Orders() {
  const [activeTab, setActiveTab] = useState("Regular");
  const [activeStatus, setActiveStatus] = useState("Open");

  const tabs = ["Regular",  "GTT"];
  const statuses = ["Open", "Closed", "All"];

  return (
    <SafeAreaView backgroundColor="#5B2C6F" style={styles.container}  >
      <StatusBar backgroundColor="#5B2C6F"  />
      {/* HEADER */}

     <View style={styles.header}>
      
        <Text style={styles.logo}
    >StockAI</Text>
        <View>
          <Text style={styles.headerTitle}>Orders</Text>
      
      
        </View>
    
          </View>

      {/* TAB BAR */}
      <View style={styles.tabBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {tabs.map((tab) => (
            <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)} style={styles.tabButton}>
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                {tab}
              </Text>
              {activeTab === tab && <View style={styles.tabUnderline} />}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* STATUS TOGGLE */}
      <View style={styles.statusRow}>
        {statuses.map((status) => (
          <TouchableOpacity
            key={status}
            style={[styles.statusButton, activeStatus === status && styles.statusActive]}
            onPress={() => setActiveStatus(status)}
          >
            <Text
              style={[styles.statusText, activeStatus === status && styles.statusTextActive]}
            >
              {status}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* EMPTY STATE */}
      <View style={styles.emptyState}>
        <View style={styles.emptyIcon}>
          <Feather name="compass" size={40} color="#ccc" />
        </View>
        <Text style={styles.emptyTitle}>You haven’t placed any Regular orders today</Text>
        <Text style={styles.emptySubtitle}>
          Visit My Lists to find a stock to trade in
        </Text>
        <TouchableOpacity style={styles.goButton}>
          <Text style={styles.goButtonText}>Go to My Lists</Text>
        </TouchableOpacity>
      </View>

    
    </SafeAreaView>
  );
}
// backgroundColor: "#fff"
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#5B2C6F" },

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
  subTitle: {
    color: '#d1c5ed',
    fontSize: 12,
  },
  icon: { marginLeft: 14 },

  // TAB BAR
  tabBar: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#fff",
  },
  tabButton: { alignItems: "center", paddingHorizontal: 16, paddingVertical: 10 },
  tabText: { fontSize: 14, color: "#666" },
  tabTextActive: { color: "#000", fontWeight: "600" },
  tabUnderline: {
    marginTop: 4,
    height: 2,
    backgroundColor: "#000",
    width: "100%",
    borderRadius: 2,
  },

  // STATUS TOGGLE
  statusRow: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#fff"
  },
  statusButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 8,
  },
  statusActive: {
    backgroundColor: "#5B2C6F",
    borderColor: "#5B2C6F",
  },
  statusText: { fontSize: 14, color: "#000" },
  statusTextActive: { color: "#fff" },

  // EMPTY STATE
  emptyState: { flex: 1, justifyContent: "center", alignItems: "center",backgroundColor: "#fff" },
  emptyIcon: { marginBottom: 16 },
  emptyTitle: { fontSize: 16, fontWeight: "500", textAlign: "center", marginBottom: 8 },
  emptySubtitle: { fontSize: 14, color: "#666", textAlign: "center", marginBottom: 16 },
  goButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  goButtonText: { fontSize: 14, fontWeight: "500" },

  // BOTTOM NAVIGATION
  bottomNav: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingVertical: 8,
    justifyContent: "space-around",
  },
  navItem: { alignItems: "center" },
  navText: { fontSize: 12, color: "#666" },
  navActive: { color: "#000", fontWeight: "600" },
});
