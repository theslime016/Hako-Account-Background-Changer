chrome.storage.sync.get(['imageUrl', 'aspectRatio', 'websites'], function(data) {
  const currentUrl = window.location.href;
  const allowedWebsites = data.websites || [];

  if (allowedWebsites.some(url => currentUrl.includes(url))) {
    // Chỉ thực hiện thay đổi nếu URL hiện tại nằm trong danh sách cho phép
    let targetDiv = document.querySelector('div.content.img-in-ratio');

    if (targetDiv && data.imageUrl) {
      targetDiv.style.backgroundImage = `url(${data.imageUrl})`;
      console.log("Background image has been changed!");
    } else {
      console.log("Element or image URL not found!");
    }

    let targetDiv2 = document.querySelector('.fourone-ratio');

    if (targetDiv2 && data.aspectRatio) {
      targetDiv2.style.position = 'relative';
      targetDiv2.style.width = '100%';
      let paddingBottom;

      switch(data.aspectRatio) {
        case '16:9':
          paddingBottom = '56.25%';
          break;
        case '4:3':
          paddingBottom = '75%';
          break;
        case '1:1':
          paddingBottom = '100%';
          break;
        default:
          paddingBottom = '56.25%';
      }

      targetDiv2.style.paddingBottom = paddingBottom;
      targetDiv2.style.height = '0';

      let contentDiv = targetDiv2.querySelector('.content.img-in-ratio');
      if (contentDiv) {
        contentDiv.style.position = 'absolute';
        contentDiv.style.top = '0';
        contentDiv.style.left = '0';
        contentDiv.style.width = '100%';
        contentDiv.style.height = '100%';
        contentDiv.style.backgroundSize = 'cover';
        contentDiv.style.backgroundPosition = 'center';
      }

      console.log("Div resized to aspect ratio:", data.aspectRatio);
    } else {
      console.log("Target div or aspect ratio not found!");
    }
  } else {
    console.log("This URL is not allowed.");
  }
});
