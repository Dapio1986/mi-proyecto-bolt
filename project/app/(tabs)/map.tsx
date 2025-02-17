import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Only import MapView when not on web
let MapView: any;
let Marker: any;

if (Platform.OS !== 'web') {
  const Maps = require('react-native-maps');
  MapView = Maps.default;
  Marker = Maps.Marker;
}

const SAMPLE_PRODUCERS = [
  {
    id: 1,
    name: 'Finca El Paraíso',
    latitude: 3.697,
    longitude: -76.436,
    type: 'Frutas y Verduras',
  },
  {
    id: 2,
    name: 'Lácteos La Vaca Feliz',
    latitude: 3.699,
    longitude: -76.438,
    type: 'Lácteos',
  },
  {
    id: 3,
    name: 'Apiario San José',
    latitude: 3.695,
    longitude: -76.434,
    type: 'Miel',
  },
];

export default function MapScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    if (Platform.OS !== 'web') {
      (async () => {
        const Location = require('expo-location');
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Se requiere permiso para acceder a la ubicación');
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      })();
    }
  }, []);

  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        <View style={styles.webMapPlaceholder}>
          <Ionicons name="map-outline" size={64} color="#666" />
          <Text style={styles.webMapText}>
            El mapa está disponible en la aplicación móvil
          </Text>
          <Text style={styles.webMapSubtext}>
            Descarga nuestra app para ver la ubicación de los productores
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {errorMsg ? (
        <Text style={styles.errorText}>{errorMsg}</Text>
      ) : (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 3.697,
            longitude: -76.436,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          {SAMPLE_PRODUCERS.map((producer) => (
            <Marker
              key={producer.id}
              coordinate={{
                latitude: producer.latitude,
                longitude: producer.longitude,
              }}
              title={producer.name}
              description={producer.type}
            />
          ))}
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  webMapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  webMapText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    textAlign: 'center',
  },
  webMapSubtext: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
    textAlign: 'center',
  },
});