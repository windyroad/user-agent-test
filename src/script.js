document.addEventListener('DOMContentLoaded', function() {
    var parser = new UAParser();
    var result = parser.getResult();
    
    // Update Browser Name in Heading
    document.getElementById('browserName').textContent = 'Your Browser: ' + result.browser.name;
    
    // Check if the browser is Edge and update the paragraph
    var browserStatusParagraph = document.querySelector('p');
    if(browserStatusParagraph) {
        if (result.browser.name === 'Edge') {
            browserStatusParagraph.innerHTML = '✅ Your Browser is Edge. You are not in IE11 compatibility mode.';
        } else if (result.browser.name === 'IE') {
            browserStatusParagraph.innerHTML = '❌ Your Browser is IE. The attempt to force Edge mode failed.';
            // Set a cookie to mark that we've attempted a reload
            // document.cookie = "compatibilityModeReloaded=true; path=/";
            // Reload the page
            var hasQuery = window.location.href.indexOf('?') !== -1;
            var newUrl = window.location.href + (hasQuery ? '&' : '?') + 'forceReload=' + new Date().getTime();
            window.location.href = newUrl;
        } else {
            // For browsers like Chrome, Safari, etc., no error message is shown.
            browserStatusParagraph.innerHTML = '🌐 Your Browser is ' + result.browser.name + '. No compatibility mode issues.';
        }
    }
    // Fill Table with UAParser Details
    var detailsTable = document.getElementById('uaDetails').getElementsByTagName('tbody')[0];
    Object.keys(result).forEach(function(key) {
        if (typeof result[key] === 'object') {
            Object.keys(result[key]).forEach(function(subKey) {
                var row = detailsTable.insertRow();
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                cell1.textContent = key.toUpperCase() + ' - ' + subKey;
                cell2.textContent = result[key][subKey];
            });
        } else {
            var row = detailsTable.insertRow();
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.textContent = key.toUpperCase();
            cell2.textContent = result[key];
        }
    });
});