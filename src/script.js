document.addEventListener('DOMContentLoaded', function() {
    const parser = new UAParser();
    const result = parser.getResult();
    
    // Update Browser Name in Heading
    document.getElementById('browserName').textContent = `Your Browser: ${result.browser.name}`;
    
    // Fill Table with UAParser Details
    const detailsTable = document.getElementById('uaDetails').getElementsByTagName('tbody')[0];
    Object.keys(result).forEach(key => {
        if (typeof result[key] === 'object') {
            Object.keys(result[key]).forEach(subKey => {
                const row = detailsTable.insertRow();
                const cell1 = row.insertCell(0);
                const cell2 = row.insertCell(1);
                cell1.textContent = `${key.toUpperCase()} - ${subKey}`;
                cell2.textContent = result[key][subKey];
            });
        } else {
            const row = detailsTable.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            cell1.textContent = key.toUpperCase();
            cell2.textContent = result[key];
        }
    });
});