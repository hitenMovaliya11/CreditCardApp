import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NoDataFound = () => {
  return (
    <View style={styles.noDataContainer}>
      <Text style={styles.noDataText}>No data found</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#252525',
  },
  noDataText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});

export default NoDataFound;
