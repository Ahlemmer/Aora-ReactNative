import { View, TouchableOpacity, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";

const SearchInput = ({ setQuery, handleSearch, query }) => {
  return (
    <View className="flex flex-row items-center space-x-4 w-full h-16 px-4 bg-white rounded-2xl border-2 border-gray-50 focus:border-secondary">
      <TextInput
        className="text-base mt-0.5 text-black-100 flex-1 font-pregular"
        value={query}
        placeholder="Search a Product"
        placeholderTextColor="#000"
        onChangeText={(e) => setQuery(e)}
      />

      <TouchableOpacity onPress={() => handleSearch(query)}>
        <Feather name="search" size={24} className="text-black-100" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
