import React ,{useState,useEffect} from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, StatusBar,ActivityIndicator } from 'react-native';
import axios from "axios";
import stockLiveData from "../Hooks/stockLiveData";
export default function Watchlist() {

 const { data, loading } = stockLiveData(2000); // refresh every 2s

  if (loading) {
    return <ActivityIndicator size="large" color="#7b2cbf" style={{ marginTop: 50 }} />;
  }
  const data_all_stocks = [
    { name: 'SENSEX', index: 'BSE INDEX', price: '79,857.79', change: '-765.47 (0.95%)' },
    { name: 'MIDCAP', index: 'BSE INDEX', price: '44,570.89', change: '-708.18 (1.56%)' },
    { name: 'BHARTIARTL', index: 'NSE EQ', price: '1,858.60', change: '-64.00 (3.33%)' },
    { name: 'NIFTY MIDCAP 50', index: 'NSE INDEX', price: '15,785.60', change: '-248.45 (1.55%)' },
    { name: 'NIFTY MIDCAP 150', index: 'NSE INDEX', price: '20,848.25', change: '-303.85 (1.44%)' },
    { name: 'NIFTY MIDCAP 100', index: 'NSE INDEX', price: '56,002.20', change: '-936.10 (1.64%)' },
    { name: 'NIFTY BANK', index: 'NSE INDEX', price: '55,004.90', change: '-516.25 (0.93%)' },
  ];

  return (
    <SafeAreaView backgroundColor="#5B2C6F"   >
      <StatusBar backgroundColor="#5B2C6F"  />
          {/* Header */}
             
      <View style={styles.header}>
  
    <Text style={styles.logo}
>StockAI</Text>
    <View>
      <Text style={styles.headerTitle}>Nifty ▼</Text>
      <Text style={styles.subTitle}>7 scrips · List by You</Text>
    </View>

      </View>
<View backgroundColor="#ffffff">
  

      {/* Tabs */}
    <View style={styles.tabRow}>
  <View style={styles.tab}>
    <Text style={styles.tabTitle}>NIFTY 50</Text>
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

  {/* Separator line */}
  <View style={styles.separator} />

  <View style={styles.tab}>
    <Text style={styles.tabTitle}>NIFTY BANK</Text>
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

      {/* Stock List */}
      <ScrollView style={styles.list}>
        {data_all_stocks.map((item, index) => (
          <View key={index} style={styles.row}>
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.index}>{item.index}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.price}>{item.price}</Text>
              <Text style={styles.change}>{item.change}</Text>
            </View>
          </View>
        ))}

        {/* Related News */}
        <Text style={styles.related}>RELATED NEWS ▼</Text>
      </ScrollView>
</View>
  
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
  subTitle: {
    color: '#d1c5ed',
    fontSize: 12,
  },
  tabRow: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    justifyContent: 'space-around',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  tab: {
    alignItems: 'center',
  },
  separator: {
  width: 1,
  height: '80%',
  backgroundColor: '#ccc', // light gray line like in Upstox
},
  tabTitle: {
    fontWeight: '500',
    fontSize: 12,
    color: '#888',
  },
  tabPrice: {
    fontWeight: '600',
    fontSize: 16,
    color: '#d1392c',
  },
  tabChange: {
    fontSize: 12,
    color: '#888',
  },
  list: {
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.8,
    borderColor: '#eee',
    paddingVertical: 16,
  },
  name: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
  index: {
    fontSize: 12,
    color: '#777',
    marginTop: 2,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#d1392c',
  },
  change: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  related: {
    fontSize: 12,
    color: '#a38a3f',
    marginTop: 16,
    fontWeight: '600',
  },
});
