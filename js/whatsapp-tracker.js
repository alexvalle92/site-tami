(function() {
  let currentGreeting = null;

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
      if (data.success) {
        sessionStorage.setItem('infoId', data.infoId);
        if (data.greeting) {
          currentGreeting = data.greeting;
          sessionStorage.setItem('greeting', JSON.stringify(data.greeting));
        }
      }
    })
    .catch(error => console.error('Error tracking pageview:', error));
  }

  document.addEventListener('DOMContentLoaded', function() {
    trackPageview();

    document.querySelectorAll('a[href*="wa.me"]').forEach(function(link) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        window.open(this.href, '_blank');
      });
    });
  });
})();
