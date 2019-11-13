/* var THREE */
var cameras =[]
var camera, scene, renderer
var geometry, material, mesh

var objects = []

var SCREEN_WIDTH = window.innerWidth
var SCREEN_HEIGHT = window.innerHeight
var PROPORTION = 1 / 15
var FRAMERATE = 80
var aspect = SCREEN_WIDTH / SCREEN_HEIGHT
var frustumSize = 60

const VELOCITY_CONSTANT = 1
const ROTATE_VELOCITY_CONSTANT = 0.02


var directionalLight


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
    camera.lookAt(frame.position)

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
        break
    case 50: // 2
        break
    case 51: // 3
        break
    case 52: //4
        break
    case 53: //Perspectivecamera
        break
    case 54: //Ortogonalcamera 
        break
    
    case 68: //d
        
        break
    case 80: //p
        
        break
    case 76: //w
        
        break
    case 66: //b
        
        break
    case 83: //s
        
        break
    case 82: //r
        
        break
    }
}

function onKeyUp(e){
    'use strict'

    switch (e.keyCode) {
    case 53://PerspectiveCamera
    case 54://OrtogonalCamera
        break
    case 87: //w
        break

    }
}

function animate() {
    'use strict'

    render()
    setTimeout( function() {
        requestAnimationFrame(animate)
    }, 1000 / FRAMERATE )
}

function createScene() {
    'use strict'

    scene = new THREE.Scene()
}

function onResize() {
    'use strict'

    renderer.setSize(window.innerWidth, window.innerHeight)
    SCREEN_WIDTH = window.innerWidth
    SCREEN_HEIGHT = window.innerHeight
    aspect = SCREEN_WIDTH / SCREEN_HEIGHT

    cameras[1].left = frustumSize * aspect / - 2
    cameras[1].right = frustumSize * aspect / 2
    cameras[1].updateProjectionMatrix()

    cameras[0].aspect = aspect
    cameras[0].updateProjectionMatrix()
}

function init() {
    'use strict'

    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio( window.devicePixelRatio)
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT)

    document.body.appendChild(renderer.domElement)

    createScene()

    camera = 0
    cameras[0] = createPerspectiveCamera(125, 50, 125)
    cameras[1] = createOrthographicCamera(25, 25, 0)

    render()

    window.addEventListener("resize", onResize)
    window.addEventListener("keydown", onKeyDown)
    window.addEventListener("keyup", onKeyUp)
}