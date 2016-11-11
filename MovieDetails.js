import React from 'react'
import * as api from './api'
import MovieCell from './MovieCell'
import ProgressiveImage from './ProgressiveImage'
import {
  ListView,
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import StarRating from './StarRating'
import Icon from 'react-native-vector-icons/Foundation'

const styles = StyleSheet.create({
  topTextContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  topContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'transparent',
    justifyContent: 'space-between'
  },
  container: {
    backgroundColor: 'transparent',
    flex: 1,
  },
  ratingContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    margin: 5,
  },
  backdropByHeight: {
    height: 240,
  },
  backdropByWidth: {
    width: 300,
    height: 160,
  },
  title: {
    margin: 5,
    fontWeight: 'bold',
    fontSize: 20,
    color: '#FFFFFFCC',
  },
  body: {
    margin: 5,
    fontSize: 14,
    color: '#FFFFFFAA',
  },
  caption: {
    marginLeft: 5,
    fontSize: 14,
    fontStyle: 'italic',
    color: '#FFFFFFAA',
  },
  playIcon: {
    position: 'absolute',
    top: 100,
    width: 60,
    height: 60,
  },
  playIconAlt: {
    position: 'absolute',
    top: 65,
    marginLeft: 140,
    width: 40,
    height: 40,
  },
})

class MovieDetails extends React.Component{
  static propTypes = {
    movie: React.PropTypes.object.isRequired,
    onSelectVideo: React.PropTypes.func,
  }
  state = {
    isVertical: true,
    width: 0,
  }

  render() {
    const { movie, onSelectVideo } = this.props
    const { isVertical, width } = this.state

    return (
      <LinearGradient
        colors={['rgb(100,100,100)', 'rgb(20,20,20)']}
        style={styles.container}
        onLayout={({ nativeEvent }) => {
          const { width, height } = nativeEvent.layout
          this.setState({ isVertical: (height > width), width})}}>

        {isVertical && (
          <View style={styles.container}>
            <ProgressiveImage
              style={styles.backdropByHeight}
              sourceHigh={{ uri: api.getPosterUrl(movie.backdrop_path) }}
              sourceLow={{ uri: api.getPosterUrlLow(movie.backdrop_path) }}
              resizeMode="contain"
              resizeMethod="resize" />

            <TouchableOpacity style={[styles.playIcon, { marginLeft: width/2 - 15 }]} onPress={() => api.getYouTubeUrl(movie.id).then((result) => onSelectVideo(result))}>
                <Icon name="play" size={60} color="#FFFFFFCC" />
            </TouchableOpacity>

            <Text style={styles.title}>{movie.title}</Text>
            <Text style={styles.caption}>Release date: {movie.release_date}</Text>
            <View style={styles.ratingContainer}>
              <StarRating rating={movie.vote_average} />
              <Text style={styles.caption}>{movie.vote_average}/10</Text>
            </View>
            <Text style={styles.body}>{movie.overview}</Text>
          </View>
        )}

        {!isVertical && (
          <View style={styles.container}>
            <View style={styles.topContainer}>
              <View>
                <Text style={styles.title}>{movie.title}</Text>
                <Text style={styles.caption}>Release date: {movie.release_date}</Text>
                <View style={styles.ratingContainer}>
                  <StarRating rating={movie.vote_average} />
                  <Text style={styles.caption}>{movie.vote_average}/10</Text>
                </View>
              </View>
              <View>
                <ProgressiveImage
                  style={styles.backdropByWidth}
                  sourceHigh={{ uri: api.getPosterUrl(movie.backdrop_path) }}
                  sourceLow={{ uri: api.getPosterUrlLow(movie.backdrop_path) }}
                  resizeMode="contain"
                  resizeMethod="resize" />

                <TouchableOpacity style={[styles.playIconAlt]} onPress={() => api.getYouTubeUrl(movie.id).then((result) => onSelectVideo(result))}>
                  <Icon name="play" size={40} color="#FFFFFFCC" />
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.body}>{movie.overview}</Text>
          </View>
         )}
      </LinearGradient>
    )
  }
}

MovieDetails.propTypes = {
  movie: React.PropTypes.object.isRequired,
}

export default MovieDetails
