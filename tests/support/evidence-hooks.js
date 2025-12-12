const { Before, After } = require("@cucumber/cucumber");
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

Before(async function (scenario) {
  const scenarioName = scenario.pickle.name.replace(/[^a-zA-Z0-9]/g, "_");
  const timestamp = Date.now();

  this.evidenceName = `${scenarioName}_${timestamp}`;

  const videoPath = path.resolve(`evidences/videos/${this.evidenceName}.mp4`);
  const isWindows = process.platform === "win32";

  let ffmpegArgs;

  if (isWindows) {
    // WINDOWS - gdigrab
    ffmpegArgs = [
      "-y",
      "-f", "gdigrab",
      "-framerate", "30",
      "-offset_x", "0",
      "-offset_y", "0",
      "-video_size", "1920x1080",
      "-i", "desktop",
      "-pix_fmt", "yuv420p",
      videoPath,
    ];
  } else {
    // LINUX - x11grab
    ffmpegArgs = [
      "-y",
      "-video_size", "1920x1080",
      "-framerate", "30",
      "-f", "x11grab",
      "-i", process.env.DISPLAY || ":99",
      "-pix_fmt", "yuv420p",
      videoPath,
    ];
  }

  this.ffmpeg = spawn("ffmpeg", ffmpegArgs);

  this.ffmpeg.stderr.on("data", () => {}); // evita travas
});


After(async function () {
  if (this.driver) {
    const screenshotPath = path.resolve(
      `evidences/screenshots/${this.evidenceName}.png`
    );

    const image = await this.driver.takeScreenshot();
    fs.writeFileSync(screenshotPath, image, "base64");
  }

  // fechar ffmpeg normalmente
  if (this.ffmpeg) {
    try {
      this.ffmpeg.stdin.write("q");
      this.ffmpeg.stdin.end();
    } catch (err) {}

    await new Promise((resolve) => {
      this.ffmpeg.on("close", resolve);
    });
  }
});