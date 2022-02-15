// fpt
export const textToSpeechAPIKey = 'z9Vos3q77K91xLpxjEGlheie4OG6Di43';
export const textToSpeechAPIUrl = 'https://api.fpt.ai/hmi/tts/v5';
const callBackUrl = 'https://9259-112-197-184-191.ngrok.io/speechConverted';
export const textToSpeechAPIHeader = {
    'api-key': textToSpeechAPIKey,
    voice: 'banmai',
    callback_url: callBackUrl,
}

// export const serverUrl = 'https://guarded-plateau-01141.herokuapp.com/';
export const serverUrl = 'https://ede9-112-197-233-167.ngrok.io/'

//zalo
// export const textToSpeechAPIKey = 'qtbht4he8xsT6w0iChS1Tle9VtDhXwB1';
// export const textToSpeechAPIUrl = 'https://api.zalo.ai/v1/tts/synthesize';
// export const textToSpeechAPIHeader = {
//     'apikey': textToSpeechAPIKey,
//     // voice: 'banmai',
// }