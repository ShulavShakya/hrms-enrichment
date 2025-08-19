import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import "../global.css";

export default function Login() {
  return (
    <View className="flex-1 justify-center px-6 bg-white">
      <Text className="text-3xl font-bold text-center text-blue-700 mb-8">
        Welcome Back
      </Text>

      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        className="border border-gray-300 rounded-xl px-4 py-3 mb-4 text-base"
        placeholderTextColor="#888"
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        className="border border-gray-300 rounded-xl px-4 py-3 mb-4 text-base"
        placeholderTextColor="#888"
      />

      <TouchableOpacity className="bg-blue-600 py-3 rounded-xl">
        <Text className="text-white text-center font-semibold text-lg">
          Login
        </Text>
      </TouchableOpacity>

      <Text className="text-sm text-gray-500 text-center mt-6">
        Dont have an account?{" "}
        <Text className="text-blue-600 font-medium ">Sign up</Text>
      </Text>
    </View>
  );
}
