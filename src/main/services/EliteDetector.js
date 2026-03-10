const { exec } = require("child_process");
const { EventEmitter } = require("events");

class EliteDetector extends EventEmitter {
  constructor(intervalMs = 5000) {
    super();
    this._intervalMs = intervalMs;
    this._interval = null;
    this._isRunning = false;
    this._lastState = null;
  }

  get isRunning() {
    return this._isRunning;
  }

  start() {
    this._check();
    this._interval = setInterval(() => this._check(), this._intervalMs);
    console.log("[EliteDetector] Started — checking every", this._intervalMs / 1000, "seconds");
  }

  stop() {
    if (this._interval) {
      clearInterval(this._interval);
      this._interval = null;
    }
    console.log("[EliteDetector] Stopped");
  }

  _check() {
    exec("tasklist /FI \"IMAGENAME eq EliteDangerous64.exe\" /NH /FO CSV", (err, stdout) => {
      if (err) {
        console.error("[EliteDetector] tasklist error:", err.message);
        return;
      }

      const running = stdout.toLowerCase().includes("elitedangerous64.exe");

      if (running !== this._lastState) {
        this._isRunning = running;
        this._lastState = running;

        if (running) {
          console.log("[EliteDetector] Elite Dangerous detected — RUNNING");
          this.emit("elite:running");
        } else {
          console.log("[EliteDetector] Elite Dangerous not detected — STOPPED");
          this.emit("elite:stopped");
        }
      }
    });
  }

  destroy() {
    this.stop();
    this.removeAllListeners();
  }
}

module.exports = EliteDetector;