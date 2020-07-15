import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';

export default function LinksScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <OptionButton
        icon="logo-linkedin"
        label="Meu Linkedin"
        onPress={() => WebBrowser.openBrowserAsync('https://www.linkedin.com/in/halu-de-cassia/')}
      />

      <OptionButton
        icon="logo-github"
        label="Meu Github"
        onPress={() => WebBrowser.openBrowserAsync('https://www.github.com/HaluDeCassia/')}
      />
      <br />
      <Text style={styles.optionText}>
        <strong>Haluane (Halú) de Cássia <br /> Pereira Amâncio</strong> <br /> <br />
        App feito para a aula de <br />
        Arquitetura FrontEnd Mobile <br />
        No curso de IGTI <br />
      </Text>
    </ScrollView>
  );
}

function OptionButton({ icon, label, onPress, isLastOption }) {
  return (
    <RectButton style={[styles.option, isLastOption && styles.lastOption]} onPress={onPress}>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.optionIconContainer}>
          <Ionicons name={icon} size={22} color="rgba(0,0,0,0.35)" />
        </View>
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>{label}</Text>
        </View>
      </View>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    paddingTop: 15,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'center',
    marginTop: 1,
    textAlign: 'center',
  },
});
