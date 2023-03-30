import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2f2f3d',
    paddingTop: 10
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
  },
  inputContainer: {
    alignItems: 'flex-end',
    backgroundColor: '#414155',
    padding: 10,
    width: '100%',
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    fontSize: 18,
    padding: 10,
    color: '#f1f6ff',
    backgroundColor: '#414155',
    borderRadius: 10,
    textAlignVertical: 'bottom',
  },
  sendButton: {
    width: '3%',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 5,
    alignItems: 'center',
  },
  sendButtonText: {
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
});
