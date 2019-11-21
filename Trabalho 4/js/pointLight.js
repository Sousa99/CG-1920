var geometry, material, mesh

class CustomPointLight extends THREE.PointLight {
    constructor(x , y, z, color, intensity) {
        super(color, intensity)

        this.active = true
        this.changeActiveState = false
        
        this.castShadow = true

        this.position.set(x, y, z)
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