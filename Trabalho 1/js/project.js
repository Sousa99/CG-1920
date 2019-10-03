/* var THREE */
var cameras = []
var camera, scene, renderer
var geometry, material, mesh

var robot, target

const VELOCITY_CONSTANT = 0.1
const ROTATE_VELOCITY_CONSTANT = 0.01

var SCREEN_WIDTH = window.innerWidth
var SCREEN_HEIGHT = window.innerHeight
var aspect = SCREEN_WIDTH / SCREEN_HEIGHT
var frustumSize = 100

function render() {
    'use strict'
    renderer.render(scene, cameras[camera])
}

class Robot extends THREE.Object3D {
    constructor(x, y, z) {
        super()

        this.movement = new THREE.Vector3(0, 0, 0)
        this.rotationMovement = [0, 0, 0]
        this.angle1 = 0

        this.hand = new THREE.Object3D()
        this.hand.add(this.addArt(x, y, z))
        this.hand.add(this.addHand(x + 3, y, z))
        this.hand.add(this.addFinger(x + 6.25, y, z + 1.55))
        this.hand.add(this.addFinger(x + 6.25, y, z - 1.55))
        this.hand.position.set(x + 25.75, y, z)
        
        this.forearm = new THREE.Object3D()
        this.forearm.add(this.addArt(x , y, z))
        this.forearm.add(this.addHalfArm(x + 12.75, y, z, true))
        this.forearm.add(this.hand)
        this.forearm.position.set(x, y + 30, z)
        
        this.arm = new THREE.Object3D()
        this.arm.add(this.addHalfArm(x , y + 17, z))
        this.arm.add(this.addMainArt(x , y, z))
        this.arm.add(this.forearm)
        this.arm.position.set(x, y + 3, z)
        
        this.base = new THREE.Object3D()
        this.base.add(this.addBase(x, y + 2, z))
        this.base.add(this.addWheel(x + 17, y, z + 17))
        this.base.add(this.addWheel(x - 17, y, z + 17))
        this.base.add(this.addWheel(x + 17, y, z - 17))
        this.base.add(this.addWheel(x - 17, y, z - 17))
        this.base.add(this.arm)
        this.base.position.set(x, y, z)

        this.position.set(x, y, z)

        this.add(this.base)
    }

	addHand(x, y, z) {
		geometry = new THREE.CubeGeometry(1.5, 6, 6)
		material = new THREE.MeshBasicMaterial({ color: 0x4da6ff, wireframe: true})
		mesh = new THREE.Mesh(geometry, material)
		mesh.position.set(x, y, z)

		return mesh
	}   

	addFinger(x, y, z) {
		geometry = new THREE.CubeGeometry(5, 1, 1)
		material = new THREE.MeshBasicMaterial({ color: 0x33ccff, wireframe: true})
		mesh = new THREE.Mesh(geometry, material)
		mesh.position.set(x, y, z)

		return mesh
	} 

    addBase(x, y, z) {
        'use strict'

        geometry = new THREE.CubeGeometry(40, 2, 40)
        material = new THREE.MeshBasicMaterial({ color: 0x003366, wireframe: true })
        mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(x, y, z)

        return mesh
    }

    addWheel(x, y, z) {
        'use strict'

        geometry = new THREE.SphereGeometry(2,6, 6)
        material = new THREE.MeshBasicMaterial({ color: 0x33ccff, wireframe: true })
        mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(x, y, z)

        return mesh
    }

    addMainArt(x, y, z) {
        'use strict'

        geometry = new THREE.SphereBufferGeometry(7, 16, 16, undefined, undefined, 0, Math.PI / 2)
        material = new THREE.MeshBasicMaterial({ color: 0x0059b3, wireframe: true })
        mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(x, y, z)

        return mesh
    }

    addHalfArm(x, y, z, forearm) {
        'use strict'
    
        geometry = new THREE.BoxGeometry(3, 21, 3)
        material = new THREE.MeshBasicMaterial({ color: 0x4da6ff, wireframe: true })
        mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(x, y, z)

        if (forearm)
            mesh.rotateZ(Math.PI / 2)
    
        return mesh
    }

