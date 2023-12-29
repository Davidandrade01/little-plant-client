import { SafeAreaView, Text, ActivityIndicator } from "react-native";

import { StyleSheet } from "react-native";

export function LoadingScreen(props) {
  const { text = "Cargando...", color = "#000", size = "large" } = props;

  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size={size} color={color} style={styles.spinner} />
      <Text style={styles.title}>{text}</Text>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  spinner: {
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
  },
});