(function() {
  let clickId = null;

  function getGclid() {
    const urlParams = new URLSearchParams(window.location.search);
    let gclid = urlParams.get('gclid');
    
    if (gclid) {
      sessionStorage.setItem('gclid', gclid);
      return gclid;
    }
    
    return sessionStorage.getItem('gclid') || '';
  }

  function trackPageview() {
    const gclid = getGclid();
    
    fetch('/api/track-pageview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        gclid: gclid,
        pageUrl: window.location.href
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success && data.clickId) {
        clickId = data.clickId;
        sessionStorage.setItem('clickId', clickId);
      }
    })
    .catch(error => console.error('Error tracking pageview:', error));
  }

  function extractGreetingFromUrl(whatsappUrl) {
    try {
      const url = new URL(whatsappUrl);
      return url.searchParams.get('text') || '';
    } catch {
      return '';
    }
  }

  function handleWhatsappClick(whatsappUrl) {
    const currentClickId = clickId || sessionStorage.getItem('clickId');
    const greetingMessage = extractGreetingFromUrl(whatsappUrl);

    if (currentClickId && greetingMessage) {
      fetch('/api/save-greeting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          greetingMessage: decodeURIComponent(greetingMessage),
          clickId: parseInt(currentClickId)
        })
      }).finally(() => {
        window.open(whatsappUrl, '_blank');
      });
    } else {
      window.open(whatsappUrl, '_blank');
    }
  }

  document.addEventListener('DOMContentLoaded', function() {
    trackPageview();

    document.querySelectorAll('a[href*="wa.me"]').forEach(function(link) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        handleWhatsappClick(this.href);
      });
    });
  });
})();
