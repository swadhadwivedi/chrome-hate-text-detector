console.log("This is Manan soam's project ");

console.log("Hello you! Have a wonderful day! <3");

chrome.runtime.onInstalled.addListener(function() {
    const settings = {
        sensibility: 1,
        obscenity: 1,
        threat: 1,
    
        enable: true,

        lang: 'en',
        mode: 'spoiler',
        theme: 'dark',
    };
    chrome.storage.sync.set(settings, function() {
        console.log('Saved new instance of settings');
    });
});