/* var THREE */
var camera, activeScene, renderer
var geometry, material, mesh
var scenes = []

var SCREEN_WIDTH = window.innerWidth
var SCREEN_HEIGHT = window.innerHeight
var PROPORTION = 1 / 15
var FRAMERATE = 80
var aspect = SCREEN_WIDTH / SCREEN_HEIGHT
var frustumSize = 60

var table, dice, ball
var directionalLight, pointLight

function render() {
    'use strict'
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.render(scenes[activeScene], camera)
}

function createPerspectiveCamera(x, y, z, lookAt) {
    'use strict'

    var camera = new THREE.PerspectiveCamera(45, aspect, 1, 500 )
    camera.position.x = x
    camera.position.y = y
    camera.position.z = z
    camera.lookAt(lookAt.position)
    
    return camera
}

function onKeyDown(e){
    'use strict'
    scenes[activeScene].onKeyDown(e)

    /*
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
        activeScene = (activeScene + 1) % scenes.length
        break
    case 82: //r
        
        break
    }
    */
}

function onKeyUp(e){
    'use strict'
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

    camera.aspect = aspect
    camera.updateProjectionMatrix()
}

function init() {
    'use strict'

    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio( window.devicePixelRatio)
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT)

    document.body.appendChild(renderer.domElement)

    scenes.push(new MainScene())
    scenes.push(new PauseScene())
    activeScene = 0

    camera = createPerspectiveCamera(125, 50, 125, scenes[0])

    render()

    window.addEventListener("resize", onResize)
    window.addEventListener("keydown", onKeyDown)
    window.addEventListener("keyup", onKeyUp)
}