chrome.tabs.onUpdated.addListener(function (tabId , info) {
	if (info.status == 'complete') {
		chrome.scripting.executeScript({
			target: { tabId: tabId },
			files: ['c.js']
		});
	}
});