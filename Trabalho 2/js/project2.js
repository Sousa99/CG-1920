/* var THREE */
var cameras = []
var camera, scene, renderer
var geometry, material, mesh

var wall
var guns = []
var gunsRotation = 0
var balls = []

var SCREEN_WIDTH = window.innerWidth
var SCREEN_HEIGHT = window.innerHeight
var aspect = SCREEN_WIDTH / SCREEN_HEIGHT
var frustumSize = 115

const ROTATE_VELOCITY_CONSTANT = 0.01

function render() {
    'use strict'
    renderer.render(scene, cameras[camera])
}

function createCamera(x, y, z) {
    'use strict'

    var camera = new THREE.OrthographicCamera(frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, - 100, 100 )

    camera.position.x = x
    camera.position.y = y
    camera.position.z = z
    camera.lookAt(scene.position)

    return camera
}

function onKeyDown(e){
    'use strict'

    switch (e.keyCode) {
    case 37: //arrow_left
        gunsRotation = 1
        break
    case 39: //arrow_right
        gunsRotation = -1
        break
    
    case 49: // 1
        camera = 0
        break
    case 50: // 2
        camera = 1
        break
    case 51: // 3
        camera = 2
        break
    
    case 81: //q
        if (!guns[1].active) {
            for (var x = 0; x < guns.length; x++)
                guns[x].deactivateCanon()
            guns[1].activateCanon()
        }
        break
    case 87: //w
        if (!guns[0].active) {
            for (var x = 0; x < guns.length; x++)
                guns[x].deactivateCanon()
            guns[0].activateCanon()
        }
        break
    case 69: //e
        if (!guns[2].active) {
            for (var x = 0; x < guns.length; x++)
                guns[x].deactivateCanon()
            guns[2].activateCanon()
        }
        break
    case 82: //r
        break
    }
}

function onKeyUp(e){
    'use strict'

    switch (e.keyCode) {
    case 37: //arrow_left
    case 39: //arrow_right
        gunsRotation = 0
        break
    case 81: //q
    case 87: //w
        //robot.rotationMovement[1] = 0
        break
    case 69: //e
    case 82: //r
        break
    }
   
}

function animate() {
    'use strict'

    for (var i = 0; i < guns.length; i++) {
        guns[i].rotateCanon()
    }

    render()
    requestAnimationFrame(animate)
}

function createScene() {
    'use strict'

    scene = new THREE.Scene()
    scene.add(new THREE.AxesHelper(10))

    wall = new Wall(0, 0, 0)
    guns.push(new Gun(80, 0, 0, 0))
    guns.push(new Gun(80, 0, - 30, 0.2))
    guns.push(new Gun(80, 0, 30, - 0.2))

    scene.add(wall)
    for (var i = 0; i < guns.length; i++) {
        scene.add(guns[i])
    }

    var numberBalls = Math.floor(Math.random() * 7 + 5)
    var ball, coordinateX, coordinateZ
    for (var i = 0; i < numberBalls; i ++) {
        coordinateX = Math.random() * 40 - 20
        coordinateZ = Math.random() * 40 - 20

        ball = new Ball(coordinateX, 0, coordinateZ)
        balls.push(ball)
        scene.add(ball)
    }
}

function onResize() {
    'use strict'

    renderer.setSize(window.innerWidth, window.innerHeight)
    SCREEN_WIDTH = window.innerWidth
    SCREEN_HEIGHT = window.innerHeight
    aspect = SCREEN_WIDTH / SCREEN_HEIGHT

    for (var i = 0; i < 3; i++) {
        cameras[i].left = frustumSize * aspect / - 2
        cameras[i].right = frustumSize * aspect / 2
        cameras[i].updateProjectionMatrix()
    }
}

function init() {
    'use strict'

    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio( window.devicePixelRatio)
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT)

    document.body.appendChild(renderer.domElement)

    createScene()

    camera = 0
    cameras[0] = createCamera(0, 20, 0)
    cameras[1] = createCamera(0, 0, 20)
    cameras[2] = createCamera(20, 0, 0)

    render()

    window.addEventListener("resize", onResize)
    window.addEventListener("keydown", onKeyDown)
    window.addEventListener("keyup", onKeyUp)
}