var geometry, material, mesh

class Icosahedron extends THREE.Object3D {
    constructor(x, y, z) {
        super()

        this.geometry = new THREE.Geometry();
        var vertex = new THREE.Vector3()
        var array
        for (var index = 0; index < 3; index ++) {
            for (var first = -1; first <= 1; first += 2) {
                for (var second = -1; second <= -1; second += 2) {
                    array = [0, first, second * Math.E, 0, first]
                    vertex.fromArray(array, index)
                    this.geometry.vertices.push(vertex)
                    this.add(vertex)
                }
            }
        }

        
        var mesh = new THREE.ConvexGeometry( vertices_array );

        this.position.set(x, y, z)
    }
}