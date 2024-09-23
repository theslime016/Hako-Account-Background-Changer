document.addEventListener('DOMContentLoaded', function() {
  chrome.storage.sync.get(['imageUrl', 'aspectRatio', 'websites'], function(data) {
    if (data.imageUrl) {
      document.getElementById('image-url').value = data.imageUrl;
    }
    if (data.aspectRatio) {
      document.getElementById('aspect-ratio').value = data.aspectRatio;
    }
    if (data.websites) {
      document.getElementById('websites').value = data.websites.join('\n');
    }
  });

  // Lưu thay đổi
  document.getElementById('save-button').addEventListener('click', function() {
    const imageUrl = document.getElementById('image-url').value;
    const aspectRatio = document.getElementById('aspect-ratio').value;
    const websites = document.getElementById('websites').value.split('\n').map(url => url.trim()).filter(url => url);

    chrome.storage.sync.set({
      imageUrl: imageUrl,
      aspectRatio: aspectRatio,
      websites: websites
    }, function() {
      alert('Thay đổi đã được lưu.');
    });
  });

  // Reset về mặc định
  document.getElementById('reset-button').addEventListener('click', function() {
    chrome.storage.sync.remove(['imageUrl', 'aspectRatio', 'websites'], function() {
      document.getElementById('image-url').value = '';
      document.getElementById('aspect-ratio').value = '16:9';
      document.getElementById('websites').value = '';
      alert('Đã reset về mặc định.');
    });
  });
});
