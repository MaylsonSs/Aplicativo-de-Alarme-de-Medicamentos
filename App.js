import React, { useState, useEffect, useRef } from 'react';
import { NavigationContainer,   createNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Platform } from 'react-native';
import { Audio } from 'expo-av';

import { Provider as PaperProvider,   MD3LightTheme, } from 'react-native-paper';

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

import ListaRemedios from './ListaRemedios';
import CadastroRemedio from './Cadastro Remédio';
import DetalhesRemedio from './DetalhesRemedio';
import TelaAlarme from './TelaAlarme';

const Stack = createNativeStackNavigator();
const navigationRef = createNavigationContainerRef();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    onSurface: '#000000',
    onSurfaceVariant: '#555555',
  },
};

export default function App() {
  const [remedios, setRemedios] = useState([]);

  useEffect(() => {
    carregarRemedios();
    pedirPermissao();
  }, []);

  useEffect(() => {

  const subscription =
    Notifications.addNotificationResponseReceivedListener(
      async (response) => {

        const remedio =
          response.notification.request.content.data.remedio;

        await tocarAlarme();

        if (navigationRef.isReady()) {

          navigationRef.navigate(
            'TelaAlarme',
            { remedio }
          );

        }
      }
    );

  return () => subscription.remove();

}, []);

  const pedirPermissao = async () => {
    await Notifications.requestPermissionsAsync();

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'Remédios',
        importance: Notifications.AndroidImportance.HIGH,
      });
    }
  };

  const carregarRemedios = async () => {
    const data = await AsyncStorage.getItem('remedios');

    if (data) {
      setRemedios(JSON.parse(data));
    }
  };

  const salvarStorage = async (lista) => {
    await AsyncStorage.setItem(
      'remedios',
      JSON.stringify(lista)
    );
  };

  const somAtual = useRef(null);

  const tocarAlarme = async () => {

    const { sound } =
      await Audio.Sound.createAsync(
        require('./assets/alarme.mp3')
      );

    somAtual.current = sound;

    await sound.setIsLoopingAsync(true);

    await sound.playAsync();

    return sound;
  };

  const pararAlarme = async () => {

    if (somAtual.current) {

      await somAtual.stopAsync();

      await somAtual.unloadAsync();

      somAtual.current = null;
    }
  };

  const agendarNotificacoes = async (remedio) => {
    let notificacoesIds = [];

    let atual = new Date(remedio.dataInicio);
    const fim = new Date(remedio.dataFim);

    let limite = 100;

    while (
      atual <= fim &&
      notificacoesIds.length < limite
    ) {

      if (atual > new Date()) {

        const id =
          await Notifications.scheduleNotificationAsync({
            content: {
              title: 'Hora do remédio 💊',
              body: `${remedio.nome} - ${remedio.dose}`,

              data: {
                remedio,
              },
            },
            trigger: {
              type: 'date',
              date: atual,
              channelId: 'default',
            },
          });

        notificacoesIds.push(id);
      }

      atual = new Date(
        atual.getTime() +
        remedio.frequencia * 60 * 60 * 1000
      );
    }

    return notificacoesIds;
  };

  const cancelarNotificacoes = async (ids = []) => {
    for (let id of ids) {
      await Notifications.cancelScheduledNotificationAsync(
        id
      );
    }
  };

  const adicionarRemedio = async (remedio) => {

    const notificacoesIds =
      await agendarNotificacoes(remedio);

    const novo = {
      ...remedio,
      notificacoesIds,
      alarmeAtivo: true,
    };

    const novaLista = [
      ...remedios,
      novo,
    ];

    setRemedios(novaLista);

    await salvarStorage(novaLista);
  };

  const removerRemedio = async (id) => {

    const alvo = remedios.find(
      (r) => r.id === id
    );

    if (alvo?.notificacoesIds) {
      await cancelarNotificacoes(
        alvo.notificacoesIds
      );
    }

    const novaLista = remedios.map((r) =>
      r.id === id
        ? { ...r, deletado: true }
        : r
    );

    setRemedios(novaLista);

    await salvarStorage(novaLista);
  };

  const alternarAlarme = async (id) => {

  const listaAtualizada = [...remedios];

  const index = listaAtualizada.findIndex(
    (r) => r.id === id
  );

  if (index === -1) return;

  const remedio = listaAtualizada[index];

  // Atualiza a tela imediatamente
  remedio.alarmeAtivo = !remedio.alarmeAtivo;

  setRemedios([...listaAtualizada]);

  await salvarStorage(listaAtualizada);

  // Depois executa o trabalho pesado
  if (!remedio.alarmeAtivo) {

    if (remedio.notificacoesIds) {

      await cancelarNotificacoes(
        remedio.notificacoesIds
      );

      remedio.notificacoesIds = [];
    }

  } else {

    const novasNotificacoes =
      await agendarNotificacoes(remedio);

    remedio.notificacoesIds =
      novasNotificacoes;

    setRemedios([...listaAtualizada]);

    await salvarStorage(listaAtualizada);
  }
};

  return (
    <PaperProvider theme={theme}>

      <GestureHandlerRootView style={{ flex: 1 }}>

        <NavigationContainer ref={navigationRef}>

          <Stack.Navigator>

            <Stack.Screen
              name="ListaRemedios"
              options={{
                title: 'Lista de Remédios',
                headerTitleAlign: 'center',
              }}
            >
              {(props) => (
                <ListaRemedios
                  {...props}
                  remedios={remedios}
                  removerRemedio={removerRemedio}
                  alternarAlarme={alternarAlarme}
                />
              )}
            </Stack.Screen>

            <Stack.Screen
              name="TelaAlarme"
              component={TelaAlarme}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="CadastroRemedio"
              options={{
                title: 'Cadastrar Remédio',
                headerTitleAlign: 'center',
              }}
            >
              {(props) => (
                <CadastroRemedio
                  {...props}
                  adicionarRemedio={adicionarRemedio}
                />
              )}
            </Stack.Screen>

            <Stack.Screen
              name="Detalhes"
              component={DetalhesRemedio}
              options={{
                title: 'Detalhes',
                headerTitleAlign: 'center',
              }}
            />

          </Stack.Navigator>

        </NavigationContainer>

      </GestureHandlerRootView>

    </PaperProvider>
  );
}