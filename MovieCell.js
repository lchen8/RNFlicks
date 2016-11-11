import React from 'react'
import * as api from './api'
import ProgressiveImage from './ProgressiveImage'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
 } from 'react-native'
 import LinearGradient from 'react-native-linear-gradient'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'transparent',
  },
  textContainer: {
    backgroundColor: 'transparent',
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFFFFFCC',
  },
  body: {
    fontSize: 12,
    color: '#FFFFFFAA',
  },
  poster: {
    marginRight: 10,
    width: 80,
    height: 120,
  },
})

const MovieCell = ({ movie, onSelectVideo }) => (
  <LinearGradient colors={['rgb(100,100,100)', 'rgb(20,20,20)']} style={styles.container}>
    <TouchableOpacity onPress={() => {}}>
      <ProgressiveImage
        style={styles.poster}
        sourceHigh={{ uri: api.getPosterUrl(movie.poster_path) }}
        sourceLow={{ uri: api.getPosterUrlLow(movie.poster_path) }}
        resizeMode="contain"
        resizeMethod="resize"
      />
    </TouchableOpacity>
    <View style={styles.textContainer}>
      <Text style={styles.title} numberOfLines={1}>{movie.title}</Text>
      <Text style={styles.body} numberOfLines={4}>{movie.overview}</Text>
    </View>
  </LinearGradient>
)

MovieCell.propTypes = {
  movie: React.PropTypes.object.isRequired,
}

export default MovieCell
