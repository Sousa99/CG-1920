var geometry, material, mesh

class Room extends THREE.Object3D {
    constructor(x, y, z) {
        super()

        var rightWall = this.addWall(0, 25, - 37)
        var leftWall = this.addWall(- 37, 25, 0)
        var floor = this.addFloor(0, 0, 0)

        leftWall.rotateY(Math.PI / 2)

        this.add(rightWall)
        this.add(leftWall)
        this.add(floor)

        this.position.set(x, y, z)
    }

	addWall(x, y, z) {
		'use strict'
    
        geometry = new THREE.BoxGeometry(75, 50, 0.5)
        material = new THREE.MeshBasicMaterial({ color: 0x009999, wireframe: true })
        mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(x, y, z)
    
        return mesh
    } 

    addFloor(x, y, z) {
        'use strict'

        geometry = new THREE.BoxGeometry(75, 0.5 , 75)
        material = new THREE.MeshBasicMaterial({ color: 0xccffff, wireframe: true })
        mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(x, y - 0.5, z)
    
        return mesh
    }
}