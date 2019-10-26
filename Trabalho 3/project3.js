/* var THREE */
var spotlights = []
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



function render() {
    'use strict'
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
        spotlight[0].activate = true
        spotlight[1].deactivate = true
        spotlight[2].deactivate = true
        spotlight[3].deactivate = true
        break
    case 50: // 2
        spotlight[1].activate = true
        spotlight[0].deactivate = true
        spotlight[2].deactivate = true
        spotlight[3].deactivate = true
        break
    case 51: // 3
        spotlight[2].activate = true
        spotlight[0].deactivate = true
        spotlight[1].deactivate = true
        spotlight[3].deactivate = true
        break
    case 52: //4
        spotlight[3].activate = true
        spotlight[0].deactivate = true
        spotlight[1].deactivate = true
        spotlight[2].deactivate = true
        break
    case 53: //Perspectivecamera
        break
    case 54: //Ortogonalcamera 
        break
    
    case 81: //q
        //active or deactive light
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

    for (var i = 0; i < balls.length; i++) {
        if (clickedR) balls[i].showAxis()

        balls[i].move()
        balls[i].deleteBall()
    }

    if (clickedR) {
        clickedR = false
        showingBallAxis = !showingBallAxis
    }

    for (var i = 0; i < guns.length; i++) {
        if (guns[i].cooldown > 0)
            guns[i].cooldown -= 1
        
        guns[i].activateCanon()
        guns[i].deactivateCanon()
        guns[i].rotateCanon()
        guns[i].shootBall(showingBallAxis)
    }

    if (selectedBall != undefined)
        cameras[2].lookAt(selectedBall.position)
    else if (lastCanonShot != undefined)
        cameras[2].lookAt(lastCanonShot.position)

    updateMovingCamera(cameras[2])


    render()
    setTimeout( function() {
        requestAnimationFrame(animate)
    }, 1000 / FRAMERATE )
}

function createScene() {
    'use strict'

    scene = new THREE.Scene()
    

    spotlight[0].activate = true
 
    
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
    cameras[1] = createPerspectiveCamera(150, 50, 75)
    cameras[2] = createMovingPerspectiveCamera(20, 20, 20)

    render()

    window.addEventListener("resize", onResize)
    window.addEventListener("keydown", onKeyDown)
    window.addEventListener("keyup", onKeyUp)
}