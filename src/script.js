document.addEventListener('DOMContentLoaded', function() {
    var parser = new UAParser();
    var result = parser.getResult();
    
    // Update Browser Name in Heading
    document.getElementById('browserName').textContent = 'Your Browser: ' + result.browser.name;
    
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