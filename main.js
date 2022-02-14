const synth=window.speechSynthesis;

const textForm=document.querySelector('form');
const textInput=document.querySelector('.txtInput');
const voiceSelect=document.querySelector('#voice-select');
const rate=document.querySelector('#rate');
const rateValue=document.querySelector('#rate-value');
const pitch=document.querySelector('#pitch');
const pitchValue=document.querySelector('#pitch-value');
const body=document.querySelector('body');
//Init voices array
let voices=[];

const getVoices=()=>{
    voices=synth.getVoices();
    
    //loop through voices
    voices.forEach(voice=>{
        //create option element
        const option =document.createElement('option');
        //fill option with voice and language
        option.textContent=voice.name+'('+voice.lang+')';
        //set needed option attribute
        option.setAttribute('data-lang',voice.lang);
        option.setAttribute('data-name',voice.name);
        voiceSelect.appendChild(option);
    })
}
getVoices();
if(synth.onvoiceschanged !== undefined){
    synth.onvoiceschanged=getVoices;
}

//speak
const speak=()=>{
    //Add background animation
    //check if its speaking
    if(synth.speaking){
        console.error('already speaking...');
        return;
    }
    if(textInput.value!=''){
        body.style.background='#141414 url(img/wave.gif)';
        body.style.backgroundRepeat='repeat-x';
        body.style.backgroundSize='100% 100%';
        //get speak text
        const speakText=new SpeechSynthesisUtterance(textInput.value);

        //speaking end
        speakText.onend=e=>{
            console.log('Done speaking...');    
            body.style.background='#141414';
        }

        //speaking error
        speakText.onerror=e=>{
            console.log('Something went wrong...');
        }

        //selected voice
        const selectedVoice=voiceSelect.selectedOptions[0].getAttribute('data-name');

        //loop through voices
        voices.forEach(voice=>{
            if(voice.name===selectedVoice){
                speakText.voice=voice;
            }
        });

        speakText.rate=rate.value;
        speakText.pitch=pitch.value;
        synth.speak(speakText);
    }else if(textInput.value==''){
        const speakB=new SpeechSynthesisUtterance('please enter all fields');
        synth.speak(speakB)
    }
};

//event listeners

//text form submit
textForm.addEventListener('submit',e=>{
    e.preventDefault();
    speak();
    textInput.blur();
});
rate.addEventListener('change',e=>{
    rateValue.style.visibility='visible';
    rateValue.textContent=rate.value;
})

pitch.addEventListener('change',e=>{
    pitchValue.style.visibility='visible';
    pitchValue.textContent=pitch.value;

})

voiceSelect.addEventListener('change',e=>speak());
