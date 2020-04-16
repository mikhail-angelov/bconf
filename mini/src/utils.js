export const getId = () => Math.random().toString(36).substring(2, 15)

export const getRoomFromUrl = () => {
  const search = window.location.hash
  const re = new RegExp('room=([^&=]+)')
  const results = re.exec(search)
  let room = ''
  if (results) {
    room = results[1]
  }
  return room
}
