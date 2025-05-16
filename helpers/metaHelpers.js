// metaHelpers.js

export const getMetaValueByMetaName = (jsonData, metaName) => {
  // console.log(jsonData?.data);
  const foundItem = jsonData?.data?.find((item) => item.meta_name === metaName);
  return foundItem ? foundItem.meta_value : null;
};

export const getMediaLinkByMetaName = (jsonData, metaName) => {
  if (!jsonData?.data || !metaName) return null;

  const item = jsonData.data.find(
    (dataItem) => dataItem.meta_name === metaName
  );

  if (item?.file_directory && item?.filename) {
    return item.file_directory + item.filename;
  }

  return null;
};


export const getMetaValueFromExtra_Fields = (jsonData, metaName) => {
  // console.log("from metaFrom extra:",jsonData, metaName);
  const foundItem = jsonData?.extra_fields?.find((item) => item?.meta_name === metaName);
  return foundItem ? foundItem.meta_value : null;
};

export const getMetaValueFromExtraFields = (jsonData, metaName) => {
  // console.log("from metaFrom extra:",jsonData, metaName);
  const foundItem = jsonData?.extraFields?.find((item) => item?.meta_name === metaName);
  return foundItem ? foundItem.meta_value : null;
};


export const getSingleImageFromExtraFields = (jsonData, metaName) => {
  // console.log("from metaFrom extra:",jsonData, metaName);
  const foundItem = jsonData?.extra_fields?.find((item) => item?.meta_name === metaName);
  return foundItem ? foundItem.single_image_url : null;
};

