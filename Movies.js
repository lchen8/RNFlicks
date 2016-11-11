import React from 'react'
import * as api from './api'
import MovieCell from './MovieCell'
import {
  ListView,
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  RefreshControl,
 } from 'react-native'
 import LinearGradient from 'react-native-linear-gradient'
 import Icon from 'react-native-vector-icons/Foundation'


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centering: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatView: {
    position: 'absolute',
    height: 40,
    elevation: 4,
  },
 })

class Movies extends React.Component {
  static propTypes = {
    url: React.PropTypes.string.isRequired,
  }
  state = {
    width: 0,
    refreshing: false,
    isLoading: false,
    isEmpty: false,
    hasError: false,
    dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
  }
  componentDidMount() {
    this.fetchMovies()
  }

  updateRows(rows) {
    this.setState({
      isLoading: false,
      hasError: false,
      isEmpty: rows.length === 0,
      dataSource: this.state.dataSource.cloneWithRows(rows),
    })
  }

  fetchMovies() {
    this.setState({ isLoading: true })
    api.fetchMovies(this.props.url)
      .then((results) => this.updateRows(results))
      .catch(error => {
          this.setState({
            isLoading: false,
            hasError: true,
          })
      })
  }

  onRefresh() {
    this.setState({
      refreshing: true,
      hasError: false,
    })
    api.fetchMovies(this.props.url)
      .then((results) => {
        this.updateRows(results)
        this.setState({ refreshing: false })
      })
      .catch(error => {
        this.setState({
          refreshing: false,
          ref: false,
          hasError: true,
        })
      })
  }

  render() {
    if (!this.state.refreshing && this.state.isLoading) {
      return (
        <View style={[styles.container, styles.centering]}>
          <ActivityIndicator />
        </View>
      )
    } else if (this.state.isEmpty) {
      return (
        <View style={[styles.container, styles.centering]}>
          <Text>No results found.</Text>
        </View>
      )
    }
    return (
      <View
        style={styles.container}
        onLayout={({ nativeEvent }) => {
          const { width, height } = nativeEvent.layout
          this.setState({ width })}}>
        {this.state.hasError && (
          <LinearGradient
            style={[
              styles.centering,
              styles.floatView,
              { width: this.state.width, flexDirection: 'row' }]}
            colors={['#6e497a','#573860']} >
            <Icon name="alert" size={14} color="#FFFFFFAA" />
            <Text style={{ color: '#FFFFFFAA' }}>
              {"  Network Error"}
            </Text>
          </LinearGradient>
        )}
        <ListView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh.bind(this)}
            />
          }
          style={styles.container}
          dataSource={this.state.dataSource}
          renderRow={row => (
            <TouchableOpacity onPress={() => this.props.onSelectMovie(row) }>
              <MovieCell movie={row} />
            </TouchableOpacity>
          )}
        />
      </View>
    )
  }
}

export default Movies
