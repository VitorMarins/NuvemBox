import React from 'react';
import { 
  View, 
  Text, 
  TextInput,
  TouchableOpacity
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import styles from './DashboardStyles';
import Navbar from '../../components/Navbar';

export default function Dashboard() {
  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeIn" delay={500} style={styles.containerHeader}>
        <Navbar />
        <Text style={styles.message}>Home</Text>
      </Animatable.View>
      <Animatable.View animation="fadeInUp" style={styles.containerMain}>

      </Animatable.View>
    </View>
  );
}
