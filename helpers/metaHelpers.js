// metaHelpers.js

export const getMetaValueByMetaName = (jsonData, metaName) => {
  // console.log(jsonData?.data);
  const foundItem = jsonData?.data?.find(item => item.meta_name === metaName);
  return foundItem ? foundItem.meta_value : null;
};
