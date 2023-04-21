import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2f2f3d',
    paddingTop: 20,
  },
  scrollView: {
    padding: 10,
  },
  chatItem: {
    borderRadius: 10,
    paddingHorizontal: 0,
    paddingVertical: 10,
    backgroundColor: '#414155',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  gestureContainer: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
    alignItems: 'center',
  },
  inputContainer: {
    backgroundColor: '#414155',
    width: '100%',
    flexDirection: 'row',
    marginTop: 10,
    borderRadius: 10,
  },
  input: {
    flex: 1,
    fontSize: 28,
    padding: 10,
    color: '#f1f6ff',
    backgroundColor: '#414155',
    textAlignVertical: 'top',
  },
  chatRequest: {
    backgroundColor: '#353343',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    width: '95%',
    color: '#f1f6ff',
    fontSize: 18,
  },
  chatResponse: {
    backgroundColor: '#353343',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    width: '95%',
    color: '#f1f6ff',
    fontSize: 18,
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 18,
  },
  showDeleteButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#ddd',
    borderRadius: 10,
    padding: 5,
  },
  showDeleteButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
});
