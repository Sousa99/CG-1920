/* var THREE */
var cameras = []
var camera, scene, renderer
var geometry, material, mesh

var selectedBall
var lastCanonShot

var wall
var guns = []
var balls = []

var SCREEN_WIDTH = window.innerWidth
var SCREEN_HEIGHT = window.innerHeight
var PROPORTION = 1 / 15
var FRAMERATE = 60
var aspect = SCREEN_WIDTH / SCREEN_HEIGHT
var frustumSize = 115

const VELOCITY_CONSTANT = 1
const ROTATE_VELOCITY_CONSTANT = 0.01
const RADIUS_BALL = 2

var clickedR = false
var showingBallAxis = false

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

function createMovingPerspectiveCamera(x, y, z) {
    'use strict'

    var camera = new THREE.PerspectiveCamera(45, aspect, 1, 500 )
    guns[0].add(camera)

    camera.position.set(x, y, z)
    camera.lookAt(guns[0].position)

    return camera
}

function onKeyDown(e){
    'use strict'

    switch (e.keyCode) {
    case 37: //arrow_left
        for (var x = 0; x < guns.length; x++)
            guns[x].rotateLeft = true
        break
    case 39: //arrow_right
        for (var x = 0; x < guns.length; x++)
            guns[x].rotateRight = true
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
        guns[0].deactivate = true
        guns[1].activate = true
        guns[2].deactivate = true
        break
    case 87: //w
        guns[0].activate = true
        guns[1].deactivate = true
        guns[2].deactivate = true
        break
    case 69: //e
        guns[0].deactivate = true
        guns[1].deactivate = true
        guns[2].activate = true
        break

    case 82: //r
        clickedR = true
        break

    case 32: //space
        for (var x = 0; x < guns.length; x++)
            guns[x].shoot = true
        break
    }
}

function onKeyUp(e){
    'use strict'

    switch (e.keyCode) {
    case 37: //arrow_left
        for (var x = 0; x < guns.length; x++)
            guns[x].rotateLeft = false
        break
    case 39: //arrow_right
        for (var x = 0; x < guns.length; x++)
            guns[x].rotateRight = false
        break
    case 81: //q
    case 87: //w
        break
    case 69: //e
    case 82: //r
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

    guns[1].activate = true

    scene.add(wall)
    for (var i = 0; i < guns.length; i++) {
        scene.add(guns[i])
    }

    var numberBalls = Math.floor(Math.random() * 7 + 5)
    var ball, coordinateX, coordinateZ
    for (var i = 0; i < numberBalls; i ++) {
        var positionOK = false
        var distance, currentBall
        while (!positionOK) {
            coordinateX = Math.random() * 40 - 20
            coordinateZ = Math.random() * 40 - 20

            positionOK = true
            for (var x = 0; x < i; x++) {
                currentBall = balls[x]
                distance = Math.sqrt(Math.pow(currentBall.position.x - coordinateX, 2) + Math.pow(currentBall.position.z - coordinateZ, 2))
                if (distance < 2 * RADIUS_BALL) {
                    positionOK = false
                }
            }
        }

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

    cameras[0].left = frustumSize * aspect / - 2
    cameras[0].right = frustumSize * aspect / 2
    cameras[0].updateProjectionMatrix()

    for (var i = 1; i < 3; i++) {
        cameras[i].aspect = aspect
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
    cameras[0] = createOrthographicCamera(0, 20, 0)
    cameras[1] = createPerspectiveCamera(150, 50, 75)
    cameras[2] = createMovingPerspectiveCamera(50, 50, 50)

    render()

    window.addEventListener("resize", onResize)
    window.addEventListener("keydown", onKeyDown)
    window.addEventListener("keyup", onKeyUp)
}