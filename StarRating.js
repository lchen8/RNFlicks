import React from 'react'
import * as api from './api'
import Icon from 'react-native-vector-icons/Foundation'
import{
  View,
  Text,
} from 'react-native'

const Star = ({ isHighlighted }) => (
  <View style={{ marginLeft: 1 }}>
    <Icon name="star" size={14} color={isHighlighted ? "#FFD412" : "#afafaf"} />
  </View>
)

const StarRating = ({ rating }) => {
  let arr = []
  let i
  for (i = 0; i < 10; i++) {
    arr[i] = {
      key: i,
      isHighlighted: ((i+1) <= Math.round(rating)),
    }
  }
  return (
    <View style={{ flexDirection: 'row' }}>
      {arr.map(a => <Star key={a.key} isHighlighted={a.isHighlighted} />)}
    </View>
  )
}

StarRating.propTypes = {
  rating: React.PropTypes.number,
}

export default StarRating
