export function retrieveVideoId (link) {
  var videoId = ''
  var pastRoot = false
  for (var i = 0; i < link.length; i++) {
    if (pastRoot) {
      videoId += link[i]
    } else if (link[i] === '=') {
      pastRoot = true
    }
  }
  return videoId
}