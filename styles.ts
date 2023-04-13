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
    textAlignVertical: 'bottom',
  },
  sendButton: {
    width: '20%',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  sendButtonText: {},
  keyboardAvoidingView: {
    paddingBottom: 20,
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
  },
});
