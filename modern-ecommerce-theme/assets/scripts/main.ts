import Alpine from 'alpinejs'

// Make Alpine available globally
window.Alpine = Alpine

// Cart store with enhanced functionality
Alpine.store('cart', {
  count: 0,
  isOpen: false,
  items: [],
  subtotal: 0,
  
  async init() {
    await this.refresh()
  },
  
  async refresh() {
    try {
      const response = await fetch('/cart.js')
      const cart = await response.json()
      this.count = cart.item_count
      this.items = cart.items
      this.subtotal = cart.items_subtotal_price
    } catch (error) {
      console.error('Failed to refresh cart:', error)
    }
  },
  
  toggle() {
    this.isOpen = !this.isOpen
    document.dispatchEvent(new CustomEvent('cart:toggle'))
  }
})

// Performance optimizations
const performanceOptimizations = {
  // Lazy load images
  initLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement
            const src = img.dataset.src
            if (src) {
              img.src = src
              img.classList.remove('lazy')
              imageObserver.unobserve(img)
            }
          }
        })
      })
      
      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img)
      })
    }
  },
  
  // Preload critical resources
  preloadCriticalResources() {
    const criticalImages = [
      '/assets/hero-image.webp',
      '/assets/logo.svg'
    ]
    
    criticalImages.forEach(src => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = src
      document.head.appendChild(link)
    })
  },
  
  // Optimize Core Web Vitals
  optimizeCWV() {
    // Reduce layout shift by setting image dimensions
    document.querySelectorAll('img:not([width]):not([height])').forEach(img => {
      img.addEventListener('load', () => {
        if (!img.hasAttribute('width') && !img.hasAttribute('height')) {
          img.width = img.naturalWidth
          img.height = img.naturalHeight
        }
      })
    })
  }
}

// Analytics and tracking
const analytics = {
  // Track page views
  trackPageView() {
    if (typeof gtag !== 'undefined') {
      gtag('config', 'GA_MEASUREMENT_ID', {
        page_title: document.title,
        page_location: window.location.href
      })
    }
  },
  
  // Track ecommerce events
  trackAddToCart(productId: string, productName: string, price: number) {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'add_to_cart', {
        currency: 'USD',
        value: price,
        items: [{
          item_id: productId,
          item_name: productName,
          price: price,
          quantity: 1
        }]
      })
    }
  },
  
  // Track search events
  trackSearch(searchTerm: string) {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'search', {
        search_term: searchTerm
      })
    }
  }
}

// Conversion optimization features
const conversionOptimizations = {
  // Exit intent popup
  initExitIntent() {
    let hasShownPopup = false
    
    document.addEventListener('mouseleave', (e) => {
      if (e.clientY <= 0 && !hasShownPopup) {
        hasShownPopup = true
        this.showExitIntentOffer()
      }
    })
  },
  
  showExitIntentOffer() {
    // Trigger exit intent modal
    document.dispatchEvent(new CustomEvent('show:exit-intent'))
  },
  
  // Urgency timers
  initUrgencyTimers() {
    document.querySelectorAll('[data-countdown]').forEach(element => {
      const endTime = parseInt(element.dataset.countdown || '0')
      this.startCountdown(element as HTMLElement, endTime)
    })
  },
  
  startCountdown(element: HTMLElement, endTime: number) {
    const timer = setInterval(() => {
      const now = Date.now()
      const timeLeft = endTime - now
      
      if (timeLeft <= 0) {
        clearInterval(timer)
        element.textContent = 'Offer expired!'
        return
      }
      
      const hours = Math.floor(timeLeft / (1000 * 60 * 60))
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000)
      
      element.textContent = `${hours}h ${minutes}m ${seconds}s`
    }, 1000)
  }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  performanceOptimizations.initLazyLoading()
  performanceOptimizations.preloadCriticalResources()
  performanceOptimizations.optimizeCWV()
  
  conversionOptimizations.initExitIntent()
  conversionOptimizations.initUrgencyTimers()
  
  analytics.trackPageView()
})

// Search functionality
document.addEventListener('DOMContentLoaded', () => {
  const searchForms = document.querySelectorAll('form[action="/search"]')
  searchForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      const formData = new FormData(form as HTMLFormElement)
      const searchTerm = formData.get('q') as string
      if (searchTerm) {
        analytics.trackSearch(searchTerm)
      }
    })
  })
})

// Start Alpine
Alpine.start()

console.log('Enhanced theme scripts loaded with performance optimizations')
