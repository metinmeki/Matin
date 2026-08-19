const imageMap = {
  "firedetection.jpeg": require("../images/firedetection.jpeg"),
  "Diabetes.jpg": require("../images/Diabetes.jpg"),
  "titanic.jpeg": require("../images/titanic.jpeg"),
  "thermalHumanDetection.jpg": require("../images/thermalHumanDetection.jpg"),
  "healythplant.png": require("../images/healythplant.png"),
  "e-commerce.png": require("../images/e-commerce.png"),
  "eye tracking.jpg": require("../images/eye tracking.jpg"),
  "handwrite digit.jpeg": require("../images/handwrite digit.jpeg"),
  "braintumor.jpg": require("../images/braintumor.jpg"),
  "spineclassification.png": require("../images/spineclassification.png"),
  "handdigi.png": require("../images/handdigi.png"),
  "aiparking.jpg": require("../images/aiparking.jpg"),
  "drowing.jpg": require("../images/drowing.jpg"),
  "python.jpg": require("../images/python.jpg"),
  "EnglishforIT1.jpg": require("../images/EnglishforIT1.jpg"),
  "IntrotoDataScienceUpdate.jpg": require("../images/IntrotoDataScienceUpdate.jpg"),
  "IntrotoModernAI.jpg": require("../images/IntrotoModernAI.jpg"),
  "machine learning explainability kaggle.jpg": require("../images/machine learning explainability kaggle.jpg"),
  "intro to programming kaggle.jpg": require("../images/intro to programming kaggle.jpg"),
  "intro to machine learning kaggle.jpg": require("../images/intro to machine learning kaggle.jpg"),
  "game development with js.jpg": require("../images/game development with js.jpg"),
  "hplifee.jpg": require("../images/hplifee.jpg"),
  "teachforeveryone.png": require("../images/teachforeveryone.png"),
  "nawroz uni cer.jpg": require("../images/nawroz uni cer.jpg"),
};

export function resolveImage(imagePath) {
  if (!imagePath) return "";
  if (imageMap[imagePath]) return imageMap[imagePath];
  if (/^https?:\/\//.test(imagePath)) return imagePath;
  if (imagePath.startsWith("uploads/")) return `/${imagePath}`;
  return `${process.env.PUBLIC_URL}/images/${imagePath}`;
}

export default imageMap;
