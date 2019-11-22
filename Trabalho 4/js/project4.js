/* var THREE */
var scene, renderer, camera, clock, previousCamera = 0
var geometry, material, mesh, pauseText
var cameras = []

var SCREEN_WIDTH = window.innerWidth
var SCREEN_HEIGHT = window.innerHeight
var ASPECT_RATIO = 16 / 9
var PROPORTION = 1 / 15
var FRAMERATE = 60
var aspect = SCREEN_WIDTH / SCREEN_HEIGHT
var zoom = 1
var frustumSize = 200

function render() {
    'use strict'
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.render(scene, cameras[camera])
}

function createOrthographicCamera(x, y, z, lookAt, pause) {
    'use strict'

    var camera = new THREE.OrthographicCamera(frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, - 100, 100 )

    camera.position.x = x
    camera.position.y = y
    camera.position.z = z
    camera.lookAt(lookAt.position)

    if (pause)
        camera.layers.enable(1)

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
    scene.onKeyDown(e)
}

function animate() {
    'use strict'

    var timeDiff = clock.getDelta()
    scene.animate(timeDiff)

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

    if (aspect <= ASPECT_RATIO)
        zoom = aspect / ASPECT_RATIO
    else zoom = 1

    cameras[0].aspect = aspect
    cameras[0].zoom = zoom
    cameras[0].updateProjectionMatrix()

    cameras[1].left = frustumSize * aspect / - 2
    cameras[1].right = frustumSize * aspect / 2
    cameras[1].zoom = zoom
    cameras[1].updateProjectionMatrix()
    
    cameras[2].left = frustumSize * aspect / - 2
    cameras[2].right = frustumSize * aspect / 2
    cameras[2].zoom = zoom
    cameras[2].updateProjectionMatrix()
}

function init() {
    'use strict'

    clock = new THREE.Clock(true)
    clock.start()
    console.log("Clock is Running: " + clock.running)

    if (aspect < ASPECT_RATIO)
        zoom = aspect / ASPECT_RATIO

    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio( window.devicePixelRatio)
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT)

    document.body.appendChild(renderer.domElement)

    scene = new MainScene()

    cameras.push(createPerspectiveCamera(125, 50, 125, scene))
    cameras.push(createOrthographicCamera(0, 50, 0, scene, false))
    cameras.push(createOrthographicCamera(0, 50, 0, scene, true))
    camera = 0

    render()

    window.addEventListener("resize", onResize)
    window.addEventListener("keydown", onKeyDown)
}