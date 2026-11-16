import { StyleSheet } from 'react-native';

import { corPrincipal, corTerciaria } from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: corPrincipal,
  },
  containerHeader: {
    marginTop: '14%',
    marginBottom: '22%',
    marginEnd: '1%',
    marginStart: '1%',
  },
  message: {
    marginTop: '5%',
    marginStart: '5%',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
  },
  containerMain: {
    flex: 1,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%',
  },
  containerUsed: {
    position: 'absolute',
    top: '25%',
    width: '80%',
    height: '8%',
    alignSelf: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'nowrap',
    backgroundColor: '#FFF',
    borderRadius: 25,
    marginHorizontal: '10%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1,
  },
  button: {
    paddingVertical: '5%',
    paddingHorizontal: '5%',
    backgroundColor: corTerciaria,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1,
  },
  buttonTranparent: {
    paddingVertical: '5%',
    paddingHorizontal: '5%',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: corPrincipal,
  }
});

export default styles;