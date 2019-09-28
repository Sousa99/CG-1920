/* var THREE */
var camera, scene, renderer
var geometry, material, mesh

var robot, target
var movementVector = [0, 0, 0]

const CAMERA_MAIN = 100

/* Object Sizes - Just for now */
const BASE_LENGTH = 40
const BASE_HEIGTH = 2
const WHEEL_RADIUS = 2
const ARM_RADIUS_BASE = 4


function render() {
    'use strict'
    renderer.render(scene, camera)
}

function addBase(obj, x, y, z) {
    'use strict'

    var base = new THREE.Object3D()

    geometry = new THREE.CubeGeometry(BASE_LENGTH, BASE_HEIGTH, BASE_LENGTH)
    material = new THREE.MeshBasicMaterial({ color: 0x663300, wireframe: true })

    mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(x, y, z)

    

    obj.add(mesh)
}

function addWheel(obj,x,y,z){
    'use strict'

    geometry = new THREE.SphereGeometry(WHEEL_RADIUS,6, 6)
    material = new THREE.MeshBasicMaterial({ color: 0x33ccff, wireframe: true })
    material.side = THREE.DoubleSide; 
    mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(x, y, z)

    obj.add(mesh)
}

function addArm_base(obj, x, y, z) {
    'use strict'

    geometry = new THREE.SphereBufferGeometry(ARM_RADIUS_BASE,32,32)
    material = new THREE.MeshBasicMaterial({ color: 0xcc6600, wireframe: true })


    mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(x, y, z)

    obj.add(mesh)
}

function addBaseTarget(obj, x, y, z) {
    'use strict'

    geometry = new THREE.CylinderGeometry(5, 5, 25)
    material = new THREE.MeshBasicMaterial({ color: 0xcccc99, wireframe: true })

    mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(x, y + 25 / 2, z)

    obj.add(mesh)
}

function addTorus(obj, x, y, z) {
    'use strict'

    geometry = new THREE.TorusGeometry(4.5, 1, 12, 12)
    material = new THREE.MeshBasicMaterial({ color: 0x33ccff, wireframe: true })

    mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(x, y, z)

    obj.add(mesh)
}

function addHalfArmDown(obj, x, y, z){
    'use strict'

    geometry = new THREE.CylinderGeometry(2,2,12)
    material = new THREE.MeshBasicMaterial({ color: 0xcccc99, wireframe: true })

    mesh = new THREE.Mesh(geometry, material)
    mesh.rotation.x += 0.15;
    mesh.rotation.z += 0.15;
    mesh.position.set(x, y, z)

    obj.add(mesh)
}

function addSphereArm(obj, x, y, z){
    'use strict'

    geometry = new THREE.SphereGeometry(2,6,6,70)
    material = new THREE.MeshBasicMaterial({ color: 0x33ccff, wireframe: true })
     
    mesh = new THREE.Mesh(geometry, material)
    mesh.rotation.x += 0.50;
    mesh.rotation.z += 0.50;
    mesh.position.set(x, y, z)

    obj.add(mesh)
}
function createRobot(x, y, z) {
    'use strict'

    var robot = new THREE.Object3D()
    addBase(robot, x, y + 2, z)
    addWheel(robot, x + 17, y, z + 17)
    addWheel(robot, x - 17, y, z + 17)
    addWheel(robot, x + 17, y, z - 17)
    addWheel(robot, x - 17, y, z - 17)
    addArm_base(robot, x , y + 2, z)
    addHalfArmDown(robot, x , y + 4, z)
    addSphereArm(robot, x , y + 11, z)

    material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })

    scene.add(robot)
    robot.position.x = x
    robot.position.y = y
    robot.position.z = z

    return robot
}

function createTarget(x, y, z) {
    'use strict'

    var target = new THREE.Object3D()
    addTorus(target, x, y + 30, z)

    material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
    addBaseTarget(target, x, y, z)

    scene.add(target)
    target.position.x = x
    target.position.y = y
    target.position.z = z

    return target
}

function createCamera() {
    'use strict'

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000)

    camera.position.x = 0
    camera.position.y = CAMERA_MAIN
    camera.position.z = 0
    camera.lookAt(scene.position)
}

function createScene() {
    'use strict'

    scene = new THREE.Scene()
    scene.add(new THREE.AxesHelper(10))

    robot = createRobot(0, 0, 0)
    target = createTarget(30, 0, 0)
}

function onResize() {
    'use strict'

    renderer.setSize(window.innerWidth, window.innerHeight)

    if (window.innerHeight > 0 && window.innerWidth > 0) {
        camera.aspect = renderer.getSize().width / renderer.getSize().height
        camera.updateProjectionMatrix()
    }
}

function onKeyDown(e){
    'use strict'

    switch (e.keyCode) {
    case 65: //A
    case 97: //a
        break
    
    case 37: //arrow_left
        movementVector[2] = - 1
        break
    case 38: //arrow_up
        movementVector[0] = 1
        break
    case 39: //arrow_right
        movementVector[2] = 1
        break
    case 40: //arrow_down
        movementVector[0] = - 1
        break
    
    case 49: // 1
        camera.position.x = 0
        camera.position.y = CAMERA_MAIN
        camera.position.z = 0
        camera.lookAt(scene.position)
        break
    case 50: // 2
        camera.position.x = 0
        camera.position.y = 20
        camera.position.z = CAMERA_MAIN
        camera.lookAt(scene.position)
        break
    case 51: // 3
        camera.position.x = CAMERA_MAIN
        camera.position.y = 20
        camera.position.z = 0
        camera.lookAt(scene.position)
        break
    case 52: // 4
        scene.traverse(function (node) {
            if (node instanceof THREE.Mesh) {
                node.material.wireframe = !node.material.wireframe
            }
        })
        break
    }
}

function onKeyUp(e){
    'use strict'

    switch (e.keyCode) {
    case 37: //arrow_left
        movementVector[2] = 0
        break
    case 38: //arrow_up
        movementVector[0] = 0
        break
    case 39: //arrow_right
        movementVector[2] = 0
        break
    case 40: //arrow_down
        movementVector[0] = 0
        break
    }
}

function animate() {
    'use strict'

    robot.position.x += 0.1 * movementVector[0]
    robot.position.y += 0.1 * movementVector[1]
    robot.position.z += 0.1 * movementVector[2]

    render()
    requestAnimationFrame(animate)
}

function init() {
    'use strict'

    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    createScene()
    createCamera()

    render()

    window.addEventListener("resize", onResize)
    window.addEventListener("keydown", onKeyDown)
    window.addEventListener("keyup", onKeyUp)
}