// validationUtils.js
export const validateTitle = (title) => {
  return /^[^\s]+(\s+[^\s]+)*$/.test(title);
};

export const validateDescription = (description) => {
  return /^[^\s]+(\s+[^\s]+)*$/.test(description);
};

export const validateCoverImage = (coverImage) => {
  const imageRegex = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;
  return /^https?:\/\/\S+$/.test(coverImage) && imageRegex.test(coverImage);
};

export const validateAudio = (audio) => {
  const audioRegex = /\.(mp3|wav|ogg)$/i;
  return audioRegex.test(audio);
};
