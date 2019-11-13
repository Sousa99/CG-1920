var geometry, material, mesh

class CustomDirectionalLight extends THREE.DirectionalLight {
    constructor(x , y, z, color, intensity, lookAtObject) {
        super(color, intensity)

        var lookAtPostion = lookAtObject.position
        this.active = true
        this.changeActiveState = false
        
        this.target = lookAtObject
        this.castShadow = true

        this.position.set(x, y, z)
        this.lookAt(lookAtPostion)
    }

    updateLight() {
        'use strict'

        if (!this.changeActiveState)
            return
        
        if (this.active)
            this.visible = false
        else
            this.visible = true
            
        this.active = !this.active
        this.changeActiveState = false
    }
}