import React from 'react';
import { StyleSheet, Text, View ,Alert, Button } from 'react-native';

export default function App() {
  return (
      <View style={styles.container}>
          <View style={styles.buttonContainer}>
              <Button
                  onPress={this._onPressButton}
                  title="Press Me"
                  color="#EB1478"
              />
          </View>
          <View style={styles.buttonContainer}>
              <Button
                  onPress={this._onPressButton}
                  title="Press Me"
                  color="#841584"
              />
          </View>
      </View>
  );
}

function _onPressButton() {
    Alert.alert('You tapped the button!');
    console.log('TAP')
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    buttonContainer: {
        margin: 20,
        height: 20
    },
    alternativeLayoutButtonContainer: {
        margin: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});
