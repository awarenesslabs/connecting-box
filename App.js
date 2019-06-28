import React from 'react';
import { Alert, Platform, StyleSheet, Text,
    TouchableHighlight, View } from 'react-native';
import { Audio } from 'expo-av';
import { initMusic, initSound } from './sounds';

export default function App() {

    const MUSIC_FILES_LENGTH = 2;//41;
    const SOUND_FILES_LENGTH = 99;

    let music_counter = 0;
    let sound_counter = 0;

    let music = [];
    let sound = [];

    let playingMissionHandler;
    let playingMusicHandler;

    function initSounds() {
        // TODO handle dynmaic require
        music = initMusic();
        sound = initSound();

        shuffle(music);
        shuffle(sound);
    }

    /**
     * Shuffles array and returns a new array
     * @param {Array} a items An array containing the items.
     */
    function shuffle(arr) {
        let j, x, i;
        for (i = arr.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = arr[i];
            arr[i] = arr[j];
            arr[j] = x;
        }
        return arr;
    }

    function _getNextSound() {
        if(sound_counter >= SOUND_FILES_LENGTH) {
            sound_counter = 0;
            shuffle(sound);
        }
        return sound[sound_counter++];
    }

    function _getNextMusic() {
        if(music_counter >= MUSIC_FILES_LENGTH) {
            music_counter = 0;
            shuffle(music);
        }
        return music[music_counter++];
    }

    async function _playSound(soundFile) {
        const soundObject = new Audio.Sound();
        try {
            await soundObject.loadAsync(soundFile);
            await soundObject.playAsync();
        } catch (error) {
            console.log('Error playing sound');
            console.log(error)
        }
        return soundObject;
    }

    function _stopMissionAndMusic() {
        if(playingMissionHandler) {
            playingMissionHandler.stopAsync();
        }
        if(playingMusicHandler) {
            playingMusicHandler.stopAsync();
        }
    }

    function _onPressButtonMission() {
        const soundFile = _getNextSound();
        _stopMissionAndMusic();
        _playSound(soundFile).then(res => {
            playingMissionHandler = res;
        });
    }

    function _onPressButtonMusic() {
        const soundFile = _getNextMusic();
        _stopMissionAndMusic();
        _playSound(soundFile).then(res => {
            playingMusicHandler = res;
        });
    }

    initSounds();

  return (
      <View style={styles.container}>
          <View style={styles.container}>
              <TouchableHighlight style={styles.touchableStyle} underlayColor='#eb1478'
                  onPress={_onPressButtonMission} >
                  <View style={styles.button} backgroundColor={'#eb1478'}>
                      <Text style={styles.buttonText}>Touch Me!</Text>
                  </View>
              </TouchableHighlight>
              <TouchableHighlight style={styles.touchableStyle} underlayColor='#eb1478'
                  onPress={_onPressButtonMusic} >
                  <View style={styles.button}>
                      <Text style={styles.buttonText}>Touch Me!</Text>
                  </View>
              </TouchableHighlight>
          </View>
      </View>
  );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 60,
        alignItems: 'center',
    },
    touchableStyle: {

    },
    button: {
        marginBottom: 30,
        width: 260,
        alignItems: 'center',
        backgroundColor: '#2196F3',
        borderRadius: 40,
    },
    buttonText: {
        padding: 20,
        color: 'white',
    }
});