    addArt(x, y, z) {
        'use strict'
    
        geometry = new THREE.SphereGeometry(2.5, 7, 7, 70)
        material = new THREE.MeshBasicMaterial({ color: 0x0059b3, wireframe: true })
        mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(x, y, z)
    
        return mesh
    }

    move() {
        'use strict'
        this.translateOnAxis(this.movement, VELOCITY_CONSTANT)
    }

    rotateArms() {
        'use strict'

        this.angle1 += ROTATE_VELOCITY_CONSTANT * this.rotationMovement[0]
        this.arm.rotateY(ROTATE_VELOCITY_CONSTANT * this.rotationMovement[0])
    }

    toggleWireframe() {
        'use strict'

        var toChange = new Array()

        toChange = toChange.concat(this)

        while (toChange.length > 0) {
            var current = toChange.shift()

            if (current.type == "Object3D")
                toChange = toChange.concat(current.children)
            else if (current.type == "Mesh")
                current.material.wireframe = !current.material.wireframe
        }
    }
}

class Target extends THREE.Object3D {
    constructor(x , y, z) {
        super()

        this.addTorus(x, y + 30, z)
        this.addBaseTarget(x, y, z)

        this.position.set(x, y, z)
    }

    addBaseTarget(x, y, z) {
        'use strict'
    
        geometry = new THREE.CylinderGeometry(5, 5, 25)
        material = new THREE.MeshBasicMaterial({ color: 0x4da6ff, wireframe: true })
        mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(x, y + 25 / 2, z)
    
        this.add(mesh)
    }

    addTorus(x, y, z) {
        'use strict'
    
        geometry = new THREE.TorusGeometry(4.5, 1, 12, 12)
        material = new THREE.MeshBasicMaterial({ color: 0x0059b3, wireframe: true })
        mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(x, y, z)
    
        this.add(mesh)
    }

    toggleWireframe() {
        'use strict'
        var toChange = new Array()

        toChange = toChange.concat(this)

        while (toChange.length > 0) {
            var current = toChange.shift()

            if (current.type == "Object3D")
                toChange = toChange.concat(current.children)
            else if (current.type == "Mesh")
                current.material.wireframe = !current.material.wireframe
        }
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

function createScene() {
    'use strict'

    scene = new THREE.Scene()
    scene.add(new THREE.AxesHelper(10))

    robot = new Robot(0, 0, 0)
    target = new Target(30, 0, 0)
    scene.add(robot)
    scene.add(target)
}

function onResize() {
    'use strict'

    renderer.setSize(window.innerWidth, window.innerHeight)

    cameras[camera].left = - window.innerWidth / 2
    cameras[camera].right = window.innerWidth / 2
    cameras[camera].top = window.innerHeight / 2
    cameras[camera].bottom = - window.innerHeight / 2
    cameras[camera].updateProjectionMatrix()
}

function onKeyDown(e){
    'use strict'

    switch (e.keyCode) {
    case 37: //arrow_left
        robot.movement.setZ(-1)
        break
    case 38: //arrow_up
        robot.movement.setX(1)
        break
    case 39: //arrow_right
        robot.movement.setZ(1)
        break
    case 40: //arrow_down
        robot.movement.setX(-1)
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
    
    case 52: // 4
        robot.toggleWireframe()
        target.toggleWireframe()
        break

    case 65: //a
        robot.rotationMovement[0] = 1
        break
    case 83: //s
        robot.rotationMovement[0] = -1
        break
    }

}

function onKeyUp(e){
    'use strict'

    switch (e.keyCode) {
    case 37: //arrow_left
    case 39: //arrow_right
        robot.movement.setZ(0)
        break
    case 38: //arrow_up
    case 40: //arrow_down
        robot.movement.setX(0)
        break

    case 65: //a
    case 83: //s
        robot.rotationMovement[0] = 0
        break
    }
}

function animate() {
    'use strict'

    robot.move()
    robot.rotateArms()

    render()
    requestAnimationFrame(animate)
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