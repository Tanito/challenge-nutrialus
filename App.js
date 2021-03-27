import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { API_URL } from './src/constants/constants'

export default function App() {

  const [paciente, setPaciente] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getPaciente()
  }, [])

  const getPaciente = () => {
    setLoading(true)
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setPaciente(data)
      }).catch(e => {
        console.error(e)
      }).finally(() => setLoading(false))
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Datos del paciente</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.photoContainer}>
          <Image
            style={styles.photo}
            source={{
              uri: paciente.image,
            }}
          />
        </View>
        <Text style={styles.label}>Nombre </Text><Text style={styles.field}> {paciente.name}</Text>
        <Text style={styles.label}>E-Mail </Text><Text style={styles.field}> {paciente.email}</Text>
        <Text style={styles.label}>Teléfono </Text><Text style={styles.field}> {paciente.phone}</Text>
        <Text style={styles.label}>Nutricionista </Text><Text style={styles.field}> {paciente.nutritionist}</Text>
        <StatusBar style="auto" />
        <TouchableOpacity style={styles.button}
          onPress={() => getPaciente()}>
          {loading ? <ActivityIndicator color='#fafafa' /> : <Text style={styles.buttonTxt}>Actualizar datos</Text>}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    justifyContent: "flex-start",
    height: 80,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#0CCFCD",
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: "#fafafa",
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 5,
  },
  field: {
    marginBottom: 15,
    fontSize: 18,
  },
  photoContainer: {
    marginBottom: 20,
    width: 200,
    height: 200,
    overflow: 'hidden',
    borderRadius: 200,
  },
  photo: {
    width: "100%",
    height: "100%",
  },
  button: {
    width: 150,
    padding: 20,
    backgroundColor: '#f4a261',
    borderRadius: 10,
    textAlign: 'center',
  },
  buttonTxt: {
    color: '#fafafa',
    fontWeight: '600',

  }
});
