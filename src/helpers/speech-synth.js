/**
 * Created by brian on 10/12/16.
 */
var synth = window.speechSynthesis;
var myVoice = null;

// var inputForm = document.querySelector('form');
// var inputTxt = document.querySelector('input');
// var voiceSelect = document.querySelector('select');
import * as eventBus from './event-bus';


export function init(configIn){
    console.log('speech-synth::init()==>configIn:', configIn);
    console.log('speech-synth::init()==>synth:', synth);
    //populateVoiceList();
    eventBus.addListener(this);


    //WTF?? this is from MDN....
    //if (synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = populateVoiceList;
    //}
}

export function onEvent(evt, data){
    switch(evt){
        case 'speak-text':
            say(data.text);
    }
}

export function say(sIn){
    console.log('speech-synth::say()==>sIn":',sIn);
    let utterance = new SpeechSynthesisUtterance(sIn);
    utterance.lang = 'en-US';
    utterance.onend = onFinishSay;
    console.log('speech-synth::say()==>utterance":',utterance);
    synth.speak(utterance);
}
export function onFinishSay(evt){
    console.log('speech-synth::onFinishSay()==>evt:', evt);
}

function populateVoiceList() {

    let voices = synth.getVoices();
    console.log('speech-synth::voices:', voices);
    voices.forEach((voice)=>{
       if(voice.lang === 'en-US'){
           myVoice = voice;
       }
    });
    console.log('speech-synth::populateVoiceList()==>myVoice:', myVoice);
    //return voices;
    // for(i = 0; i < voices.length ; i++) {
    //     var option = document.createElement('option');
    //     option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
    //
    //     if(voices[i].default) {
    //         option.textContent += ' -- DEFAULT';
    //     }
    //
    //     option.setAttribute('data-lang', voices[i].lang);
    //     option.setAttribute('data-name', voices[i].name);
    //     voiceSelect.appendChild(option);
    // }
}


