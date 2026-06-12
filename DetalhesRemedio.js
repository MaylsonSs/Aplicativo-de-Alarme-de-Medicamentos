import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

import {
  Card,
  Button,
  Avatar,
  Divider,
  Switch,
  IconButton,
} from 'react-native-paper';

export default function DetalhesRemedio({
  route,
  navigation,
}) {

  const { remedio } = route.params;

  const formatarHora = (date) => {

    return new Date(date).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatarData = (date) => {

    return new Date(date).toLocaleDateString();
  };

  return (

    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >

      <View style={styles.header}>


      </View>

      <Card style={styles.topCard}>

        <Card.Content style={styles.topContent}>

          <View style={styles.iconBox}>

            <Avatar.Icon
              size={52}
              icon="pill"
              style={styles.icon}
            />

          </View>

          <View style={styles.remedioInfo}>

            <Text style={styles.title}>
              {remedio.nome}
            </Text>

            <View style={styles.tipoBadge}>

              <Text style={styles.tipoText}>
                Medicamento
              </Text>

            </View>

          </View>

        </Card.Content>

      </Card>

      <Card style={styles.infoCard}>

        <Card.Content>

          <View style={styles.infoGrid}>

            <View style={styles.infoItem}>

              <Avatar.Icon
                size={42}
                icon="medical-bag"
                style={styles.smallIcon}
                color="#7B61FF"
              />

              <Text style={styles.infoLabel}>
                Dose
              </Text>

              <Text style={styles.infoValue}>
                {remedio.dose}
              </Text>

            </View>

            <Divider style={styles.dividerVertical} />

            <View style={styles.infoItem}>

              <Avatar.Icon
                size={42}
                icon="refresh"
                style={styles.smallIcon}
                color="#7B61FF"
              />

              <Text style={styles.infoLabel}>
                Frequência
              </Text>

              <Text style={styles.infoValue}>
                {remedio.frequencia}h
              </Text>

            </View>

            <Divider style={styles.dividerVertical} />

            <View style={styles.infoItem}>

              <Avatar.Icon
                size={42}
                icon="clock-outline"
                style={styles.smallIcon}
                color="#7B61FF"
              />

              <Text style={styles.infoLabel}>
                Última dose
              </Text>

              <Text style={styles.infoValue}>
                {formatarHora(remedio.dataInicio)}
              </Text>

            </View>

          </View>

          <Divider style={styles.dividerHorizontal} />

          <View style={styles.dateContainer}>

            <View style={styles.dateBox}>

              <Avatar.Icon
                size={40}
                icon="calendar-start"
                style={styles.smallIcon}
                color="#7B61FF"
              />

              <Text style={styles.dateLabel}>
                Início
              </Text>

              <Text style={styles.dateValue}>
                {formatarData(remedio.dataInicio)}
              </Text>

            </View>

            <View style={styles.dateBox}>

              <Avatar.Icon
                size={40}
                icon="calendar-end"
                style={styles.smallIcon}
                color="#7B61FF"
              />

              <Text style={styles.dateLabel}>
                Fim
              </Text>

              <Text style={styles.dateValue}>
                {formatarData(remedio.dataFim)}
              </Text>

            </View>

          </View>

        </Card.Content>

      </Card>

      <Card style={styles.obsCard}>

        <Card.Content>

          <View style={styles.obsHeader}>

            <Avatar.Icon
              size={40}
              icon="note-text-outline"
              style={styles.smallIcon}
              color="#7B61FF"
            />

            <Text style={styles.obsTitle}>
              Observações
            </Text>

          </View>

          <Text style={styles.obsText}>
            {remedio.observacao || 'Nenhuma observação'}
          </Text>

        </Card.Content>

      </Card>

      <Card style={styles.alertCard}>

        <Card.Content style={styles.alertContent}>

          <View style={styles.alertLeft}>

            <Avatar.Icon
              size={46}
              icon="bell-outline"
              style={styles.alertIcon}
              color="#7B61FF"
            />

            <View>

              <Text style={styles.alertTitle}>
                Lembrete ativo
              </Text>

              <Text style={styles.alertSubtitle}>
                Notificações habilitadas
              </Text>

            </View>

          </View>

          <Switch
            value={true}
            color="#7B61FF"
          />

        </Card.Content>

      </Card>


    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
    padding: 18,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
    marginTop: 10,
  },

  headerTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#111827',
  },

  topCard: {
    borderRadius: 28,
    marginBottom: 18,
    backgroundColor: '#F3EEFF',
    elevation: 2,
  },

  topContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },

  iconBox: {
    width: 95,
    height: 95,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  icon: {
    backgroundColor: '#6C4AB6',
  },

  remedioInfo: {
    marginLeft: 20,
    flex: 1,
  },

  title: {
    fontSize: 34,
    fontWeight: '700',
    color: '#111827',
  },

  tipoBadge: {
    marginTop: 10,
    backgroundColor: '#E9E1FF',
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },

  tipoText: {
    color: '#6C4AB6',
    fontWeight: '700',
    fontSize: 14,
  },

  infoCard: {
    borderRadius: 28,
    marginBottom: 18,
    backgroundColor: '#FFFFFF',
    elevation: 2,
  },

  infoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  infoItem: {
    flex: 1,
    alignItems: 'center',
  },

  dividerVertical: {
    width: 1,
    height: 120,
    backgroundColor: '#ECECEC',
  },

  dividerHorizontal: {
    marginVertical: 22,
    backgroundColor: '#ECECEC',
  },

  smallIcon: {
    backgroundColor: '#F1ECFF',
    marginBottom: 10,
  },

  infoLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },

  infoValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#6C4AB6',
  },

  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  dateBox: {
    flex: 1,
    alignItems: 'center',
  },

  dateLabel: {
    marginTop: 8,
    fontSize: 15,
    color: '#666',
  },

  dateValue: {
    marginTop: 5,
    fontSize: 22,
    fontWeight: '700',
    color: '#6C4AB6',
  },

  obsCard: {
    borderRadius: 28,
    marginBottom: 18,
    backgroundColor: '#FFFFFF',
    elevation: 2,
  },

  obsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },

  obsTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginLeft: 12,
    color: '#111827',
  },

  obsText: {
    fontSize: 18,
    color: '#444',
    lineHeight: 28,
  },

  alertCard: {
    borderRadius: 28,
    marginBottom: 24,
    backgroundColor: '#F5F0FF',
    elevation: 1,
  },

  alertContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  alertLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  alertIcon: {
    backgroundColor: '#ECE3FF',
    marginRight: 14,
  },

  alertTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },

  alertSubtitle: {
    marginTop: 4,
    color: '#666',
    fontSize: 15,
  },

  editButton: {
    borderRadius: 35,
    paddingVertical: 8,
    marginBottom: 16,
  },

  buttonText: {
    fontSize: 18,
    fontWeight: '700',
  },

  deleteButton: {
    borderRadius: 35,
    paddingVertical: 8,
    borderColor: '#FFB3B3',
    marginBottom: 10,
  },

  deleteText: {
    fontSize: 18,
    fontWeight: '700',
  },

  backButton: {
    marginBottom: 30,
  },

  backText: {
    fontSize: 18,
    color: '#6C4AB6',
  },

});