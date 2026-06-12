import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';

import {
  Card,
  FAB,
  IconButton,
  Avatar,
  Switch,
} from 'react-native-paper';

import { Swipeable } from 'react-native-gesture-handler';

export default function ListaRemedios({
  navigation,
  remedios,
  removerRemedio,
  alternarAlarme,
}) {

  const [tick, setTick] = useState(false);

  useEffect(() => {

    const interval = setInterval(() => {
      setTick((prev) => !prev);
    }, 60000);

    return () => clearInterval(interval);

  }, []);

  const calcularProximoHorario = (remedio) => {

    let atual = new Date(remedio.dataInicio);

    const agora = new Date();

    while (atual <= agora) {

      atual = new Date(
        atual.getTime() +
        remedio.frequencia * 60 * 60 * 1000
      );
    }

    return atual;
  };

  const ativos = remedios
    .filter(
      (r) =>
        !r.deletado &&
        new Date(r.dataFim) >= new Date()
    )
    .sort(
      (a, b) =>
        calcularProximoHorario(a) -
        calcularProximoHorario(b)
    );

  const formatarHora = (date) => {

    if (!date) return '--:--';

    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderItem = ({ item, index }) => {

    const proximo = calcularProximoHorario(item);

    const atrasado = proximo < new Date();

    const cores = [
      '#EEE5FF',
      '#DFF8F2',
      '#FFF3D6',
      '#FFE1EC',
    ];

    const iconColors = [
      '#7B61FF',
      '#45D0A1',
      '#F2B400',
      '#FF5E8A',
    ];

    const backgroundColor =
      cores[index % cores.length];

    const iconColor =
      iconColors[index % iconColors.length];

    const obterIconeRemedio = (tipo) => {
      switch (tipo) {
        case '💊 Comprimido':
          return 'pill';

        case '🟡 Cápsula':
          return 'circle';

        case '💧 Gotas':
          return 'water';

        case '💉 Injeção':
          return 'needle';

        case '🧴 Pomada':
          return 'tube';

        case '🥤 Xarope':
          return 'cup';

        default:
          return 'pill';
      }
    };
    return (

      <Swipeable
        renderRightActions={() => (

          <View style={styles.deleteContainer}>

            <IconButton
              icon="delete"
              iconColor="#fff"
              containerColor="#FF4D4F"
              size={28}
              onPress={() => removerRemedio(item.id)}
            />

          </View>
        )}
      >

        <Card
          style={styles.card}
          onPress={() =>
            navigation.navigate(
              'Detalhes',
              { remedio: item }
            )
          }
        >

          <Card.Content>

            <View style={styles.topRow}>

              <View
                style={[
                  styles.iconBox,
                  { backgroundColor },
                ]}
              >

                <Avatar.Icon
                  size={42}
                  icon={obterIconeRemedio(item.tipo)}
                  style={{
                    backgroundColor: 'transparent',
                  }}
                  color={iconColor}
                />

              </View>

              <View style={styles.infoContainer}>

                <Text style={styles.nome}>
                  {item.nome}
                </Text>

                <Text style={styles.subInfo}>
                  {item.dose} - {item.tipo}
                </Text>

              </View>

              <Switch
                  value={item.alarmeAtivo ?? true}
                  color="#7B61FF"
                  onValueChange={() =>
                    alternarAlarme(item.id)
                  }
                />

            </View>

            <View style={styles.bottomRow}>

              <Text style={styles.hora}>

                {atrasado
                  ? '⚠️ Atrasado'
                  : formatarHora(proximo)}

              </Text>

              <View style={styles.freqContainer}>

                <IconButton
                  icon="refresh"
                  size={18}
                  iconColor="#7B61FF"
                  style={{ margin: 0 }}
                />

                <Text style={styles.freqText}>
                  A cada {item.frequencia}h
                </Text>

              </View>

            </View>

          </Card.Content>

        </Card>

      </Swipeable>
    );
  };

  return (

    <View style={styles.container}>

      <View style={styles.header}>

        <View>

          <Text style={styles.subtitle}>
            Gerencie seus lembretes
          </Text>

        </View>

      </View>

      {ativos.length === 0 ? (

        <View style={styles.empty}>

          <Avatar.Icon
            size={90}
            icon="pill"
            style={styles.emptyIcon}
          />

          <Text style={styles.emptyTitle}>
            Nenhum remédio ativo
          </Text>

          <Text style={styles.emptyText}>
            Adicione um remédio para começar
          </Text>

        </View>

      ) : (

        <FlatList
          data={ativos}
          keyExtractor={(item) =>
            item.id.toString()
          }
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 120,
          }}
        />

      )}

      <FAB
        icon="plus"
        style={styles.fab}
        color="#fff"
        onPress={() =>
          navigation.navigate(
            'CadastroRemedio'
          )
        }
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
    paddingHorizontal: 18,
    paddingTop: 20,
  },

  header: {
    marginBottom: 25,
  },

  title: {
    fontSize: 34,
    fontWeight: '700',
    color: '#111827',
  },

  subtitle: {
    fontSize: 16,
    color: '#7B7B8B',
    marginTop: 5,
  },

  card: {
    marginBottom: 18,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',

    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowOpacity: 0.06,
    shadowRadius: 8,

    elevation: 4,
  },

  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconBox: {
    width: 72,
    height: 72,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },

  infoContainer: {
    flex: 1,
    marginLeft: 16,
  },

  nome: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },

  subInfo: {
    fontSize: 16,
    color: '#7A7A89',
    marginTop: 4,
  },

  bottomRow: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  hora: {
    fontSize: 34,
    fontWeight: '700',
    color: '#7B61FF',
  },

  freqContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  freqText: {
    fontSize: 15,
    color: '#6B7280',
  },

  fab: {
    position: 'absolute',
    right: 25,
    bottom: 35,
    backgroundColor: '#7B61FF',
    borderRadius: 100,
  },

  deleteContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },

  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
  },

  emptyIcon: {
    backgroundColor: '#EEE5FF',
  },

  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 20,
    color: '#111827',
  },

  emptyText: {
    fontSize: 16,
    color: '#7A7A89',
    marginTop: 8,
  },

});