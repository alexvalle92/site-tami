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

  function buildWhatsappUrl(originalUrl, greetingMessage) {
    try {
      const url = new URL(originalUrl);
      const phone = url.pathname.replace('/', '');
      const encodedMessage = encodeURIComponent(greetingMessage);
      return `https://wa.me/${phone}?text=${encodedMessage}`;
    } catch {
      return originalUrl;
    }
  }

  function getGreetingMessage() {
    if (currentGreeting && currentGreeting.greeting_message) {
      return currentGreeting.greeting_message;
    }
    const stored = sessionStorage.getItem('greeting');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return parsed.greeting_message || null;
      } catch {
        return null;
      }
    }
    return null;
  }

  function trackPageview() {
    const gclid = getGclid();
    
    if (!gclid) {
      return;
    }

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
        const greetingMessage = getGreetingMessage();
        let finalUrl = this.href;
        
        if (greetingMessage) {
          finalUrl = buildWhatsappUrl(this.href, greetingMessage);
        }
        
        window.open(finalUrl, '_blank');
      });
    });
  });
})();
