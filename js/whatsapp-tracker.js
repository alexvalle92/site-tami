(function() {
  function getGclid() {
    const urlParams = new URLSearchParams(window.location.search);
    let gclid = urlParams.get('gclid');
    
    if (gclid) {
      sessionStorage.setItem('gclid', gclid);
      return gclid;
    }
    
    return sessionStorage.getItem('gclid') || '';
  }

  function trackAndRedirect(whatsappUrl) {
    const gclid = getGclid();
    
    fetch('/api/track-click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        gclid: gclid,
        pageUrl: window.location.href,
        whatsappUrl: whatsappUrl
      })
    }).finally(() => {
      window.open(whatsappUrl, '_blank');
    });
  }

  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href*="wa.me"]').forEach(function(link) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        trackAndRedirect(this.href);
      });
    });
  });
})();
