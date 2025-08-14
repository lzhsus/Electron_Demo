class Counter {
    constructor() {
        this.v = 0;
        this.va = 0;
        this.multiplier = 1;
        this.updateInterval = 20; // Start with 20ms (50fps)
        this.lastUpdate = 0;
        this.accumulatedTime = 0;
        this.lastValue = 0;
        this.lastVa = 0;
        
        // Performance optimizations
        this.minUpdateInterval = 10;
        this.maxUpdateInterval = 100;
        this.adaptiveThreshold = 1000; // Threshold for adaptive behavior
        this.stableFrameCount = 0;
        this.targetStableFrames = 30; // Frames to wait before adjusting
        
        // Pre-bind update method
        this.boundUpdateLoop = this.updateLoop.bind(this);

        // Use requestAnimationFrame for better performance
        this.boundUpdateLoop();
    }

    setUpdateInterval(interval) {
        this.updateInterval = interval;
    }

    updateLoop() {
        const now = performance.now();
        const deltaTime = now - this.lastUpdate;
        
        if (deltaTime >= this.updateInterval) {
            this.update(deltaTime);
            this.lastUpdate = now;
        }
        
        requestAnimationFrame(this.boundUpdateLoop);
    }

    evaluateItems() {
        this.va = 0;
        this.multiplier = 1;
        for (let i in ITEMS) {
            let it = ITEMS[i];
            if (it.multiplier != undefined)
                this.multiplier *= it.lvl > 0 ? Math.pow(it.multiplier, it.lvl) : 1;
            else
                this.va += total_item_value(it);
        }
    }

    update(deltaTime = 20) {
        // Convert deltaTime to seconds and scale appropriately
        const timeScale = deltaTime / 1000;
        this.v += this.va * timeScale;
        
        // Improved adaptive update interval based on value changes
        const valueChange = Math.abs(this.v - this.lastValue);
        const vaChange = Math.abs(this.va - this.lastVa);
        
        // Determine if values are stable
        const isStable = valueChange < this.adaptiveThreshold && vaChange < 10;
        
        if (isStable) {
            this.stableFrameCount++;
        } else {
            this.stableFrameCount = 0;
        }
        
        // Only adjust interval after stable period to avoid oscillation
        if (this.stableFrameCount >= this.targetStableFrames) {
            if (valueChange > this.adaptiveThreshold || vaChange > 100) {
                // Values changing rapidly, update more frequently
                this.updateInterval = Math.max(this.minUpdateInterval, this.updateInterval * 0.9);
            } else if (valueChange < 100 && vaChange < 5) {
                // Values very stable, update less frequently
                this.updateInterval = Math.min(this.maxUpdateInterval, this.updateInterval * 1.05);
            }
            this.stableFrameCount = 0; // Reset counter after adjustment
        }
        
        this.lastValue = this.v;
        this.lastVa = this.va;
    }

    setValue(v) {
        this.v = v;
        this.lastValue = v;
    }

    spend(v) {
        this.v -= v;
        this.lastValue = this.v;
    }

    add(v) {
        let val = v * this.multiplier;
        this.v += val;
        this.lastValue = this.v;
        return val;
    }

    addOne() {
        this.v += this.multiplier;
        this.lastValue = this.v;
        return this.multiplier;
    }

    // Get current update interval for debugging
    getUpdateInterval() {
        return this.updateInterval;
    }
}