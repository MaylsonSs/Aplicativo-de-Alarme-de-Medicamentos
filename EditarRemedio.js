import React, { useState } from 'react';
import {
  ScrollView,
  SafeAreaView,
  StyleSheet
} from 'react-native';

import {
  TextInput,
  Button,
  Text,
  Card
} from 'react-native-paper';

export default function EditarRemedio({ route, navigation }) {
  const { remedio, salvarEdicao } = route.params;

  const [nome, setNome] = useState(remedio.nome);
  const [dose, setDose] = useState(remedio.dose);
  const [observacao, setObservacao] = useState(remedio.observacao || '');

  const salvar = () => {
    if (!nome || !dose) {
      alert("Preencha os campos!");
      return;
    }

    salvarEdicao({
      ...remedio,
      nome,
      dose,
      observacao
    });

    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>✏️ Editar Remédio</Text>

        <Card style={styles.card}>
          <Card.Content>

            <TextInput
              label="Nome"
              value={nome}
              onChangeText={setNome}
              style={styles.input}
              mode="outlined"
            />

            <TextInput
              label="Dose"
              value={dose}
              onChangeText={setDose}
              style={styles.input}
              mode="outlined"
            />

            <TextInput
              label="Observações"
              value={observacao}
              onChangeText={setObservacao}
              multiline
              style={styles.input}
              mode="outlined"
            />

            <Button
              mode="contained"
              onPress={salvar}
              style={styles.button}
            >
              Salvar Alterações
            </Button>

            <Button
              mode="text"
              onPress={() => navigation.goBack()}
            >
              Cancelar
            </Button>

          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F5F7FA'
  },
  container: {
    padding: 20
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1565C0',
    textAlign: 'center'
  },
  card: {
    borderRadius: 15,
    elevation: 4
  },
  input: {
    marginBottom: 15
  },
  button: {
    marginTop: 10,
    padding: 5
  }
});