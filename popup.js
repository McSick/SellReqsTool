document.addEventListener('DOMContentLoaded', function() {
    chrome.tabs.getSelected(null, function(tab) {
      d = document;
		
	  var url = 'https://www.halowaypoint.com/en-us/games/halo-5-guardians/xbox-one/requisitions/categories/powerandvehicle?ownedOnly=False';
	  var win = window.open(url, '_blank');
  win.focus();
    });
}, false);