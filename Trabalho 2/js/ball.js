var geometry, material, mesh

class Ball extends THREE.Object3D {
    constructor(x, y, z) {
        super()

        this.velocity = new THREE.Vector3(0, 0, 0)
        geometry = new THREE.SphereGeometry(2, 10, 10)
        material = new THREE.MeshBasicMaterial({ color: 0x99ff99, wireframe: true })
        mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(x, y + 2, z)

        this.add(mesh)
    }
}
