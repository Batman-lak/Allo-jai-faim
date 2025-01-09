import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Linking } from "react-native";

export default function App() {
  const openClientSite = () => {
    Linking.openURL("https://example-client-site.com"); // Remplace par l'URL de ton site client.
  };

  const openCuisinierLogin = () => {
    Linking.openURL("https://example-cuisinier-login.com"); // Remplace par l'URL de la page de login cuisinier.
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.clientButton} onPress={openClientSite}>
        <Text style={styles.clientText}>Vous êtes client</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cuisinierButton} onPress={openCuisinierLogin}>
        <Text style={styles.cuisinierText}>Vous êtes cuisinier</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  clientButton: {
    flex: 1,
    backgroundColor: "#93C572", // Vert pistache
    justifyContent: "center",
    alignItems: "center",
  },
  clientText: {
    color: "orange",
    fontSize: 24,
    fontWeight: "bold",
  },
  cuisinierButton: {
    flex: 1,
    backgroundColor: "orange",
    justifyContent: "center",
    alignItems: "center",
  },
  cuisinierText: {
    color: "blue",
    fontSize: 24,
    fontWeight: "bold",
  },
});
