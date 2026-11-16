import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Menu, Search } from 'lucide-react-native';
import { iconsize } from '../../constants/sizes';

export default function Navbar() {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
      <TouchableOpacity onPress={() => console.log('Menu pressed')}>
        <Menu size={iconsize} color="#ffffff" />
      </TouchableOpacity>
      <Text style={{ marginLeft: 10, fontSize: 18, fontWeight: 'bold', color: '#ffffff' }}>NuvemBox</Text>

      <View style={{ flex: 1 }} />
        <TouchableOpacity onPress={() => console.log('Search pressed')}>
            <Search size={iconsize} color="#ffffff" />
        </TouchableOpacity>
    </View>
  );
};
