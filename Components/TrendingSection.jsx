import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';

const TrendingSection = () => {
  const [movies, setMovies] = useState([]);

  // Fetch trending movies from TMDB API
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=48e2b57452d73a756730d4ad0ac0b8db');
        const data = await response.json();
        setMovies(data.results || []); // Safely handle undefined results
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Trending Section</Text>

      {movies.length === 0 ? (
        <Text style={styles.loadingText}>Loading Trending Movies...</Text>
      ) : (
        <FlatList
          style={styles.containerItem}
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3} // Set number of columns to 3
          renderItem={({ item }) => (
            <View style={styles.movieCard}>
              <Image
                source={ { uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` } }
                style={styles.movieImage}
              />
              <Text style={styles.movieTitle}>{item.title}</Text>
            </View>
          )}
          columnWrapperStyle={styles.columnWrapper} // Add some space between columns
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    padding: 10,
  },
  heading: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  loadingText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  movieCard: {
    flex: 1, // Make sure each card takes up equal space
    marginHorizontal: 5, // Space between cards in the row
    marginBottom: 15, // Space between rows
    alignItems: 'center',
    gap:2,
  },
  movieImage: {
    width: 120,
    height: 180,
    borderRadius: 10,
  },
  movieTitle: {
    color: 'white',
    fontSize: 14,
    marginTop: 5,
    textAlign: 'center',
    width: 120,
  },
  columnWrapper: {
    justifyContent: 'space-between', // Space out items in each row
  },
});

export default TrendingSection;
