/* var THREE */
var cameras =[]
var camera, scene, renderer
var geometry, material, mesh

var SCREEN_WIDTH = window.innerWidth
var SCREEN_HEIGHT = window.innerHeight
var PROPORTION = 1 / 15
var FRAMERATE = 60
var aspect = SCREEN_WIDTH / SCREEN_HEIGHT
var frustumSize = 115

const VELOCITY_CONSTANT = 1
const ROTATE_VELOCITY_CONSTANT = 0.01

var room
var directionalLight
var spotlights = []

function render() {
    'use strict'
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.render(scene, cameras[camera])
}

function createOrthographicCamera(x, y, z) {
    'use strict'

    var camera = new THREE.OrthographicCamera(frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, - 100, 100 )

    camera.position.x = x
    camera.position.y = y
    camera.position.z = z
    camera.lookAt(scene.position)

    return camera
}

function createPerspectiveCamera(x, y, z) {
    'use strict'

    var camera = new THREE.PerspectiveCamera(45, aspect, 1, 500 )
    camera.position.x = x
    camera.position.y = y
    camera.position.z = z
    camera.lookAt(scene.position)
    
    return camera
}

function onKeyDown(e){
    'use strict'

    switch (e.keyCode) {
    
    case 49: // 1
        spotlights[0].changeActiveState = true
        break
    case 50: // 2
        spotlights[1].changeActiveState = true
        break
    case 51: // 3
        spotlights[2].changeActiveState = true
        break
    case 52: //4
        spotlights[3].changeActiveState = true
        break
    case 53: //Perspectivecamera
        camera = 0
        break
    case 54: //Ortogonalcamera 
        camera = 1
        break
    
    case 81: //q
        directionalLight.changeActiveState = true
        break
    case 87: //w
        //active or deactive ilumination
        break
    case 69: //e
        //diffuse or Phong
        break
    }
}

function onKeyUp(e){
    'use strict'

    switch (e.keyCode) {
    case 53://PerspectiveCamera
    case 54://OrtogonalCamera
        break
    case 81: //q
    case 87: //w
        break
    case 69: //e
        break
    }
   
}

function animate() {
    'use strict'

    directionalLight.updateLight()
    for(var i = 0; i < spotlights.length; i++){
        spotlights[i].changeActivation()
    }

    render()
    setTimeout( function() {
        requestAnimationFrame(animate)
    }, 1000 / FRAMERATE )
}

function createScene() {
    'use strict'

    scene = new THREE.Scene()

    room = new Room(0, 0, 0)
    scene.add(room)

    spotlights.push(new Spotlight(50, 25 , 50, room))
    spotlights.push(new Spotlight(50, 45, 0, room))
    spotlights.push(new Spotlight(50, 45, 50, room))
    spotlights.push(new Spotlight(0, 45, 50, room))

    for (var i = 0; i < spotlights.length; i++) {
        scene.add(spotlights[i])
    }

    directionalLight = new Light(50, 50, 50, 0xffffff, 0.25, scene)
    scene.add(directionalLight)
}

function onResize() {
    'use strict'

    renderer.setSize(window.innerWidth, window.innerHeight)
    SCREEN_WIDTH = window.innerWidth
    SCREEN_HEIGHT = window.innerHeight
    aspect = SCREEN_WIDTH / SCREEN_HEIGHT
}

function init() {
    'use strict'

    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio( window.devicePixelRatio)
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT)

    document.body.appendChild(renderer.domElement)

    createScene()

    camera = 0
    cameras[0] = createOrthographicCamera(0, 20, 0)
    cameras[1] = createPerspectiveCamera(125, 50, 125)

    render()

    window.addEventListener("resize", onResize)
    window.addEventListener("keydown", onKeyDown)
    window.addEventListener("keyup", onKeyUp)
}