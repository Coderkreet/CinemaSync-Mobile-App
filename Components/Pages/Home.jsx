import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import PhotoCarousel from '../PhotoCarousel';
import TrendingSection from '../TrendingSection';

export default function Home() {
  const [movies, setMovies] = useState([]);

  // Fetch trending movies from TMDB API
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=48e2b57452d73a756730d4ad0ac0b8db');
        const data = await response.json();
        setMovies(data.results); // Save the movies data
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <PhotoCarousel />
 <TrendingSection/>
      </View>
      {/* <View>
        <Text style={styles.heading}>Trending Section</Text>
      </View> */}


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000', // Black background
    padding: 10,
  },
  heading: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },

});
