import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';

const PRODUCERS = [
  {
    id: 1,
    name: 'María González',
    farm: 'Finca El Paraíso',
    type: 'Frutas y Verduras',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1508454868649-abc39873d8bf?q=80&w=400',
    description: 'Cultivamos frutas y verduras orgánicas con amor y dedicación desde hace 20 años.',
  },
  {
    id: 2,
    name: 'Carlos Rodríguez',
    farm: 'Lácteos La Vaca Feliz',
    type: 'Lácteos',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1595872001572-e2fe5ded1f4c?q=80&w=400',
    description: 'Productos lácteos artesanales elaborados con leche de vacas felices en pastoreo.',
  },
  {
    id: 3,
    name: 'José Martínez',
    farm: 'Apiario San José',
    type: 'Miel',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1602321345740-672d44e1d8d0?q=80&w=400',
    description: 'Miel pura y productos apícolas producidos de manera sostenible.',
  },
];

export default function ProducersScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Nuestros Productores</Text>
        <Text style={styles.subtitle}>Conoce a quienes cultivan tus alimentos</Text>
      </View>

      <View style={styles.producersContainer}>
        {PRODUCERS.map((producer) => (
          <TouchableOpacity key={producer.id} style={styles.producerCard}>
            <Image
              source={{ uri: producer.image }}
              style={styles.producerImage}
              contentFit="cover"
              transition={1000}
            />
            <View style={styles.producerInfo}>
              <View style={styles.nameContainer}>
                <Text style={styles.producerName}>{producer.name}</Text>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={16} color="#FFB300" />
                  <Text style={styles.ratingText}>{producer.rating}</Text>
                </View>
              </View>
              <Text style={styles.farmName}>{producer.farm}</Text>
              <Text style={styles.producerType}>{producer.type}</Text>
              <Text style={styles.description}>{producer.description}</Text>
              <TouchableOpacity style={styles.contactButton}>
                <Ionicons name="logo-whatsapp" size={20} color="#FFFFFF" />
                <Text style={styles.contactButtonText}>Contactar</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#2E7D32',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.8,
    marginTop: 5,
  },
  producersContainer: {
    padding: 15,
  },
  producerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  producerImage: {
    width: '100%',
    height: 200,
  },
  producerInfo: {
    padding: 15,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  producerName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    marginLeft: 4,
    color: '#FFB300',
    fontWeight: 'bold',
  },
  farmName: {
    fontSize: 16,
    color: '#2E7D32',
    fontWeight: '500',
    marginBottom: 5,
  },
  producerType: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 15,
  },
  contactButton: {
    backgroundColor: '#25D366',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
  },
  contactButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginLeft: 8,
  },
});