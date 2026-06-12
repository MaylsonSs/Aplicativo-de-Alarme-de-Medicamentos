import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';

export default function Dashboard({ remedios }) {
  const total = remedios.length;

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>Resumo</Text>
          <Text>Total de remédios: {total}</Text>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  card: {
    marginBottom: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});