import React from 'react';
import { 
  View, 
  Text,
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
      <Animatable.View animation="fadeInUp" style={styles.containerUsed}>
        <TouchableOpacity style={styles.buttonTranparent} onPress={() => { console.log('Files pressed') }}>
          <Text style={styles.buttonText}>Files</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.buttonTranparent, { marginLeft: '0%' }]} onPress={() => { console.log('Favorites pressed') }}>
          <Text style={styles.buttonText}>Favorites</Text>
        </TouchableOpacity>

      </Animatable.View>
      <Animatable.View animation="fadeInUp" style={styles.containerMain}>
        
      </Animatable.View>
    </View>
  );
}
