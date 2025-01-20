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
