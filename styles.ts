import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2f2f3d',
    paddingTop: 20,
  },
  scrollView: {
    flex: 1,
    padding: 10,
    rowGap: 10,
  },
  chatItem: {
    // flex: 8,
    borderRadius: 10,
    paddingHorizontal: 0,
    paddingVertical: 10,
    backgroundColor: '#414155',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
    rowGap: 20,
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
    // flex: 1
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
    // flex: 1,
    backgroundColor: '#353343',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    marginRight: 20,
    width: '80%',
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
    height: 300,
    width: 300,
    borderRadius: 18,
  },
  imageRef: {
    // flex: 10,
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
  talkView: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
  },
  shareView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    marginTop: -20,
  },
  shareImageView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    marginLeft: 20,
    // flex: 2,
  },
  copyButton: {
    backgroundColor: '#ddd',
    borderRadius: 10,
    padding: 5,
    marginRight: 44,
  },
  showSpeechButton: {
    backgroundColor: '#ddd',
    borderRadius: 10,
    padding: 5,
    marginLeft: 20,
    marginRight: 40,
  },
  showSpeechButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  showStopTalkButton: {
    backgroundColor: '#ddd',
    borderRadius: 10,
    padding: 5,
  },
  showStopTalkButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  checkUpdateButton: {
    borderRadius: 10,
    padding: 5,
  },
  checkUpdateButtonText: {
    color: '#f1f6ff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 30,
    right: 200, // for swap btn be always left, not center positioned
  },
  optionsRow: {
    // flexDirection: 'row',
    height: 180,
    justifyContent: 'space-between',
  },
  buttonSend: {
    justifyContent: 'flex-end',
  },
  toggleSmartFastView: {
    alignItems: 'center',
  },
  toggleSmartFastText: {
    color: '#f1f6ff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  imageBackground: {
    alignItems: 'center',
  },
  imageBackgroundText: {
    marginLeft: 40,
    width: 200,
    fontSize: 28,
    padding: 30,
    color: '#f1f6ff',
  },
  youtubePlayerContainer: {
    marginVertical: 20,
  },
  userInfoName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
