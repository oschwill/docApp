export const extractAndRemoveKeys = (originalObject, keysToExtract) => {
  const extractedValues = {};

  keysToExtract.forEach((key) => {
    if (originalObject.hasOwnProperty(key)) {
      extractedValues[key] = originalObject[key];
      delete originalObject[key];
    }
  });

  return extractedValues;
};

export const flattenObject = (obj, parentKey = '') => {
  const flattenedObject = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const currentKey = parentKey ? `${parentKey}.${key}` : key;

      if (Array.isArray(obj[key])) {
        flattenedObject[currentKey] = obj[key];
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        Object.assign(flattenedObject, flattenObject(obj[key], currentKey));
      } else {
        flattenedObject[currentKey] = obj[key];
      }
    }
  }

  return flattenedObject;
};

export const flattenKeys = (obj, separator = '.') => {
  const result = {};

  function recurse(current, parentKey = '') {
    for (const key in current) {
      const newKey = parentKey ? `${parentKey}${separator}${key}` : key;

      if (
        typeof current[key] === 'object' &&
        current[key] !== null &&
        !Array.isArray(current[key])
      ) {
        recurse(current[key], newKey);
      } else {
        const parts = newKey.split(separator);
        const flattenedKey = parts[parts.length - 1];
        result[flattenedKey] = current[key];
      }
    }
  }

  recurse(obj);
  return result;
};

export const updateUserProfile = async (userData, userTypeData, userModel, typeModel) => {
  userTypeData.expertise = userTypeData.expertise.map((area) => ({ area }));

  if (userTypeData) {
    // Hole type Data ID
    const typeID = await userModel
      .findOne({ email: userData.email }, { role: 1, _id: 0 })
      .select('-fullName');

    // const userUpdateQuery = await typeModel.updateOne({ _id: typeID.role }, { $set: userTypeData });
    const userTypeUpdate = await typeModel.findOneAndUpdate(
      { _id: typeID.role },
      { ...userTypeData }
    );

    console.log(userTypeUpdate);
    if (!userTypeUpdate) {
      return false;
    }
  }

  return true;
};
