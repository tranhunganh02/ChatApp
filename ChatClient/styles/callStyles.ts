import {StyleSheet} from 'react-native'
export const styles = StyleSheet.create({
  localStream: {
    flex: 1,
    marginVertical: 16,
  },
  flex: {
    flex: 1,
  },
  remoteControlWithCameraOn: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 8 + 16,
  },
  noCamera: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '65%',
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  input: {
    borderWidth: 1,
    borderColor: "lightGray",
    borderRadius: 12,
    marginRight: 8,
    paddingHorizontal: 8,
    flex: 1,
    color: '#2A343D',
  },
  nameInput: {
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 12,
    padding: 8,
    color: '#2A343D',
    marginHorizontal: 8,
    marginTop: 8,
  },
  button: {
    padding: 8,
    marginTop: 8,
    marginHorizontal: 8,
    borderRadius: 12,
    backgroundColor: '#2A343D',
  },
  buttonTitle: {
    color: '#ffffff',
  },
  buttonDisabled: {
    backgroundColor: '#dee2e6',
  },
  noCameraInRoom: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dee2e6',
    borderWidth: 1,
    borderColor: 'black',
  },
  borderWidthDisplay: {},
  joinContainer: {
    flexDirection: 'row',
    padding: 8,
  },
  joinButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: '#2A343D',
  },
  flexWrap: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  controlContainer: {
    backgroundColor: '#2A343D',
    position: 'absolute',
    bottom:16,
    left: 0,
    right: 0,
    padding:8,
    borderRadius: 12,
  },
  localControl: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 20,
  },
  remoteControlContainer: {
    position: 'absolute',
    bottom: 8 + 16,
  },
  spacingBottom: {
    marginBottom: 8,
  },
  noUsersContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noUserText: {
    color: '#2A343D',
    textAlign: 'center',
  },
})