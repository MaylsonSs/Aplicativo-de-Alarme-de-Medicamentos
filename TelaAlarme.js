import React from 'react';

import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import {
  Button,
  Avatar,
  Card,
} from 'react-native-paper';

export default function TelaAlarme({
  route,
  navigation,
}) {

  const { remedio } = route.params;

  const confirmarTomado = async () => {

    navigation.goBack();

  };

  const pegarIcone = () => {

    switch (remedio.tipo) {

      case 'Comprimido':
        return 'pill';

      case 'Cápsula':
        return 'capsule';

      case 'Xarope':
        return 'cup-water';

      case 'Injeção':
        return 'needle';

      case 'Pomada':
        return 'tube';

      case 'Gotas':
        return 'eyedropper';

      default:
        return 'pill';
    }
  };

  return (

    <View style={styles.container}>

      <Card style={styles.card}>

        <Card.Content>

          <Avatar.Icon
            size={110}
            icon={pegarIcone()}
            style={styles.icon}
          />

          <Text style={styles.titulo}>
            Hora do Remédio
          </Text>

          <Text style={styles.nome}>
            {remedio.nome}
          </Text>

          <Text style={styles.tipo}>
            {remedio.tipo}
          </Text>

          <Text style={styles.dose}>
            {remedio.dose}
          </Text>

          <Button
            mode="contained"
            buttonColor="#7B61FF"
            style={styles.botao}
            onPress={confirmarTomado}
          >
            Tomei
          </Button>

        </Card.Content>

      </Card>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
  },

  card: {
    width: '100%',
    borderRadius: 30,
    paddingVertical: 25,
    backgroundColor: '#FFFFFF',

    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 5,
    },

    shadowOpacity: 0.08,
    shadowRadius: 10,

    elevation: 5,
  },

  icon: {
    alignSelf: 'center',
    backgroundColor: '#EEE5FF',
    marginBottom: 25,
  },

  titulo: {
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
    color: '#111827',
  },

  nome: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 20,
    color: '#7B61FF',
  },

  tipo: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 8,
    color: '#6B7280',
  },

  dose: {
    fontSize: 22,
    textAlign: 'center',
    marginTop: 15,
    fontWeight: '600',
    color: '#111827',
  },

  botao: {
    marginTop: 35,
    borderRadius: 30,
    paddingVertical: 8,
  },

});