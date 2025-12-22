import { supabase } from "@/lib/suppabase.web";
import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";

const { width } = Dimensions.get("window");

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!email || !password) {
      Alert.alert("Error", "Email and password are required");
      return false;
    }
    return true;
  };

  async function signIn() {
    if (!validate()) return;

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) Alert.alert("Login failed", error.message);
    setLoading(false);
  }

  async function signUp() {
    if (!validate()) return;

    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      Alert.alert("Register failed", error.message);
    } else if (!session) {
      Alert.alert("Check your email", "Please verify your email address");
    }

    setLoading(false);
  }

  return (
    <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
      <AuthCard
        title="Sign In"
        buttonText="Sign In"
        onPress={signIn}
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        loading={loading}
      />

      <AuthCard
        title="Sign Up"
        buttonText="Create Account"
        onPress={signUp}
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        loading={loading}
      />
    </ScrollView>
  );
}

/* ================= COMPONENT ================= */

function AuthCard({
  title,
  buttonText,
  onPress,
  email,
  password,
  setEmail,
  setPassword,
  loading,
}: any) {
  return (
    <View style={{ width }} className="flex-1 justify-center bg-white px-6">
      <Text className="text-3xl font-bold text-center mb-8">{title}</Text>

      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        className="bg-gray-100 rounded-xl px-4 py-3 mb-4"
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        className="bg-gray-100 rounded-xl px-4 py-3 mb-6"
      />

      <TouchableOpacity
        onPress={onPress}
        disabled={loading}
        className={`py-4 rounded-xl ${loading ? "bg-gray-400" : "bg-blue-600"}`}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white text-center font-semibold text-base">
            {buttonText}
          </Text>
        )}
      </TouchableOpacity>

      <Text className="text-center text-gray-400 mt-6">Swipe →</Text>
    </View>
  );
}
