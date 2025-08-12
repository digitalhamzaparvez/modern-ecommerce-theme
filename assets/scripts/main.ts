import Alpine from 'alpinejs'

window.Alpine = Alpine

Alpine.store('cart', {
  count: 0
})

Alpine.start()

console.log('Theme scripts loaded')
