import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { WebView } from "react-native-webview"; // Import de WebView

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDs_7NekFDjfMxsk66HEo-th3AzvydUYQA",
  authDomain: "allo-j-ai-faim.firebaseapp.com",
  projectId: "allo-j-ai-faim",
  storageBucket: "allo-j-ai-faim.appspot.com",
  messagingSenderId: "769046800499",
  appId: "1:769046800499:web:1e0690766638fab5a8e206",
  measurementId: "G-EZ0SDNTTQF",
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export default function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [currentPage, setCurrentPage] = useState(null); // Page courante (client ou cuisinier)

  // Vérifier l'état de connexion de l'utilisateur
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const role = await getUserRole(user.uid);
        setRole(role);
      } else {
        setUser(null);
        setRole(null);
      }
    });

    return unsubscribe;
  }, []);

  // Récupérer le rôle de l'utilisateur
  const getUserRole = async (userId) => {
    try {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data().role;
      } else {
        console.log("Aucun utilisateur trouvé !");
        return null;
      }
    } catch (e) {
      console.error("Erreur lors de la récupération du rôle de l'utilisateur : ", e);
    }
  };

  // Rendre la page actuelle
  const renderPage = () => {
    if (currentPage === "client") {
      return (
        <WebView
          source={{ uri: "file:///android_asset/Clients/index2.html" }} // Chemin vers le fichier client
          style={{ flex: 1 }}
        />
      );
    } else if (currentPage === "cuisinier") {
      return (
        <WebView
          source={{ uri: "file:///android_asset/Cuisiniers/login.html" }} // Chemin vers le fichier cuisinier
          style={{ flex: 1 }}
        />
      );
    }

    // Page d'accueil
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Bienvenue sur Allô j'ai faim</Text>
        {/* Bouton pour le client */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => setCurrentPage("client")}
        >
          <Text style={styles.buttonText}>Vous êtes client</Text>
        </TouchableOpacity>
        {/* Bouton pour le cuisinier */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => setCurrentPage("cuisinier")}
        >
          <Text style={styles.buttonText}>Vous êtes cuisinier</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return <View style={{ flex: 1 }}>{renderPage()}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});
