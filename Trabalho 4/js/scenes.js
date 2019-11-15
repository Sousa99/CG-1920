var texture

class MainScene extends THREE.Scene {
    constructor() {
        super()

        this.changeStateWireframe = false
        this.changeLightCalc = false
        
        this.table = new Table(0, 0, 0)
        this.add(this.table)

        this.dice = new Dice(0, 0, 0)
        this.add(this.dice)

        this.ball = new Ball()
        this.add(this.ball)

        this.directionalLight = new CustomDirectionalLight(1, 1, 1, 0xffffff, 0.30, this)
        this.add(this.directionalLight)

        this.pointLight = new CustomPointLight(- 50, 25, -50, 0x00ffff, 0.60)
        this.add(this.pointLight)
    }

    animate() {
        this.ball.move()
        this.dice.move()

        this.directionalLight.updateLight()
        this.pointLight.updateLight()

        this.toggleWireframe()
        this.toggleLightCalc()
    }

    onKeyDown(e) {
        switch (e.keyCode) {
            case 66: //b
                this.ball.changeState = true
                break
            case 76: //l
                this.changeLightCalc = true
                break
            case 83: //s
                activeScene = (activeScene + 1) % scenes.length
                break
            case 68: //d
                this.directionalLight.changeActiveState = true
                break
            case 80: //p
                this.pointLight.changeActiveState = true
                break
            case 87: //w
                this.changeStateWireframe = true
                break
        }
    }

    toggleWireframe() {
        'use strict'

        if (!this.changeStateWireframe)
            return

        var toChange = new Array()
        toChange = toChange.concat(this)

        while (toChange.length > 0) {
            var current = toChange.shift()

            if (current.type == "Object3D" || current.type == "Scene")
                toChange = toChange.concat(current.children)
            else if (current.type == "Mesh")
                if (Array.isArray(current.material)) {
                    for (var i = 0; i < current.material.length; i++)
                    current.material[i].wireframe = !current.material[i].wireframe
                } else current.material.wireframe = !current.material.wireframe
        }

        this.changeStateWireframe = false
    }

    toggleLightCalc() {
        'use strict'

        if (!this.changeLightCalc)
            return

        var toChange = new Array()
        toChange = toChange.concat(this)

        while (toChange.length > 0) {
            var current = toChange.shift()

            if (current.type == "Object3D" || current.type == "Scene")
                toChange = toChange.concat(current.children)
            else if (current.type == "Mesh")
                current.changeLightCalc()
        }

        this.changeLightCalc = false
    }
}

class PauseScene extends THREE.Scene {
    constructor() {
        super()

        texture = new THREE.TextureLoader().load('./assets/pause_screen.jpg')
        this.background = texture
    }

    animate() {

    }

    onKeyDown(e) {
        switch (e.keyCode) {
            case 82: //r
                scenes[0] = new MainScene()
            case 83: //s
                activeScene = (activeScene + 1) % scenes.length
                break
        }
    }
}