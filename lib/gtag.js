export const GA_TRACKING_ID = 'UA-40473834-1'

export const pageview = url => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}
