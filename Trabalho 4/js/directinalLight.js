var geometry, material, mesh

class CustomDirectionalLight extends THREE.DirectionalLight {
    constructor(x , y, z, color, intensity, lookAtObject) {
        super(color, intensity)

        this.active = true
        this.changeActiveState = false
        
        this.target = lookAtObject
        this.castShadow = true

        this.position.set(x, y, z)
        this.target = lookAtObject
    }

    updateLight(paused) {
        'use strict'

        if (!this.changeActiveState || paused) {
            this.changeActiveState = false
            return
        }
        
        if (this.active)
            this.visible = false
        else
            this.visible = true
            
        this.active = !this.active
        this.changeActiveState = false
    }
}