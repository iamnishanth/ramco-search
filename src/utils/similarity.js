const compareTwoStrings = (userEnteredString, targetString) => {
  userEnteredString = userEnteredString.toLowerCase().replace(/\s+/g, "");
  targetString = targetString.toLowerCase().replace(/\s+/g, "");

  if (userEnteredString === targetString) return 1; // identical or empty
  if (userEnteredString.length < 2 || targetString.length < 2) return 0; // if either is a 0-letter or 1-letter string

  // check userEnteredString
  let firstBigrams = new Map();
  for (let i = 0; i < userEnteredString.length - 1; i++) {
    const bigram = userEnteredString.substring(i, i + 2);
    const count = firstBigrams.has(bigram) ? firstBigrams.get(bigram) + 1 : 1;
    firstBigrams.set(bigram, count);
  }

  // compare with targetString
  let intersectionSize = 0;
  for (let i = 0; i < targetString.length - 1; i++) {
    const bigram = targetString.substring(i, i + 2);
    const count = firstBigrams.has(bigram) ? firstBigrams.get(bigram) : 0;

    if (count > 0) {
      firstBigrams.set(bigram, count - 1);
      intersectionSize++;
    }
  }

  return (
    (2.0 * intersectionSize) /
    (userEnteredString.length + targetString.length - 2)
  );
};

export const findBestMatch = (userString, targetArray) => {
  let ratings = [];

  for (let i = 0; i < targetArray.length; i++) {
    const currentTargetString = targetArray[i].name;
    const currentRating = compareTwoStrings(userString, currentTargetString);
    ratings.push({
      id: targetArray[i]._id,
      name: currentTargetString,
      rating: currentRating,
    });
  }

  ratings = ratings.sort((a, b) => b.rating - a.rating);

  return ratings;
};
