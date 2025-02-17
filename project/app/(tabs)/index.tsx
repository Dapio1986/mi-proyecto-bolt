import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, useWindowDimensions, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { BlurView } from 'expo-blur';

const CATEGORIES = [
  { id: 1, name: 'Frutas', icon: '🍎', color: '#FFE0E0' },
  { id: 2, name: 'Verduras', icon: '🥬', color: '#E0FFE0' },
  { id: 3, name: 'Lácteos', icon: '🥛', color: '#E0E0FF' },
  { id: 4, name: 'Artesanías', icon: '🎨', color: '#FFE0FF' },
  { id: 5, name: 'Miel', icon: '🍯', color: '#FFFFE0' },
];

const FEATURED_PRODUCTS = [
  {
    id: 1,
    name: 'Aguacates Hass Orgánicos',
    producer: 'Finca El Paraíso',
    price: '12.000',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1601039641847-7857b994d704?q=80&w=800',
    description: 'Aguacates frescos cultivados sin pesticidas, perfectos para ensaladas y guacamole.',
  },
  {
    id: 2,
    name: 'Queso Campesino Artesanal',
    producer: 'Lácteos La Vaca Feliz',
    price: '8.000',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1634487359989-3e90c9432133?q=80&w=800',
    description: 'Queso fresco elaborado con leche de vacas en pastoreo libre.',
  },
  {
    id: 3,
    name: 'Miel Multifloral',
    producer: 'Apiario San José',
    price: '15.000',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?q=80&w=800',
    description: 'Miel pura de abejas recolectada de diferentes flores silvestres.',
  },
];

const HERO_IMAGE = 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=1200';

export default function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Section */}
      <View style={styles.heroContainer}>
        <Image source={{ uri: HERO_IMAGE }} style={styles.heroImage} contentFit="cover" />
        <BlurView intensity={Platform.OS === 'ios' ? 60 : 100} style={styles.heroOverlay}>
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Mercado Rural</Text>
            <Text style={styles.heroSubtitle}>Del campo a tu mesa</Text>
            <View style={styles.searchContainer}>
              <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="¿Qué productos estás buscando?"
                placeholderTextColor="#666"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </View>
        </BlurView>
      </View>

      {/* Categories Section */}
      <View style={styles.categoriesContainer}>
        <Text style={styles.sectionTitle}>Explora por Categorías</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.categoriesList}
          contentContainerStyle={styles.categoriesContent}>
          {CATEGORIES.map((category) => (
            <TouchableOpacity 
              key={category.id} 
              style={[styles.categoryItem, { backgroundColor: category.color }]}>
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <Text style={styles.categoryName}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Featured Products */}
      <View style={styles.featuredContainer}>
        <Text style={styles.sectionTitle}>Productos Destacados</Text>
        <View style={[styles.productsGrid, isMobile && styles.productsGridMobile]}>
          {FEATURED_PRODUCTS.map((product) => (
            <TouchableOpacity key={product.id} style={styles.productCard}>
              <Image
                source={{ uri: product.image }}
                style={styles.productImage}
                contentFit="cover"
                transition={1000}
              />
              <View style={styles.productOverlay}>
                <BlurView intensity={Platform.OS === 'ios' ? 60 : 100} style={styles.productInfo}>
                  <View style={styles.productHeader}>
                    <Text style={styles.productName}>{product.name}</Text>
                    <View style={styles.ratingContainer}>
                      <Ionicons name="star" size={16} color="#FFB300" />
                      <Text style={styles.ratingText}>{product.rating}</Text>
                    </View>
                  </View>
                  <Text style={styles.producerName}>{product.producer}</Text>
                  <Text style={styles.productDescription}>{product.description}</Text>
                  <View style={styles.productFooter}>
                    <Text style={styles.productPrice}>$ {product.price}</Text>
                    <TouchableOpacity style={styles.addButton}>
                      <Ionicons name="add-circle" size={24} color="#FFFFFF" />
                      <Text style={styles.addButtonText}>Agregar</Text>
                    </TouchableOpacity>
                  </View>
                </BlurView>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  heroContainer: {
    height: 500,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  heroContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heroTitle: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  heroSubtitle: {
    fontSize: 24,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 30,
    opacity: 0.9,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 15,
    width: '100%',
    maxWidth: 500,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  categoriesContainer: {
    marginTop: -50,
    marginBottom: 30,
    zIndex: 1,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginBottom: 20,
    color: '#333',
  },
  categoriesList: {
    marginHorizontal: 15,
  },
  categoriesContent: {
    paddingHorizontal: 5,
  },
  categoryItem: {
    alignItems: 'center',
    marginHorizontal: 5,
    padding: 20,
    borderRadius: 20,
    width: 120,
    height: 120,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryIcon: {
    fontSize: 32,
    marginBottom: 10,
  },
  categoryName: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
    textAlign: 'center',
  },
  featuredContainer: {
    marginBottom: 30,
  },
  productsGrid: {
    padding: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productsGridMobile: {
    flexDirection: 'column',
  },
  productCard: {
    width: '32%',
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
    height: 400,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  productOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  productInfo: {
    padding: 20,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
    marginRight: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    marginLeft: 4,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  producerName: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 8,
  },
  productDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
    marginBottom: 15,
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(46,125,50,0.8)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginLeft: 5,
  },
});