/* var THREE */
var cameras = []
var camera, scene, renderer
var geometry, material, mesh

var gun,wall

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


        this.wall = new THREE.Object3D()
        this.wall.add(this.addWall(x - 5, y, z - 5))
        this.wall.add(this.addWall(x, y, z))
        this.wall.add(this.addWall(x + 5, y, z + 5))
        this.wall.position.set(x + 25.75, y, z)
    

        this.position.set(x, y, z)
    }

	addWall(x, y, z) {
		'use strict'
    
        geometry = new THREE.BoxGeometry(10, 20 ,3)
        material = new THREE.MeshBasicMaterial({ color: 0x4da6ff, wireframe: true })
        mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(x, y, z)
    
        return mesh
	}   
}

class Gun extends THREE.Object3D {
    constructor(x , y, z) {
        super()

        this.gun.add(this.addGun(x, y, z))

        this.gun.position.set(x, y, z)
    }

    addGun(x, y, z) {
        'use strict'
    
        geometry = new THREE.CylinderGeometry(2, 2, 5)
        material = new THREE.MeshBasicMaterial({ color: 0x4da6ff, wireframe: true })
        mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(x, y + 25 / 2, z)
    
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
function createScene() {
    'use strict'

    scene = new THREE.Scene()
    scene.add(new THREE.AxesHelper(10))

    wall = new Wall(0, 0, 0)
    gun = new Gun(30, 0, 0)
    scene.add(wall)
    scene.add(gun)
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