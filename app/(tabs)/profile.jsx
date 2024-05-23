import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, TouchableOpacity, Text } from "react-native";

import { signOut } from "../../lib/api";
import { useGlobalContext } from "../../context/GlobalProvider";

import { MaterialIcons } from "@expo/vector-icons";

const Profile = () => {
  const { setUser, setIsLogged } = useGlobalContext();

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);

    router.replace("/sign-in");
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="w-full flex justify-center items-center mt-6 mb-12 px-4  h-full">
        <TouchableOpacity
          onPress={logout}
          className="py-3 px-4 border border-green-50 rounded-full bg-secondary-200  text-center mt-4 flex-row items-center justify-center gap-2"
        >
          <Text className="font-psemibold text-xl">LogOut</Text>
          <MaterialIcons name="logout" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
