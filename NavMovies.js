import React from 'react'
import Movies from './Movies'
import { NOW_PLAYING_URL, TOP_RATED_URL } from './api'
import MovieDetails from './MovieDetails'
import {
  View,
  Text,
  Navigator,
  TouchableOpacity,
  WebView,
} from 'react-native'

const navBarHeight = 0
const navBarStyle = {
  height: navBarHeight,
  backgroundColor: 'rgb(200,200,200)',
}

const NavMovies = ({ onNavChange, route_key }) => (
  <Navigator
    style={{ paddingTop: navBarHeight }}
    initialRoute={{ key: route_key }}
    renderScene={(route, navigator) => {
      onNavChange(navigator)
      navRef = navigator
      if (route.key==='video') {
        return (
          <WebView
            source={{ uri: route.youtube_url }}
            startInLoadingState
          />
        )
      }
      if (route.key==='details') {
        return (
          <MovieDetails
            movie={route.movie}
            onSelectVideo={youtube_url => navigator.push({ key: 'video', youtube_url})}
          />
        )
      } if (route.key==='top_rated') {
        return (
          <Movies
            onSelectMovie={movie => navigator.push({ key: 'details', movie })}
            url={TOP_RATED_URL}
          />
        )
      }
      return (
        <Movies
          onSelectMovie={movie => navigator.push({ key: 'details', movie })}
          url={NOW_PLAYING_URL}
        />
      )
    }}
    configureScene={() => Navigator.SceneConfigs.FloatFromBottom}
    navigationBar={
      <Navigator.NavigationBar
        style={ navBarStyle }
        routeMapper={{
          LeftButton: (route, navigator) => {
            if (route.key === 'details') {
            return (
              <TouchableOpacity onPress={() => navigator.pop()}>
                <Text>Back</Text>
              </TouchableOpacity>
            )}
            return null
          },
          RightButton: () => {},
          Title: (route) => {
            if (route.key === 'now_playing') return (
              <Text>Now Playing</Text>
            )
            return null
          },
        }}
      />
    }
  />
)
NavMovies.propTypes = {
  onNavChange: React.PropTypes.func,
}

export default NavMovies
