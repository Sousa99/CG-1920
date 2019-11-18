/* var THREE */
var activeScene, renderer
var geometry, material, mesh
var cameras = []
var scenes = []

var SCREEN_WIDTH = window.innerWidth
var SCREEN_HEIGHT = window.innerHeight
var ASPECT_RATIO = 16 / 9
var PROPORTION = 1 / 15
var FRAMERATE = 80
var aspect = SCREEN_WIDTH / SCREEN_HEIGHT
var zoom = 1
var frustumSize = 200

function render() {
    'use strict'
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.render(scenes[activeScene], cameras[scenes[activeScene].camera])
}

function createOrthographicCamera(x, y, z, lookAt) {
    'use strict'

    var camera = new THREE.OrthographicCamera(frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, - 100, 100 )

    camera.position.x = x
    camera.position.y = y
    camera.position.z = z
    camera.lookAt(lookAt.position)

    return camera
}

function createPerspectiveCamera(x, y, z, lookAt) {
    'use strict'

    var camera = new THREE.PerspectiveCamera(45, aspect, 1, 500 )
    camera.position.x = x
    camera.position.y = y
    camera.position.z = z
    camera.lookAt(lookAt.position)
    camera.zoom = zoom

    camera.updateProjectionMatrix()
    
    return camera
}

function onKeyDown(e){
    'use strict'
    scenes[activeScene].onKeyDown(e)
}

function animate() {
    'use strict'

    scenes[activeScene].animate()

    render()
    setTimeout( function() {
        requestAnimationFrame(animate)
    }, 1000 / FRAMERATE )
}

function onResize() {
    'use strict'

    renderer.setSize(window.innerWidth, window.innerHeight)
    SCREEN_WIDTH = window.innerWidth
    SCREEN_HEIGHT = window.innerHeight
    aspect = SCREEN_WIDTH / SCREEN_HEIGHT
    var zoom = 1

    cameras[1].left = frustumSize * aspect / - 2
    cameras[1].right = frustumSize * aspect / 2
    cameras[1].updateProjectionMatrix()

    if (aspect < ASPECT_RATIO)
        zoom = aspect / ASPECT_RATIO
    
    cameras[0].aspect = aspect
    cameras[0].zoom = zoom
    cameras[0].updateProjectionMatrix()
    
    cameras[2].aspect = aspect
    cameras[2].zoom = zoom
    cameras[2].updateProjectionMatrix()
}

function init() {
    'use strict'

    if (aspect < ASPECT_RATIO)
        zoom = aspect / ASPECT_RATIO

    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio( window.devicePixelRatio)
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT)

    document.body.appendChild(renderer.domElement)

    scenes.push(new MainScene())
    scenes.push(new PauseScene())
    activeScene = 0

    cameras.push(createPerspectiveCamera(125, 50, 125, scenes[0]))
    cameras.push(createOrthographicCamera(0, 50, 0, scenes[0]))
    cameras.push(createPerspectiveCamera(0, 0, 0, scenes[1]))

    render()

    window.addEventListener("resize", onResize)
    window.addEventListener("keydown", onKeyDown)
}