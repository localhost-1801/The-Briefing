document.addEventListener('DOMContentLoaded', function() {
  var checkPageButton = document.getElementById('checkPage');
  checkPageButton.addEventListener('click', function() {
    chrome.tabs.getSelected(null, function(tab) {
      d = document;
      const i = d.createElement('input');
      i.type = 'hidden';
      i.name = 'url';
      i.value = tab.url.slice(0, tab.url.indexOf('?'));

      const index = tab.url.indexOf('?') >= 0 ? tab.url.slice(0, tab.url.indexOf('?')) : tab.url

      const newURL = `http://localhost:8080/singleArticleData?url=${index}`;
      chrome.tabs.create({url: newURL})
    });
  }, false);
}, false);
