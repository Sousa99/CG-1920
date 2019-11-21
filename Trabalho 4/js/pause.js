var geometry, material, mesh, texture

class PauseText extends THREE.Object3D {
    constructor(x, y, z) {
        super()
        this.constant = true
        
        texture = new THREE.TextureLoader().load('./assets/pause_screen.png')
        material = new THREE.MeshBasicMaterial({ color: 0xffffff, map: texture, transparent: true, opacity: 50, wireframe: false })

        geometry = new THREE.BoxGeometry(50, 1, 15)
        mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(0, 0, 0)
        mesh.castShadow = false
        mesh.receiveShadow = true

        mesh.layers.set(1)

        this.add(mesh)
        this.position.set(x, y, z)

    }
}