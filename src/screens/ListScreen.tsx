import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { ELEMENTS_API_URL, DEFAULT_AVATAR_URL } from "../config";

type ElementItem = { id: string; name: string; avatar?: string };

export default function ListScreen() {
  const [data, setData] = useState<ElementItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const res = await fetch(
          ELEMENTS_API_URL
        );

        if (!res.ok) {
          throw new Error("Error en la respuesta del servidor");
        }

        const result: ElementItem[] = await res.json();

        if (isMounted) {
          setData(result);
          setError(null);
        }
      } catch (err: any) {
        if (isMounted) setError(err.message || "Error al cargar los datos");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Cargando elementos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.item}>
          {item.avatar && (
            //Dejo esta parte asi porque los enlaces de las imagenes no estan funcionales
            // <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <Image source={{ uri: DEFAULT_AVATAR_URL }} style={styles.avatar} />
          )}
          <Text style={styles.name}>{item.name}</Text>
        </View>
      )}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      contentContainerStyle={{ padding: 16 }}
    />
  );
}

const styles = StyleSheet.create({
  center: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center"
   },
  item: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  name: { 
    fontSize: 16,
    marginLeft: 12
   },
  avatar: { 
    width: 40, 
    height: 40, 
    borderRadius: 20
   },
  separator: { 
    height: 1, 
    backgroundColor: "#ccc"
   },
});
