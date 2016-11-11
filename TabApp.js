import React from 'react'
import {
  Text,
  BackAndroid,
  Platform,
  StyleSheet,
} from 'react-native'
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view'
import NavMovies from './NavMovies'

const styles = StyleSheet.create({
    tabView: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.01)',
  },
  card: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    margin: 5,
    height: 150,
    padding: 15,
    shadowColor: '#ccc',
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
})

class TabApp extends React.Component {
  componentDidMount() {
    if(Platform.OS === 'android') {
      BackAndroid.addEventListener('hardwareBackPress', this.onHardwareBackPress)
    }
  }
  componentWillUnmount() {
    if(Platform.OS === 'android') {
      BackAndroid.removeEventListener('hardwareBackPress', this.onHardwareBackPress)
    }
  }

  onHardwareBackPress = () => {
    if (this.currentTab === 0 && this.navRef1 && this.navRef1.getCurrentRoutes().length > 1) {
      this.navRef1.pop()
      return true
    }
    if (this.currentTab === 1 && this.navRef2 && this.navRef2.getCurrentRoutes().length > 1) {
      this.navRef2.pop()
      return true
    }
    return false
  }

  navRef1 = null
  navRef2 = null
  currentTab = 0

  render () {
    return (
      <ScrollableTabView
        style={{ backgroundColor: 'rgb(20,20,20)' }}
        locked
        renderTabBar={() => <DefaultTabBar />}
        onChangeTab={({ i }) => (this.currentTab = i)}
        tabBarUnderlineStyle={{ backgroundColor: '#FFD412' }}
        tabBarActiveTextColor={'#FFFFFFCC'}
        tabBarInactiveTextColor={'#FFFFFFAA'}
      >
        <NavMovies
          tabLabel='Now Playing'
          route_key='now_playing'
          onNavChange={nav => (this.navRef1 = nav)}
        />
        <NavMovies
          tabLabel='Top Rated'
          route_key='top_rated'
          onNavChange={nav => (this.navRef2 = nav)}
        />
      </ScrollableTabView>
    )
  }
}

export default TabApp
