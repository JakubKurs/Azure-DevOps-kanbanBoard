if(document.getElementsByClassName('dj658skj2i4dnvjwu4-loaded')[0] == undefined){
    var s = document.createElement('script');
    s.src = chrome.runtime.getURL('main.js');
    s.classList.add('dj658skj2i4dnvjwu4-loaded')
    var manifestData = chrome.runtime.getManifest();
    console.log(manifestData.version);
    (document.head || document.documentElement).appendChild(s);
}
