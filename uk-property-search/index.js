let currentLat = null
let currentLon = null
let currentPostcode = null
let crystalRoofUrl = null
let button1 = null
let button2 = null

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
  button1.textContent = `Copy postcode ${currentPostcode}`
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

  // Add button to the page
  div.appendChild(button1)
  div.appendChild(button2)
}

function getCrystalRoofUrl(postcode) {
  let postcode_nospace = postcode.replace(/\s/g, '')
  return `https://crystalroof.co.uk/report/postcode/${postcode_nospace}/overview`
}

function setPostcode(postcode) {
  if (postcode === currentPostcode) return
  currentPostcode = postcode
  crystalRoofUrl = getCrystalRoofUrl(postcode)
  if(button1) {
    button1.textContent = `Copy postcode ${currentPostcode}`
  }
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
  let regex = /^(\d+\.\d+) miles$/;
  for(let el of [...document.querySelectorAll("span,div")]) {
    let m = el.innerText.match(regex)
    if (m) {
      console.log("fixing m")
      let miles = parseFloat(m)
      let km = 1.6 * miles
      let minutes = km * 12
      // el.innerText = `${miles} miles / ${km.toFixed(1)} km / ${minutes.toFixed(0)} min`
      el.innerText = `${km.toFixed(1)} km / ${minutes.toFixed(0)} min`
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
