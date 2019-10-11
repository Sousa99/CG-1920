var geometry, material, mesh

class Ball extends THREE.Object3D {
    constructor(x, y, z) {
        super()

        this.globalPosition = new THREE.Vector3(x, y, z)
        this.velocity = new THREE.Vector3(0, 0, 0)
        this.angle = 0

        geometry = new THREE.SphereGeometry(RADIUS_BALL, 10, 10)
        material = new THREE.MeshBasicMaterial({ color: 0x99ff99, wireframe: true })
        mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(x, y + 2, z)

        this.add(mesh)
    }

    move() {
        'use strict'
        this.translateOnAxis(this.velocity, 1)
    }
}
