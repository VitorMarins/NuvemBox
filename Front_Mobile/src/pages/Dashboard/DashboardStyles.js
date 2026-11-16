import { StyleSheet } from 'react-native';

import { corPrincipal, corSecundaria, corTerciaria, corQuaternaria } from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: corPrincipal
  },
  containerHeader: {
    marginTop: '14%',
    marginBottom: '8%',
    marginEnd: '1%',
    marginStart: '1%'
  },
  message: {
    marginTop: '5%',
    marginStart: '5%',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF'
  },
  containerMain: {
    flex: 1,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%'
  },
  title: {
    fontSize: 20,
    marginTop: 28,
  },
  input: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16
  },
  button: {
    backgroundColor: corPrincipal,
    width: '100%',
    borderRadius: 4,
    paddingVertical: 8,
    marginTop: 14,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold'
  },
  buttonRegister: {
    marginTop: 14,
    alignSelf: 'center'
  },
  registerText: {
    color: '#a1a1a1'
  }
});

export default styles;