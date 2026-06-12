import React, { useState } from 'react';

import {
  ScrollView,
  SafeAreaView,
  StyleSheet,
  View,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import {
  TextInput,
  Button,
  Text,
  Card,
  Avatar,
  Menu,
} from 'react-native-paper';

import DateTimePicker from '@react-native-community/datetimepicker';

export default function CadastroRemedio({
  navigation,
  adicionarRemedio,
}) {

  const [nome, setNome] = useState('');
  const [dose, setDose] = useState('');
  const [frequencia, setFrequencia] = useState('');
  const [duracao, setDuracao] = useState('');
  const [observacao, setObservacao] = useState('');
  const [tipo, setTipo] = useState('Selecione o tipo')
  const [menuVisible, setMenuVisible] = useState(false);

  const [hora, setHora] = useState(new Date());
  const [dataInicio, setDataInicio] = useState(new Date());

  const [mostrarHora, setMostrarHora] = useState(false);
  const [mostrarData, setMostrarData] = useState(false);

  const formatarHora = (date) =>
    date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

  const formatarData = (date) =>
    date.toLocaleDateString();

  const salvarRemedio = () => {

    if (!nome || !dose || !frequencia || !duracao) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    const freq = parseInt(frequencia) || 0;
    const dur = parseInt(duracao) || 0;

    const inicio = new Date(dataInicio);

    inicio.setHours(hora.getHours());
    inicio.setMinutes(hora.getMinutes());

    const fim = new Date(inicio);

    fim.setDate(fim.getDate() + dur);

    const novo = {
      id: Date.now().toString(),
      nome,
      dose,
      tipo,
      frequencia: freq,
      observacao,
      dataInicio: inicio.getTime(),
      dataFim: fim.getTime(),
      deletado: false,
      alarmeAtivo: true,
    };

    adicionarRemedio(novo);

    navigation.goBack();
  };

  return (

    <SafeAreaView style={styles.safe}>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

          <ScrollView
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >

            <View style={styles.iconContainer}>

              <Avatar.Icon
                size={95}
                icon="pill"
                style={styles.icon}
              />

            </View>

            <Card style={styles.card}>
              <Card.Content>

                <Text style={styles.section}>
                  Informações
                </Text>

                <TextInput
                  label="Nome do Remédio"
                  value={nome}
                  onChangeText={setNome}
                  style={styles.input}
                  mode="outlined"
                  left={<TextInput.Icon icon="pill" />}
                  outlineStyle={styles.outline}
                  activeOutlineColor="#6C4AB6"
                />

                <TextInput
                  label="Dose"
                  value={dose}
                  onChangeText={setDose}
                  style={styles.input}
                  mode="outlined"
                  left={<TextInput.Icon icon="medical-bag" />}
                  outlineStyle={styles.outline}
                  activeOutlineColor="#6C4AB6"
                />

                <Text style={styles.section}>
                  Tipo do Remédio
                </Text>

                <Menu
                  visible={menuVisible}
                  onDismiss={() => setMenuVisible(false)}
                  anchor={
                    <Button
                      mode="outlined"
                      icon="pill"
                      onPress={() => setMenuVisible(true)}
                      style={styles.tipoButton}
                      labelStyle={styles.tipoButtonText}
                      textColor="#6C4AB6"
                    >
                      {tipo}
                    </Button>
                  }
                >
                  <Menu.Item
                    title="💊 Comprimido"
                    onPress={() => {
                      setTipo('💊 Comprimido');
                      setMenuVisible(false);
                    }}
                  />

                  <Menu.Item
                    title="🟡 Cápsula"
                    onPress={() => {
                      setTipo('🟡 Cápsula');
                      setMenuVisible(false);
                    }}
                  />

                  <Menu.Item
                    title="🥤 Xarope"
                    onPress={() => {
                      setTipo('🥤 Xarope');
                      setMenuVisible(false);
                    }}
                  />

                  <Menu.Item
                    title="💧 Gotas"
                    onPress={() => {
                      setTipo('💧 Gotas');
                      setMenuVisible(false);
                    }}
                  />

                  <Menu.Item
                    title="💉 Injeção"
                    onPress={() => {
                      setTipo('💉 Injeção');
                      setMenuVisible(false);
                    }}
                  />

                </Menu>

                <Text style={styles.section}>
                  Horário
                </Text>

                <View style={styles.row}>

                  <Button
                    mode="outlined"
                    icon="clock-outline"
                    onPress={() => setMostrarHora(true)}
                    style={styles.half}
                    labelStyle={styles.buttonLabel}
                    textColor="#6C4AB6"
                  >
                    {formatarHora(hora)}
                  </Button>

                  <Button
                    mode="outlined"
                    icon="calendar"
                    onPress={() => setMostrarData(true)}
                    style={styles.half}
                    labelStyle={styles.buttonLabel}
                    textColor="#6C4AB6"
                  >
                    {formatarData(dataInicio)}
                  </Button>

                </View>

                {mostrarHora && (
                  <DateTimePicker
                    value={hora}
                    mode="time"
                    is24Hour={true}
                    onChange={(event, selectedDate) => {

                      setMostrarHora(false);

                      if (selectedDate) {
                        setHora(selectedDate);
                      }
                    }}
                  />
                )}

                {mostrarData && (
                  <DateTimePicker
                    value={dataInicio}
                    mode="date"
                    onChange={(event, selectedDate) => {

                      setMostrarData(false);

                      if (selectedDate) {
                        setDataInicio(selectedDate);
                      }
                    }}
                  />
                )}

                <Text style={styles.section}>
                  Frequência
                </Text>

                <TextInput
                  label="A cada X horas"
                  value={frequencia}
                  onChangeText={setFrequencia}
                  keyboardType="numeric"
                  style={styles.input}
                  mode="outlined"
                  left={<TextInput.Icon icon="timer-outline" />}
                  outlineStyle={styles.outline}
                  activeOutlineColor="#6C4AB6"
                />

                <TextInput
                  label="Duração (dias)"
                  value={duracao}
                  onChangeText={setDuracao}
                  keyboardType="numeric"
                  style={styles.input}
                  mode="outlined"
                  left={<TextInput.Icon icon="calendar-range" />}
                  outlineStyle={styles.outline}
                  activeOutlineColor="#6C4AB6"
                />

                <TextInput
                  label="Observações"
                  value={observacao}
                  onChangeText={setObservacao}
                  multiline
                  numberOfLines={4}
                  style={styles.input}
                  mode="outlined"
                  left={<TextInput.Icon icon="note-text-outline" />}
                  outlineStyle={styles.outline}
                  activeOutlineColor="#6C4AB6"
                />

                <Button
                  mode="contained"
                  onPress={salvarRemedio}
                  style={styles.button}
                  labelStyle={styles.saveText}
                  buttonColor="#6C4AB6"
                >
                  Salvar Remédio
                </Button>

              </Card.Content>
            </Card>

          </ScrollView>

        </TouchableWithoutFeedback>

      </KeyboardAvoidingView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  safe: {
    flex: 1,
    backgroundColor: '#F3F5F9',
  },

  container: {
    padding: 20,
    paddingBottom: 40,
  },

  iconContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 15,
  },

  icon: {
    backgroundColor: '#6C4AB6',
  },

  title: {
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 25,
    color: '#1F1F1F',
  },

  card: {
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    padding: 8,

    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowOpacity: 0.08,
    shadowRadius: 8,

    elevation: 5,
  },

  section: {
    marginTop: 18,
    marginBottom: 10,
    fontWeight: '700',
    fontSize: 18,
    color: '#222',
  },

  input: {
    marginBottom: 14,
    backgroundColor: '#FFFFFF',
  },

  outline: {
    borderRadius: 18,
    borderColor: '#D9D9D9',
  },

  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 10,
  },

  half: {
    flex: 1,
    borderRadius: 30,
    borderColor: '#C9B8FF',
    paddingVertical: 5,
  },

  buttonLabel: {
    fontSize: 16,
  },

  button: {
    marginTop: 28,
    borderRadius: 35,
    paddingVertical: 7,
  },

  saveText: {
    fontSize: 18,
    fontWeight: '700',
  },
  tipoButton: {
    marginBottom: 14,
    borderRadius: 18,
    borderColor: '#D9D9D9',
  },

  tipoButtonText: {
    fontSize: 16,
  },
});