function save_options() {
  var googleLink = document.getElementById('googleLink').value;
  chrome.storage.sync.set({
    googleSheet: googleLink,
  }, function() {
    // Update status to let user know options were saved.
    console.log("googleSheet saved")
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    googleSheet: '',
  }, function(items) {
    document.getElementById('googleLink').value = items.googleSheet;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);