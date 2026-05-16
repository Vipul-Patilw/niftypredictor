import React ,{useState,useEffect} from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from "axios";
import stockLiveData from "../Hooks/stockLiveData";
export default function Dashboard() {
 const { data, loading } = stockLiveData(2000); // refresh every 2s


  if (loading) {
    return <ActivityIndicator size="large" color="#7b2cbf" style={{ marginTop: 50 }} />;
  }
  return (
    <SafeAreaView style={styles.safeArea} backgroundColor="#5B2C6F">
         <View style={styles.header}>
         

          {/* Search Bar */}
          <View style={styles.searchWrapper}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoText}>StockAI</Text>
            </View>
            <TextInput
              placeholder="Search for a scrip"
              placeholderTextColor="#999"
              style={styles.searchBar}
            />
          </View>
        </View>
      <ScrollView style={styles.container}>

        {/* Top Purple Header */}
     

        {/* Market Status */}
        {/* <Text style={styles.marketStatus}>• Market (EQ) is closed</Text> */}

        {/* Nifty & Bank Nifty */}
        <View style={styles.tickerRow}>
          <View style={styles.tickerBox}>
            <Text style={styles.tickerName}>NIFTY 50</Text>
           <Text style={styles.tabPrice}>{data?.nifty?.price}</Text>
          <Text
            style={[
              styles.tabChange,
              { color: data?.nifty?.change >= 0 ? "#00C853" : "#D50000" } // green for gain, red for loss
            ]}
          >
            {`${data?.nifty?.change} (${data?.nifty?.percent}%)`}
          </Text>
          </View>
          <View style={styles.tickerBox}>
            <Text style={styles.tickerName}>NIFTY BANK</Text>
            <Text style={styles.tabPrice}>{data?.banknifty?.price}</Text>
           <Text
             style={[
               styles.tabChange,
               { color: data?.banknifty?.change >= 0 ? "#00C853" : "#D50000" } // green for gain, red for loss
             ]}
           >
             {`${data?.banknifty?.change} (${data?.banknifty?.percent}%)`}
           </Text>
          </View>
        </View>

        {/* Menu Grid */}
        <View style={styles.menuGrid}>
          {[
            { name: 'F&O', icon: 'swap-vertical' },
            { name: 'Stocks', icon: 'image' },
            { name: 'MF', icon: 'leaf' },
            { name: 'IPO', icon: 'bullhorn-outline' },
            { name: 'FD', icon: 'piggy-bank-outline' },
            { name: 'MTF', icon: 'video', badge: true },
            { name: 'Affordable options', icon: 'map-marker-outline' },
            { name: 'News', icon: 'newspaper' },
            { name: 'Chart 360', icon: 'chart-line' },
            { name: 'More', icon: 'dots-horizontal' }
          ].map((item, idx) => (
            <TouchableOpacity key={idx} style={styles.menuItem}>
              <Icon name={item.icon} size={26} color="#5B2C6F" />
              {item.badge && <View style={styles.redDot} />}
              <Text style={styles.menuText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Advisory Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>ADVISORY</Text>
            <MaterialIcons name="help-outline" size={14} color="#555" />
          </View>

          {/* Tabs */}
          <View style={styles.tabs}>
            {['F&O (4)', 'MTF (0)', 'Intraday (0)'].map((tab, idx) => (
              <Text
                key={idx}
                style={[
                  styles.tabText,
                  idx === 0 && styles.activeTab
                ]}
              >
                {tab}
              </Text>
            ))}
          </View>

          {/* Card */}
          <View style={styles.card}>
            <View style={styles.cardRow}>
              <Text style={styles.cardTitle}>NIFTY 24400 CE 14 AUG 25</Text>
              <Text style={styles.cardPrice}>126.60</Text>
            </View>
            <Text style={styles.cardSub}>08 AUG, 2:32 PM | AlphaMarket</Text>
            <Text style={styles.cardChange}>-158.25 (55.56%)</Text>

            <View style={styles.tradeInfo}>
              <Text>Stop-loss{'\n'}185.00</Text>
              <Text>Entry price{'\n'}143.75</Text>
              <Text>Target{'\n'}80.00</Text>
            </View>

            <Text style={styles.potential}>▲ 42.35% potential</Text>

            <TouchableOpacity style={styles.sellBtn}>
              <Text style={styles.sellBtnText}>Sell now</Text>
            </TouchableOpacity>
          </View>
           <View style={styles.card}>
            <View style={styles.cardRow}>
              <Text style={styles.cardTitle}>NIFTY 25400 CE 17 AUG 25</Text>
              <Text style={styles.cardPrice}>80.70</Text>
            </View>
            <Text style={styles.cardSub}>08 AUG, 2:32 PM | AlphaMarket</Text>
            <Text style={styles.cardChange}>-90.25 (55.56%)</Text>

            <View style={styles.tradeInfo}>
              <Text>Stop-loss{'\n'}50.00</Text>
              <Text>Entry price{'\n'}88.75</Text>
              <Text>Target{'\n'}130.00</Text>
            </View>

            <Text style={styles.potential}>▲ 22.35% potential</Text>

            <TouchableOpacity style={styles.buyBtn}>
              <Text style={styles.sellBtnText}>Buy now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

   
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },

  /** HEADER **/
  header: {
    backgroundColor: '#5B2C6F',
    paddingHorizontal: 12,
    paddingTop: 6,
    paddingBottom: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  time: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600'
  },
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  signalText: {
    color: '#fff',
    fontSize: 12,
    marginRight: 6
  },
  battery: {
    borderWidth: 1,
    borderColor: '#fff',
    paddingHorizontal: 4,
    borderRadius: 4
  },
  batteryText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600'
  },

  /** SEARCH **/
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 12,
    paddingVertical: 6
  },
  logoCircle: {
    backgroundColor: '#eee',
    borderRadius: 50,
    width: 80,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8
  },
  logoText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#5B2C6F'
  },
  searchBar: {
    flex: 1,
    fontSize: 14,
    color: '#333'
  },

  /** MARKET STATUS **/
  marketStatus: {
    fontSize: 12,
    color: '#777',
    marginHorizontal: 12,
    marginVertical: 6
  },

  /** TICKER **/
  tickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    marginBottom: 12
  },
  tickerBox: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 4
  },
  tickerName: {
    fontSize: 12,
    color: '#777',
    fontWeight: '500'
  },
  tickerValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000'
  },
  tickerChange: {
    fontSize: 12,
    color: '#D32F2F'
  },

  /** MENU GRID **/
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    marginTop: 8
  },
  menuItem: {
    width: '18%',
    alignItems: 'center',
    marginVertical: 12
  },
  menuText: {
    fontSize: 10,
    color: '#333',
    textAlign: 'center',
    marginTop: 4
  },
  redDot: {
    position: 'absolute',
    top: -2,
    right: 14,
    backgroundColor: 'red',
    width: 8,
    height: 8,
    borderRadius: 4
  },

  /** SECTION **/
  section: {
    marginTop: 12,
    paddingHorizontal: 12
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    marginRight: 4
  },

  /** TABS **/
  tabs: {
    flexDirection: 'row',
    marginBottom: 8
  },
  tabText: {
    fontSize: 12,
    color: '#777',
    marginRight: 14
  },
  activeTab: {
    color: '#5B2C6F',
    fontWeight: '700'
  },

  /** CARD **/
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 16
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '700'
  },
  cardPrice: {
    fontSize: 14,
    fontWeight: '700'
  },
  cardSub: {
    fontSize: 10,
    color: '#777'
  },
  cardChange: {
    fontSize: 12,
    color: '#D32F2F',
    marginVertical: 4
  },
  tradeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6
  },
  potential: {
    fontSize: 12,
    color: '#388E3C',
    marginTop: 6
  },
  sellBtn: {
    backgroundColor: '#D32F2F',
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 8
  },
   buyBtn: {
    backgroundColor: '#388E3C',
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 8
  },
  sellBtnText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700'
  },

  /** BOTTOM NAV **/
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff'
  },
  navItem: {
    alignItems: 'center'
  },
  navText: {
    fontSize: 10,
    color: '#666',
    marginTop: 2
  },
  navTextActive: {
    color: '#5B2C6F',
    fontWeight: '700'
  }
});
