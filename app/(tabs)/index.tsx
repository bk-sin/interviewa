import { SignOutButton } from "@/components/sign-out-button";
import { useUser } from "@clerk/clerk-expo";
import { Text, View } from "react-native";

export default function Page() {
  const { user } = useUser();

  return (
    <View style={{ marginTop: 50 }}>
      <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
      <SignOutButton />
    </View>
  );
}
