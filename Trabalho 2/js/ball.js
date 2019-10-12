var geometry, material, mesh

class Ball extends THREE.Object3D {
    constructor(x, y, z, horizontalAngle = 0, verticalAngle = 0) {
        super()

        this.globalPosition = new THREE.Vector3(x, y, z)
        this.velocity = new THREE.Vector3(0, 0, 0)
        this.verticalAngle = verticalAngle
        this.horizontalAngle = horizontalAngle
        
        this.falling = false
        var axesHelper = new THREE.AxesHelper( 5 );
        axesHelper.position.set(0, 2, 0)
        this.add(axesHelper)

        geometry = new THREE.SphereGeometry(RADIUS_BALL, 10, 10)
        material = new THREE.MeshBasicMaterial({ color: 0x99ff99, wireframe: true })
        mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(0, 2, 0)
        this.add(mesh)

        this.position.set(x, y, z)
    }

    move() {
        'use strict'
        this.gravity()
        this.translateOnAxis(this.velocity, 1)
    }

    gravity() {
        'use strict'
        if (this.falling)
            this.velocity.y += - 9.8 * PROPORTION / FRAMERATE
    }
}
