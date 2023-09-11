import Nprogress from 'nprogress'

Nprogress.configure({
  showSpinner: false
})

export const nprogress = {
  start() {
    Nprogress.start()
  },
  end() {
    Nprogress.done()
  }
}