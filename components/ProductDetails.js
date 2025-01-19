const ProductDetails = ({ product }) => {
    return (
        <div className="details-section">
            {/* {JSON.stringify(product?.extra_fields)} */}
            <div className="md:w-full flex flex-col mt-10">
                {product?.extra_fields.find(field => field.meta_name === "price")?.meta_value && (
                    <div className="flex">
                        <h5 className="w-48 text-gray-500 py-2">Price</h5>
                        <p className="w-full py-2">BDT. {product?.extra_fields.find(field => field.meta_name === "price")?.meta_value}</p>
                    </div>
                )}
                {product?.extra_fields.find(field => field.meta_name === "usages_model")?.meta_value && (
                    <div className="flex">
                        <h5 className="w-48 text-gray-500 py-2">Model</h5>
                        <p className="w-full py-2">{product?.extra_fields.find(field => field.meta_name === "usages_model")?.meta_value}</p>
                    </div>
                )}
                {product?.extra_fields.find(field => field.meta_name === "model")?.meta_value && (
                    <div className="flex">
                        <h5 className="w-48 text-gray-500 py-2">Model</h5>
                        <p className="w-full py-2">{product?.extra_fields.find(field => field.meta_name === "model")?.meta_value}</p>
                    </div>
                )}
                {product?.extra_fields.find(field => field.meta_name === "battery_type")?.meta_value && (
                    <div className="flex">
                        <h5 className="w-48 text-gray-500 py-2">Battery Type</h5>
                        <p className="w-full py-2">{product?.extra_fields.find(field => field.meta_name === "battery_type")?.meta_value}</p>
                    </div>
                )}
                {product?.extra_fields.find(field => field.meta_name === "length")?.meta_value && (
                    <div className="flex">
                        <h5 className="w-48 text-gray-500 py-2">Length</h5>
                        <p className="w-full py-2">{product?.extra_fields.find(field => field.meta_name === "length")?.meta_value}</p>
                    </div>
                )}
                {product?.extra_fields.find(field => field.meta_name === "capacity")?.meta_value && (
                    <div className="flex">
                        <h5 className="w-48 text-gray-500 py-2">Capacity</h5>
                        <p className="w-full py-2">{product?.extra_fields.find(field => field.meta_name === "capacity")?.meta_value}</p>
                    </div>
                )}
                {product?.extra_fields.find(field => field.meta_name === "condition")?.meta_value && (
                    <div className="flex">
                        <h5 className="w-48 text-gray-500 py-2">Condition</h5>
                        <p className="w-full py-2">{product?.extra_fields.find(field => field.meta_name === "condition")?.meta_value}</p>
                    </div>
                )}
                {product?.extra_fields.find(field => field.meta_name === "warranty")?.meta_value && (
                    <div className="flex">
                        <h5 className="w-48 text-gray-500 py-2">Warranty</h5>
                        <p className="w-full py-2">{product?.extra_fields.find(field => field.meta_name === "warranty")?.meta_value}</p>
                    </div>
                )}
                {product?.extra_fields.find(field => field.meta_name === "purchase_notes")?.meta_value && (
                    <div className="flex">
                        <h5 className="w-48 text-gray-500 py-2">Purchase Notes</h5>
                        <p className="w-full py-2">{product?.extra_fields.find(field => field.meta_name === "purchase_notes")?.meta_value}</p>
                    </div>
                )}

            </div>
        </div>
    );
};

export default ProductDetails;
