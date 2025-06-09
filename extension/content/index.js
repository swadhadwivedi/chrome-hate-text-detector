let settings;

chrome.storage.sync.get(
  ['enable', 'sensibility', 'obscenity', 'threat', 'lang', 'theme', 'mode'],
  result => {
    settings = result;
   if (settings.enable && settings.mode === 'gentleman') {
  injectGentlemanMode();
  observeDOMChanges('gentleman');
}


  }
);

// 👇 Dynamically injects the gentleman mode script
function injectGentlemanMode() {
  let script = document.createElement('script');
  script.setAttribute('type', 'module');
  script.src = chrome.runtime.getURL('content/gentlemanmode.js');
  script.onload = () => {
    const event = new CustomEvent('ActivateGentlemanMode', { detail: settings });
    document.dispatchEvent(event);
  };
  document.body.appendChild(script);
}

function applySpoilerMode(config) {
  tf.loadLayersModel('https://raw.githubusercontent.com/antoine311200/Host-Utils-Data/master/tfjs-newmodel/model.json')
    .then(model => {
      blurContent(config, model);
    });
}

function blurContent(config, model) {
  const elements = document.querySelectorAll('p, span, li');

  elements.forEach(el => {
    const text = el.textContent;
    const sentences = text.match(/((([^\.!\?]+[\.!\?]+)\s)|([^\.!\?]+[\.!\?]+$))/g);
    if (!sentences) return;

    try {
      const input = process(sentences, config);
      const prediction = model.predict(tf.tensor(input));
      prediction.data().then(p => {
        let shouldBlur = p.some(score => score > 0.3);
        if (shouldBlur) {
          el.style.filter = 'blur(5px)';
          el.style.cursor = 'pointer';
          el.title = 'Spoiler content — click to reveal';
          el.addEventListener('click', () => el.style.filter = 'none');
        }
      });
    } catch (err) {
      console.error('Processing error:', err);
    }
  });
}


function injectSpoilerMode(config) {
  let script = document.createElement('script');
  script.setAttribute('type', 'module');
  script.src = chrome.runtime.getURL('content/spoilermode.js');
  script.onload = () => {
    const event = new CustomEvent('ActivateSpoilerMode', {
      detail: {
        settings,
        config
      }
    });
    document.dispatchEvent(event);
  };
  document.body.appendChild(script);
}



// 👇 Watches DOM changes to auto-censor new content
function observeDOMChanges(mode, config) {
  const observer = new MutationObserver(() => {
    if (mode === 'spoiler') {
      tf.loadLayersModel('https://raw.githubusercontent.com/antoine311200/Host-Utils-Data/master/tfjs-newmodel/model.json')
        .then(model => {
          blurContent(config, model);
        });
    } else {
      const eventName = 'ActivateGentlemanMode';
      document.dispatchEvent(new CustomEvent(eventName, { detail: settings }));
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true,
  });
}

