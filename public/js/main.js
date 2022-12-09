// Imported modules of core module
const fs = require('fs');

// Make a directory and JSON file if it hasn't been made yet
if (!fs.existsSync('./data')) fs.mkdirSync('./data');
if (!fs.existsSync('./data/contacts.json')) fs.writeFileSync('./data/contacts.json', '[]', 'utf-8');

// Read the JSON file in dir Path
var file = fs.readFileSync('data/contacts.json', 'utf-8');
// Parse string to JSON
var arrayJSON = JSON.parse(file);

// List arrays
function showJSON() {
    return arrayJSON;
}

// List a array from a specific name
function searchJSON(nama) {
    // Variable for branch and checking JSON file if a certain string already taken/not available 
    const list = arrayJSON.find((contact) => contact.name === nama);
    return list;
}

// Add a array to JSON
function addJSON(name, email, mobile) {
    // Push the array to JSON
    arrayJSON.push({ name, email, mobile });
    // Write the file in JSON
    fs.writeFileSync('data/contacts.json', JSON.stringify(arrayJSON));
}

module.exports = { showJSON, searchJSON, addJSON }