import React, { useRef, useEffect, useState } from 'react';
import { View, FlatList, Image, StyleSheet, Dimensions, Text, Animated } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const PhotoCarousel = () => {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const scrollInterval = useRef(null);

  // Fetch trending movies from TMDB API
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          'https://api.themoviedb.org/3/trending/movie/day?api_key=48e2b57452d73a756730d4ad0ac0b8db'
        );
        const data = await response.json();
        // Slice the first 5 movies
        setMovies(data.results.slice(0, 5));
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  // Auto-scroll logic, start only after movies are loaded
  useEffect(() => {
    if (movies.length === 0) return;

    scrollInterval.current = setInterval(() => {
      if (flatListRef.current) {
        const nextIndex = (currentIndex + 1) % movies.length;
        setCurrentIndex(nextIndex);
        flatListRef.current.scrollToIndex({ animated: true, index: nextIndex });
      }
    }, 1000); // Change slides every 3 seconds

    return () => clearInterval(scrollInterval.current);
  }, [movies, currentIndex]);

  // Handle manual scrolling
  const onScroll = (event) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
    setCurrentIndex(slideIndex);
  };

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={movies}
        horizontal
        pagingEnabled
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
              style={styles.image}
            />
            {/* <Text style={styles.text}>{item.title}</Text> */}
          </View>
        )}
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        onScrollToIndexFailed={() => {
          console.warn('Scroll to index failed');
        }}
      />

      {/* Dots Indicator */}
      <View style={styles.dotsContainer}>
        {movies.map((_, index) => (
          <Animated.View
            key={index}
            style={[
              styles.dot,
              currentIndex === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: screenWidth,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  image: {
    width: '90%',
    height: 500,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  text: {
    color: 'white',
    fontSize: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    textAlign: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: 'white',
  },
  inactiveDot: {
    backgroundColor: 'gray',
  },
});

export default PhotoCarousel;
