import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Text } from "@/components/ui/text";
import * as React from "react";
import { Pressable, TextInput, View } from "react-native";

export function SignInForm({
  title,
  buttonText,
  onPress,
  email,
  password,
  setEmail,
  setPassword,
  loading,
}: any) {
  const passwordInputRef = React.useRef<TextInput>(null);

  function onEmailSubmitEditing() {
    passwordInputRef.current?.focus();
  }

  function onSubmit() {
    // TODO: Submit form and navigate to protected screen if successful
  }

  return (
    <View className="flex-1 justify-center px-6">
      <Card className="border-pink-500/60 sm:border-pink-500/60 shadow-[0_0_15px_rgba(236,72,153,0.2)] bg-zinc-900/90 rounded-none border-b-4 border-r-4">
        <CardHeader>
          <CardTitle className="text-center text-xl sm:text-left text-cyan-400 font-bold tracking-widest uppercase">
            Initialize_Connection
          </CardTitle>
          <CardDescription className="text-center sm:text-left text-pink-500/80 tracking-widest text-xs uppercase">
            Enter credentials to access mainframe
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-6">
          <View className="gap-6 mt-4">
            <View className="gap-1.5">
              <Label
                htmlFor="email"
                className="text-pink-500 uppercase tracking-widest text-xs"
              >
                Email
              </Label>
              <TextInput
                id="email"
                placeholder="USER@MAINFRAME.SYS"
                placeholderTextColor="#ec489950"
                keyboardType="email-address"
                autoComplete="email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                onSubmitEditing={onEmailSubmitEditing}
                returnKeyType="next"
                submitBehavior="submit"
                className="bg-black border border-zinc-700 text-cyan-400 px-4 py-3 focus:border-cyan-400 focus:shadow-[0_0_10px_rgba(6,182,212,0.3)] font-mono outline-none"
              />
            </View>
            <View className="gap-1.5 mt-2">
              <View className="flex-row items-center">
                <Label
                  htmlFor="password"
                  className="text-pink-500 uppercase tracking-widest text-xs"
                >
                  Password
                </Label>
                <Button
                  variant="link"
                  size="sm"
                  className="web:h-fit ml-auto h-4 px-1 py-0 sm:h-4"
                  onPress={() => {
                    // TODO: Navigate to forgot password screen
                  }}
                ></Button>
              </View>
              <TextInput
                placeholder="YOUR_KEY"
                placeholderTextColor="#ec489950"
                autoComplete="password"
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
                ref={passwordInputRef}
                id="password"
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={onSubmit}
                className="bg-black border border-zinc-700 text-cyan-400 px-4 py-3 focus:border-cyan-400 focus:shadow-[0_0_10px_rgba(6,182,212,0.3)] font-mono outline-none"
              />
            </View>
            <Pressable
              className={`w-full mt-4 p-4 border-2 items-center justify-center ${loading ? "border-zinc-700 bg-zinc-900" : "border-cyan-400 bg-cyan-950/40 shadow-[0_0_15px_rgba(6,182,212,0.4)]"}`}
              onPress={onPress}
              disabled={loading}
            >
              <Text
                className={`${loading ? "text-zinc-500" : "text-cyan-400"} uppercase tracking-widest font-bold`}
              >
                {loading ? "PROCESSING..." : "Hack_In"}
              </Text>
            </Pressable>
          </View>

          {/* <View className="flex-row items-center">
            <Separator className="flex-1" />
            <Text className="text-muted-foreground px-4 text-sm">or</Text>
            <Separator className="flex-1" />
          </View>
          <SocialConnections /> */}
        </CardContent>
      </Card>
    </View>
  );
}
