/* var THREE */
var cameras =[]
var camera, scene, renderer
var geometry, material, mesh

var objects = []

var SCREEN_WIDTH = window.innerWidth
var SCREEN_HEIGHT = window.innerHeight
var PROPORTION = 1 / 15
var FRAMERATE = 60
var aspect = SCREEN_WIDTH / SCREEN_HEIGHT
var frustumSize = 50

const VELOCITY_CONSTANT = 1
const ROTATE_VELOCITY_CONSTANT = 0.01

var room
var directionalLight
var spotlights = []
var frame, pedestal, icosahedron

var changeLightCalc = false
var changeMaterial = false

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

function turnOffLightCalc() {
    'use strict'

    if (!changeLightCalc)
        return

    var toChange = objects.slice()

    while (toChange.length > 0) {
        var current = toChange.shift()

        if (current.type == "Object3D")
            toChange = toChange.concat(current.children)
        else if (current.type == "Mesh")
            current.changeLightCalc()
    }

    changeLightCalc = false
}

function changeMaterialLight() {
    'use strict'

    if (!changeMaterial)
        return

    var toChange = objects.slice()

    while (toChange.length > 0) {
        var current = toChange.shift()

        if (current.type == "Object3D")
            toChange = toChange.concat(current.children)
        else if (current.type == "Mesh")
            current.changeMaterialLight()
    }

    changeMaterial = false
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
        changeLightCalc = true
        break
    case 69: //e
        changeMaterial = true
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

    turnOffLightCalc()
    changeMaterialLight()

    directionalLight.updateLight()
    for(var i = 0; i < spotlights.length; i++){
        spotlights[i].changeActivation()
    }

    icosahedron.rotateY(0.02)

    render()
    setTimeout( function() {
        requestAnimationFrame(animate)
    }, 1000 / FRAMERATE )
}

function createScene() {
    'use strict'

    scene = new THREE.Scene()

    room = new Room(0, 0, 0)
    objects.push(room)
    scene.add(room)

    frame = new Frame(-36.5, 25, 0)
    objects.push(frame)
    scene.add(frame)

    icosahedron = new Icosahedron(0, 2 * Math.E, 0, 2)
    pedestal = new Pedestal(20, 0, - 25, icosahedron)
    objects.push(pedestal)
    scene.add(pedestal)

    spotlights.push(new Spotlight(20, 20 , 25, 0.2, Math.PI / 6, pedestal.object))
    spotlights.push(new Spotlight(30, 50, 25, 0.2, Math.PI / 6, frame))
    spotlights.push(new Spotlight(30, 50, -25, 0.2, Math.PI / 6, frame))
    spotlights.push(new Spotlight(30, 50, 0, 0.2, Math.PI / 6, frame))

    for (var i = 0; i < spotlights.length; i++) {
        objects.push(spotlights[i])
        scene.add(spotlights[i])
    }

    directionalLight = new Light(50, 50, 50, 0xffffff, 0.90, scene)
    scene.add(directionalLight)
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