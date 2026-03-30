import { SignInForm } from "@/components/sign-in-form";
import { useCreateUser } from "@/hooks/queries/use-user";
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
// import GoogleSignInButton from '@/components/social-auth-buttons/google/google-sign-in-button';
const { width } = Dimensions.get("window");

export default function Auth() {
  const { mutate: createUser } = useCreateUser();
  const [name, setName] = useState("");
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
    } = await supabase.auth.signUp({ email, password });

    if (error) {
      Alert.alert("Register failed", error.message);
      setLoading(false);
      return;
    }

    // kalau supabase sukses → baru hit API backend
    createUser(
      { name, email, password },
      {
        onSuccess: () => {
          Alert.alert("Success", "Account created");
        },
        onError: (err: any) => {
          console.log(name, email, password);

          console.log(err);

          Alert.alert("Backend error", err.message || "Failed to save user");
        },
        onSettled: () => {
          setLoading(false);
        },
      },
    );
  }

  return (
    <View className="flex-1 bg-zinc-950">
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      >
        <SignInForm
          title="Sign In"
          buttonText="Sign In"
          onPress={signIn}
          email={email}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
          loading={loading}
        />

        <SignUpCard
          title="INITIALIZE_NEW_ENTITY"
          buttonText="REGISTER_ID"
          onPress={signUp}
          email={email}
          password={password}
          setEmail={setEmail}
          setName={setName}
          name={name}
          setPassword={setPassword}
          loading={loading}
        />
      </ScrollView>
    </View>
  );
}

/* ================= COMPONENT ================= */

function SignUpCard({
  title,
  buttonText,
  onPress,
  email,
  password,
  name,
  setName,
  setEmail,
  setPassword,
  loading,
}: any) {
  return (
    <View style={{ width }} className="flex-1 justify-center bg-zinc-950 px-6">
      <View className="border-t-2 border-l-2 p-6 border-pink-500/50 bg-zinc-900/80 shadow-[0_0_20px_rgba(236,72,153,0.1)]">
        <Text className="text-2xl font-mono tracking-widest uppercase font-bold text-center mb-8 text-pink-500">
          {title}
        </Text>

        <TextInput
          placeholder="USER@MAINFRAME.SYS"
          placeholderTextColor="#06b6d450"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          className="bg-black border border-zinc-800 text-cyan-400 px-4 py-3 mb-4 font-mono focus:border-cyan-500 focus:shadow-[0_0_10px_rgba(6,182,212,0.3)] outline-none"
        />
        <TextInput
          placeholder="ALIAS"
          placeholderTextColor="#06b6d450"
          autoCapitalize="words"
          value={name}
          onChangeText={setName}
          className="bg-black border border-zinc-800 text-cyan-400 px-4 py-3 mb-4 font-mono focus:border-cyan-500 focus:shadow-[0_0_10px_rgba(6,182,212,0.3)] outline-none"
        />

        <TextInput
          placeholder="SECRET_KEY"
          placeholderTextColor="#06b6d450"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          className="bg-black border border-zinc-800 text-cyan-400 px-4 py-3 mb-8 font-mono focus:border-cyan-500 focus:shadow-[0_0_10px_rgba(6,182,212,0.3)] outline-none"
        />

        <TouchableOpacity
          onPress={onPress}
          disabled={loading}
          className={`py-4 border-2 shadow-lg mb-4 ${loading ? "border-zinc-700 bg-zinc-900" : "border-pink-500 bg-pink-950/40 shadow-[0_0_15px_rgba(236,72,153,0.4)]"}`}
        >
          {loading ? (
            <ActivityIndicator color="#ec4899" />
          ) : (
            <Text className="text-pink-500 tracking-widest uppercase text-center font-bold text-base font-mono">
              {buttonText}
            </Text>
          )}
        </TouchableOpacity>

        <Text className="text-center text-cyan-700/60 mt-2 font-mono text-xs uppercase tracking-widest">
          ← Swipe →
        </Text>
      </View>
    </View>
  );
}
