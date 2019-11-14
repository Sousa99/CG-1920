var geometry, material, mesh
const DICE_SIZE = 15
const DICE_SPEED = 0.025

class Dice extends THREE.Object3D {
    constructor(x, y, z) {
        super()

        this.moving = true

        this.axis = new THREE.AxesHelper(3 * DICE_SIZE)
        this.add(this.axis)

        material = new THREE.MeshPhongMaterial({ color: 0xFFFFFF, 
            wireframe: false })

        geometry = new THREE.BoxGeometry(DICE_SIZE, DICE_SIZE, DICE_SIZE)
        mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(0, 0, 0)
        mesh.rotateX(Math.PI / 4)
        mesh.rotateZ(Math.PI / 4)

        mesh.castShadow = true
        mesh.receiveShadow = true
        
        this.add(mesh)
        this.position.set(x, y + (Math.sqrt(3) * DICE_SIZE) / 2, z)
    }

    move() {
        if (!this.moving)
            return

        this.rotateY(DICE_SPEED)
    }
}