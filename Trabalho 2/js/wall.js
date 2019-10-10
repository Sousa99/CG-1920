var geometry, material, mesh

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