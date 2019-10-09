/* var THREE */
var cameras = []
var camera, scene, renderer
var geometry, material, mesh

var gun1, gun2, gun3, wall
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
        material = new THREE.MeshBasicMaterial({ color: 0x009933, wireframe: true })
        mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(x, y, z)
    
        return mesh
	}   
}

class Gun extends THREE.Object3D {
    constructor(x , y, z) {
        super()

        this.main = new THREE.Object3D()
        this.main.add(this.addMainChamber(0, 0, 0))
        this.main.add(this.addMainChamberBack(0, 0, 0))
        this.main.add(this.addMainChamberHold(0, 0, 0))
        this.main.add(this.addMouthHold(-8, 0, 0))
        this.main.add(this.addMouth(0, 0, 0))
        this.main.position.set(6, 5, 0)

        this.main.rotateZ(0.05)

        this.base = new THREE.Object3D()
        this.base.add(this.addFrameDown(0, 0, 0))
        this.base.add(this.addSupport(6, 0, 0))
        this.base.add(this.addSupport(-2, 0, 0))
        this.base.add(this.main)
        this.base.add(this.addWheelsLeft(-2, 2, -5))
        this.base.add(this.addWheelsRight(-2, 2, 5))
        this.base.position.set(0, 0, 0)

        this.add(this.base)
        this.position.set(x, y, z)
    }

    addMainChamber(x, y, z) {
        'use strict'
        console.log("Main Chamber: " + x)
        geometry = new THREE.CylinderGeometry(2, 3, 13)
        material = new THREE.MeshBasicMaterial({ color: 0x66ff66, wireframe: true })
        mesh = new THREE.Mesh(geometry, material)
        mesh.rotateZ(2 * Math.PI / 4)
        mesh.position.set(x - 6.5, y, z)

        return mesh
    }

    addMainChamberBack(x, y, z) {
        'use strict'

        geometry = new THREE.SphereGeometry(3, 7, 7, 2 * Math.PI / 4, 2 * Math.PI / 2)
        material = new THREE.MeshBasicMaterial({ color: 0x66ff66, wireframe: true })
        mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(x, y, z)

        return mesh
    }

    addMainChamberHold(x, y, z) {
        'use strict'

        geometry = new THREE.TorusGeometry(3 + 0.50, 0.50, 5)
        material = new THREE.MeshBasicMaterial({ color: 0x006600, wireframe: true })
        mesh = new THREE.Mesh(geometry, material)
        mesh.rotateY(2 * Math.PI / 4)
        mesh.position.set(x, y, z)

        return mesh
    }

    addMouthHold(x, y, z) {
        'use strict'

        geometry = new THREE.TorusGeometry(3 + 0.50, 0.50, 5)
        material = new THREE.MeshBasicMaterial({ color: 0x006600, wireframe: true })
        mesh = new THREE.Mesh(geometry, material)
        mesh.rotateY(2 * Math.PI / 4)
        mesh.position.set(x, y, z)

        return mesh
    }

    addMouth(x, y, z) {
        'use strict'

        geometry = new THREE.CylinderGeometry(2 + 0.25, 2, 1)
        material = new THREE.MeshBasicMaterial({ color: 0xccffcc, wireframe: true })
        mesh = new THREE.Mesh(geometry, material)
        mesh.rotateZ(2 * Math.PI / 4)
        mesh.position.set(x - 13.5, y, z)

        return mesh
    }

    addFrameDown(x, y, z) {
        'use strict'
        console.log("Frame: " + x)
        var frame = new THREE.Object3D()
        material = new THREE.MeshBasicMaterial({ color: 0x006600, wireframe: true })

        geometry = new THREE.BoxGeometry(20, 1.75, 1.75)
        mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(x, y, z - 4)
        frame.add(mesh)

        geometry = new THREE.BoxGeometry(20, 1.75, 1.75)
        mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(x, y, z + 4)
        frame.add(mesh)

        geometry = new THREE.BoxGeometry(1.75, 1.75, 8 - 1.75)
        mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(x + 6, y, z)
        frame.add(mesh)

        return frame

    }

    addSupport(x, y, z) {
        'use strict'
        
        var frame = new THREE.Object3D()
        material = new THREE.MeshBasicMaterial({ color: 0x006600, wireframe: true })

        geometry = new THREE.BoxGeometry(1, 8, 1)
        mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(x, y + 5, z - 4)
        frame.add(mesh)

        geometry = new THREE.BoxGeometry(1, 8, 1)
        mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(x, y + 5, z + 4)
        frame.add(mesh)

        return frame
    }

    addWheelsLeft(x,y,z){
        'use strict'

        geometry = new THREE.CylinderGeometry(2 + 1, 3, 2)
        material = new THREE.MeshBasicMaterial({ color: 0x663300, wireframe: true })
        mesh = new THREE.Mesh(geometry, material)
        mesh.rotateX(2 * Math.PI / 4)
        mesh.position.set(x, y, z)

        return mesh
    }

    addWheelsRight(x,y,z){
        'use strict'

        geometry = new THREE.CylinderGeometry(2 + 1, 3, 2)
        material = new THREE.MeshBasicMaterial({ color: 0x663300, wireframe: true })
        mesh = new THREE.Mesh(geometry, material)
        mesh.rotateX(2 * Math.PI / 4)
        mesh.position.set(x, y, z)

        return mesh
    }

}

class Ball extends THREE.Object3D {
    constructor(x, y, z) {
        super()

        this.velocity = new THREE.Vector3(0, 0, 0)
        geometry = new THREE.SphereGeometry(2, 20, 20)
        material = new THREE.MeshBasicMaterial({ color: 0x99ff99, wireframe: true })
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
    gun1 = new Gun(80, 0, 0)
    gun2 = new Gun(80, 0, - 20)
    gun3 = new Gun(80, 0, 20)

    scene.add(wall)
    scene.add(gun1)
    scene.add(gun2)
    scene.add(gun3)

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