// Vite finds any images that you add inside src/assets/exercise-cards/.
// This lets the site still run even before the images are added.
const exerciseImages = import.meta.glob("../assets/exercise-cards/*.{jpeg,jpg,png,webp}", {
  eager: true,
  import: "default"
});

export function getExerciseImage(imageName) {
  if (!imageName) {
    return null;
  }

  let cleanName = imageName
    .replace(".jpeg", "")
    .replace(".jpg", "")
    .replace(".png", "")
    .replace(".webp", "");

  let extensions = ["jpeg", "jpg", "png", "webp"];

  for (let i = 0; i < extensions.length; i++) {
    let filePath = "../assets/exercise-cards/" + cleanName + "." + extensions[i];

    if (exerciseImages[filePath]) {
      return exerciseImages[filePath];
    }
  }

  return null;
}
