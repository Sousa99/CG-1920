var geometry, material, mesh

class Icosahedron extends THREE.Object3D {
    constructor(x, y, z, scalar) {
        super()

        geometry = new THREE.Geometry()
        
        material = {
            color: 0xffffff,
            wireframe: false,
            transparent: true,
            opacity: 0.2
        }

        geometry.vertices.push(
            new THREE.Vector3(-scalar * Math.E, 0, scalar),
            new THREE.Vector3(0, scalar, scalar * Math.E),
            new THREE.Vector3(-scalar, (scalar + 1) * Math.E, 0),
            new THREE.Vector3(scalar, (scalar + 0.5) * Math.E, 0),
            new THREE.Vector3(0, scalar, -scalar * Math.E),
            new THREE.Vector3(-scalar * Math.E, 0, -scalar),
            new THREE.Vector3(scalar * Math.E, 0, scalar),
            new THREE.Vector3(0, -scalar, scalar * Math.E),
            new THREE.Vector3(-scalar, -scalar * Math.E, 0),
            new THREE.Vector3(0, -scalar, -scalar * Math.E),
            new THREE.Vector3(scalar * Math.E, 0, -scalar),
            new THREE.Vector3(scalar, -scalar * Math.E, 0)
        )

        geometry.faces.push(new THREE.Face3(0, 1, 2))
        geometry.faces.push(new THREE.Face3(1, 3, 2))
        geometry.faces.push(new THREE.Face3(3, 4, 2))
        geometry.faces.push(new THREE.Face3(4, 5, 2))
        geometry.faces.push(new THREE.Face3(5, 0, 2))
        geometry.faces.push(new THREE.Face3(1, 6, 3))
        geometry.faces.push(new THREE.Face3(0, 7, 1))
        geometry.faces.push(new THREE.Face3(5, 8, 0))
        geometry.faces.push(new THREE.Face3(4, 9, 5))
        geometry.faces.push(new THREE.Face3(3, 10, 4))
        geometry.faces.push(new THREE.Face3(6, 7, 11))
        geometry.faces.push(new THREE.Face3(7, 8, 11))
        geometry.faces.push(new THREE.Face3(8, 9, 11))
        geometry.faces.push(new THREE.Face3(9, 10, 11))
        geometry.faces.push(new THREE.Face3(10, 6, 11))
        geometry.faces.push(new THREE.Face3(6, 1, 7))
        geometry.faces.push(new THREE.Face3(7, 0, 8))
        geometry.faces.push(new THREE.Face3(8, 5, 9))
        geometry.faces.push(new THREE.Face3(9, 4, 10))
        geometry.faces.push(new THREE.Face3(10, 3, 6))

        mesh = new CustomMesh(geometry, material)
        mesh.position.set(0, 0, 0)
        geometry.computeFaceNormals()
        geometry.computeVertexNormals()
        this.add(mesh)

        var edges = new THREE.EdgesGeometry(geometry)
        var line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({color: 0xffcc00}))
        this.add(line)
        
        this.position.set(x, y, z)
    }
}