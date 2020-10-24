import * as Tts from 'expo-speech'

const languages = {
    in: 'en-IN',
    fr: 'fr-FR',
    id: 'in-ID',
    ph: 'fil-PH',
    au: 'en-AU',
    us: 'en-US'
}
const speak = async ( news, config ) => {
    try{
        Tts.speak(news, { 
            language: languages[config.selectedCountry] || 'en-IN',
            rate: .93, 
            onStart: () => config.cb(true),
            onStopped: () => config.cb(false),
            onDone: () => config.cb(false)
        })
    }catch(e){
        throw e
    }
}

export { speak }