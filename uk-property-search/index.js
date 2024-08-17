let currentLat = null
let currentLon = null
let currentPostcode = null
let crystalRoofUrl = null
let button1 = null
let button2 = null
let traveltime = null
let traveltimediv = null

function addCrystalRoofButton() {
  if (document.querySelector("#extension-buttons")) return

  let div = document.createElement('div')
  div.id = "extension-buttons"
  div.style.position = 'fixed'
  div.style.top = '10px'
  div.style.left = '10px'
  div.style.zIndex = '9999'
  document.body.appendChild(div)

  button1 = document.createElement('button')
  button1.textContent = `Copy postcode ${currentPostcode || 'unknown'}`
  button1.addEventListener('click', function() {
    navigator.clipboard.writeText(currentPostcode)
  })

  // Create button element
  button2 = document.createElement('button')
  button2.textContent = 'Open Crystal Roof Report'
  button2.id = "crystal-roof-button"

  // Add click event listener
  button2.addEventListener('click', function() {
    if(crystalRoofUrl) {
      window.open(crystalRoofUrl, '_blank')
    }
  })

  traveltimediv = document.createElement('button')
  traveltimediv.textContent = `Travel time: ${traveltime || 'unknown'}`

  // Add button to the page
  div.appendChild(button1)
  div.appendChild(button2)
  div.appendChild(traveltimediv)
}

function getCrystalRoofUrl(postcode) {
  let postcode_nospace = postcode.replace(/\s/g, '')
  return `https://crystalroof.co.uk/report/postcode/${postcode_nospace}/overview`
}

function findTravelTime() {
  let targetPostcode = "EC4V 3BJ"
  let from_esc = encodeURIComponent(currentPostcode)
  let to_esc = encodeURIComponent(targetPostcode)
  let url = `https://api.tfl.gov.uk/Journey/JourneyResults/${from_esc}/to/${to_esc}`
  fetch(url)
    .then(res => res.json())
    .then(res => {
      traveltime = Math.min(...res.journeys.map(j => j.duration))
      traveltimediv.textContent = `Travel time: ${traveltime || 'unknown'}`
    })
}

function setPostcode(postcode) {
  if (postcode === currentPostcode) return
  currentPostcode = postcode
  crystalRoofUrl = getCrystalRoofUrl(postcode)
  if(button1) {
    button1.textContent = `Copy postcode ${currentPostcode}`
  }
  findTravelTime()
}

function setLatLon(lat, lon) {
  if (lat === currentLat && lon === currentLon) return
  currentLat = lat
  currentLon = lon
  let postcode_api_url = `https://api.postcodes.io/postcodes?lon=${lon}&lat=${lat}`
  // console.log({lat, lon, postcode_api_url})
  fetch(postcode_api_url)
    .then(res => res.json())
    .then(res => {
      let postcodes = res.result.map(r => r.postcode)
      // console.log({postcodes})
      if(postcodes[0]) {
        setPostcode(postcodes[0])
      }
    })
}

function findLatLonRightmove() {
  let mapurl = [...document.querySelectorAll("img")].map(i => i.src).find(u => u && u.startsWith("https://media.rightmove.co.uk/map/_generate"))
  if(!mapurl) return
  let url = new URL(mapurl)
  let params = new URLSearchParams(url.search)
  let lat = params.get('latitude')
  let lon = params.get('longitude')
  setLatLon(lat, lon)
}

function findLatLonZoopla() {
  let mapurlset = [...document.querySelectorAll("picture source")].map(i => i.srcset).find(u => u.startsWith("https://maps.zoopla.co.uk/styles/portal/static/"))
  if(!mapurlset) return
  let [lon, lat] = mapurlset.split("/")[6].split(",")
  setLatLon(lat, lon)
}

function fixStupidUnits() {
  for(let el of [...document.querySelectorAll("span,div")]) {
    let m
    if (m = el.innerText.match(/^(\d+\.\d+) miles$/)) {
      let miles = parseFloat(m)
      let km = 1.6 * miles
      let minutes = km * 12
      el.innerText = `${km.toFixed(1)} km / ${minutes.toFixed(0)} min`
    }
    if (m = el.innerText.match(/^([0-9,]+)\ sq\. ft$/)) {
      let sqft = parseFloat(m[1].replace(/,/g, ''))
      let sqm = sqft / 10.7639
      el.innerText = `${sqm.toFixed(1)} m²`
      console.log({sqft, sqm})
    }
  }
}

function applyImprovements() {
  fixStupidUnits()
  findLatLonRightmove()
  findLatLonZoopla()
  addCrystalRoofButton()
}

setInterval(applyImprovements, 1000)
