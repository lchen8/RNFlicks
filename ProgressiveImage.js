import React from 'react'
import {
  Animated,
  Image,
  View,
} from 'react-native'

class ProgressiveImage extends React.Component {
  static propTypes = {
    style: View.propTypes.style,
    sourceLow: React.PropTypes.object,
    sourceHigh: React.PropTypes.object,
  }
  state = {
    opacity: new Animated.Value(0),
  }
  onLoadHigh = () => {
    this.setState({ isHighLoaded: true })
    Animated.timing(this.state.opacity, {
      toValue: 0,
      duration: 500,
    }).start()
  }
  onLoadLow = () => {
    if(this.state.isHighLoaded) return null
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 500,
    }).start()
  }
  render() {
    const { opacity, width, height } = this.state
    return (
      <View>
        <Animated.Image
          {...this.props}
          source={this.props.sourceHigh}
          onLoad={this.onLoadHigh}
          style={{
            position: 'absolute',
            width,
            height,
          }}
        />
        <Animated.Image
          {...this.props}
          source={this.props.sourceLow}
          style={[this.props.style, { opacity }]}
          onLoad={this.onLoadLow}
          onLayout={({ nativeEvent }) => {
            const { width, height } = nativeEvent.layout
            this.setState({ width, height })
          }}
        />
      </View>
    )
  }
}
export default ProgressiveImage
