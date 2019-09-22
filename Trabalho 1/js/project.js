/* var THREE */
var camera, scene, renderer
var geometry, material, mesh

const CAMERA_X = 50
const CAMERA_Y = 10
const CAMERA_Z = 0

/* Object Sizes - Just for now */
const BASE_LENGTH = 20
const BASE_HEIGTH = 4

function render() {
    'use strict'
    renderer.render(scene, camera)
}

function addBase(obj, x, y, z) {
    'use strict'

    geometry = new THREE.CubeGeometry(BASE_LENGTH, BASE_HEIGTH, BASE_LENGTH)
    material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })

    mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(x, y, z)

    obj.add(mesh)
}

function createRobot(x, y, z) {
    'use strict'

    var robot = new THREE.Object3D()
    addBase(robot, 0, 0, 0)

    material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })

    scene.add(robot)
    robot.position.x = x
    robot.position.y = y
    robot.position.z = z
}

function createCamera() {
    'use strict'

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000)

    camera.position.x = CAMERA_X
    camera.position.y = CAMERA_Y
    camera.position.z = CAMERA_Z
    camera.lookAt(scene.position)
}

function createScene() {
    'use strict'

    scene = new THREE.Scene()
    scene.add(new THREE.AxesHelper(10))

    createRobot(0, 0, 0)
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
    }
}

function init() {
    'use strict'

    renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    createScene()
    createCamera()

    render()

    window.addEventListener("resize", onResize)
    window.addEventListener("keydown", onKeyDown)
}