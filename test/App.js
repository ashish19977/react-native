import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Button,
  StyleSheet,
  Animated,
  Dimensions,
  Text,
} from "react-native";
import {
  TapGestureHandler,
  FlatList,
  TouchableOpacity,
} from "react-native-gesture-handler";

//your main component
export default function App() {
  return (
    <View style={styles.appContainer}>
      <Flat />
    </View>
  );
}

function Animations() {
  const opacity = useRef(new Animated.Value(1)).current;
  const x = useRef(new Animated.Value(0)).current;

  const fadeOut = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const fadeIn = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const bounce = () => {
    x.setValue(0);
    Animated.timing(x, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const move = x.interpolate({
    inputRange: [0, 1],
    outputRange: [0, Dimensions.get("screen").width],
  });

  return (
    <View style={styles.appContainer}>
      <Animated.View
        style={[styles.ball, { opacity, transform: [{ translateX: move }] }]}
      ></Animated.View>
      <Button style={styles.btn} title="Fade Out" onPress={fadeOut} />
      <Button style={styles.btn} title="Fade In" onPress={fadeIn} />
      <Button style={styles.btn} title="Wipe Out" onPress={bounce} />
      {/* <TapGestureHandler><6jfyn,mmj nbView ></TapGestureHandler>style={styles.ball}</View></TapGestureHandler> */}
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "pink",
    marginTop: 35,
  },
  ball: {
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: "#880cbd",
    marginBottom: 50,
  },
  btn: {
    marginBottom: 10,
  },
});

let data = [
  { name: "a", key: "a" },
  { name: "b", key: "b" },
  { name: "c", key: "c" },
  { name: "d", key: "d" },
  { name: "e", key: "e" },
  { name: "f", key: "f" },
  { name: "g", key: "g" },
  { name: "h", key: "h" },
  { name: "i", key: "i" },
  { name: "j", key: "j" },
  { name: "k", key: "k" },
  { name: "l", key: "l" },
  { name: "m", key: "m" },
  { name: "n", key: "n" },
  { name: "o", key: "o" },
];

function Flat() {
  const fRef = useRef();
  useEffect(() => {
    console.log("should move to end");
    fRef.current.scrollToEnd();
  });
  const test = () => {
    fRef.current.scrollToIndex({ index: 0 });
  };
  return (
    <View>
      <Button onPress={test} title="go to index" />
      <FlatList
        onEndReached={() => fRef.current.scrollToEnd()}
        ref={fRef}
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              backgroundColor: "green",
              paddingVertical: 20,
              paddingHorizontal: 10,
              width: Dimensions.get("screen").width,
            }}>
            <Text style={{ fontSize: 30 }}>{item.name}</Text>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => (
          <TouchableOpacity
            style={{ height: 5, flex: 1, backgroundColor: "orange" }}
          ></TouchableOpacity>
        )}
      />
    </View>
  );
}
