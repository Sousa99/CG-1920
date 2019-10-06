/* var THREE */
var cameras = []
var camera, scene, renderer
var geometry, material, mesh

var gun,wall
var balls = []

var SCREEN_WIDTH = window.innerWidth
var SCREEN_HEIGHT = window.innerHeight
var aspect = SCREEN_WIDTH / SCREEN_HEIGHT
var frustumSize = 115


function render() {
    'use strict'
    renderer.render(scene, cameras[camera])
}

class Wall extends THREE.Object3D {
    constructor(x, y, z) {
        super()

        var rightWall = this.addWall(x, y + 10, z - 26.5)
        var frontWall = this.addWall(x - 23.5, y + 10, z)
        var leftWall = this.addWall(x, y + 10, z + 26.5)

        frontWall.rotateY(2 * Math.PI / 4)

        this.add(rightWall)
        this.add(frontWall)
        this.add(leftWall)

        this.position.set(x, y, z)
    }

	addWall(x, y, z) {
		'use strict'
    
        geometry = new THREE.BoxGeometry(50, 20 ,3)
        material = new THREE.MeshBasicMaterial({ color: 0x4da6ff, wireframe: true })
        mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(x, y, z)
    
        return mesh
	}   
}

class Gun extends THREE.Object3D {
    constructor(x , y, z) {
        super()

        this.add(this.addGun(x, y, z))
        this.position.set(x, y, z)
    }

    addGun(x, y, z) {
        'use strict'
    
        geometry = new THREE.CylinderGeometry(2, 2, 5)
        material = new THREE.MeshBasicMaterial({ color: 0x4da6ff, wireframe: true })
        mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(x, y + 5 / 2, z)
    
        return mesh
    }

}

class Ball extends THREE.Object3D {
    constructor(x, y, z) {
        super()

        this.velocity = new THREE.Vector3(0, 0, 0)
        geometry = new THREE.SphereGeometry(2, 20, 20)
        material = new THREE.MeshBasicMaterial({ color: 0x4da6ff, wireframe: true })
        mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(x, y + 2, z)

        this.add(mesh)
    }
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
        //robot.movement.setZ(-1)
        break
    case 39: //arrow_right
        //robot.movement.setZ(1)
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
        //robot.rotationMovement[1] = 1
        break
    case 87: //w
        //robot.rotationMovement[1] = -1
        break
    case 69: //e
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
        //robot.movement.setZ(0)
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

    render()
    requestAnimationFrame(animate)
}

function createScene() {
    'use strict'

    scene = new THREE.Scene()
    scene.add(new THREE.AxesHelper(10))

    wall = new Wall(0, 0, 0)
    //gun = new Gun(30, 0, 0)

    scene.add(wall)
    scene.add(gun)

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