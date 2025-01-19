import Image from 'next/image';
import { useState } from 'react';
import { SlSizeFullscreen } from 'react-icons/sl';
import { IoIosClose } from 'react-icons/io';

const ProductImage = ({ product }) => {
    const [productImage, setProductImage] = useState(product?.featured_image);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const openFullScreen = () => setIsFullScreen(true);
    const closeFullScreen = () => setIsFullScreen(false);

    const handleNextImage = () => {
        if (currentImageIndex < product.extra_fields[0]?.meta_value.length - 1) {
            setCurrentImageIndex((prevIndex) => prevIndex + 1);
            setProductImage(product.extra_fields[0]?.meta_value[currentImageIndex + 1]);
        }
    };

    const handlePrevImage = () => {
        if (currentImageIndex > 0) {
            setCurrentImageIndex((prevIndex) => prevIndex - 1);
            setProductImage(product.extra_fields[0]?.meta_value[currentImageIndex - 1]);
        }
    };

    return (
        <>
            <div className="relative">
                <Image
                    src={productImage || product?.featured_image}
                    width={800}
                    height={800}
                    alt={product?.name || 'Product Image'}
                    className="w-full object-cover mx-auto"
                    layout="responsive"
                    priority={false}
                />
                <span
                    onClick={openFullScreen}
                    className="absolute right-3 bottom-3 text-xl border border-gray-300 p-1 cursor-pointer rounded-md text-white bg-gray-600"
                >
                    <SlSizeFullscreen />
                </span>
            </div>

            {/* Fullscreen view */}
            {isFullScreen && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4">
                    <div className="relative max-w-full max-h-full bg-white p-5">
                        <img
                            src={productImage || product?.featured_image}
                            alt="Full Screen"
                            className="w-full h-auto max-h-[90vh] object-cover"
                        />
                        <button
                            className="absolute top-4 right-4 bg-gray-800 text-white p-2 rounded-full"
                            onClick={closeFullScreen}
                        >
                            <IoIosClose />
                        </button>

                        <button
                            className="absolute left-4 top-1/2 bg-gray-800 text-white p-2 rounded-full"
                            onClick={handlePrevImage}
                        >
                            Prev
                        </button>
                        <button
                            className="absolute right-4 top-1/2 bg-gray-800 text-white p-2 rounded-full"
                            onClick={handleNextImage}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}

            <div className="flex items-center justify-center pt-5 gap-4">
                <div>
                    <Image
                        onClick={() => setProductImage(product.featured_image)}
                        src={product.featured_image}
                        width={100}
                        height={100}
                        className="cursor-pointer w-full object-cover"
                        alt="Featured Image"
                    />
                </div>

                {product?.extra_fields
                    .filter(field => field.meta_name === "product_extra_images")
                    .map(field =>
                        Array.isArray(field.meta_value) ? (
                            field.meta_value.map((img, index) => (
                                <div key={index}>
                                    <Image
                                        onClick={() => setProductImage(img)}
                                        src={img}
                                        width={100}
                                        height={100}
                                        className="cursor-pointer w-full object-cover"
                                        alt={`Product Image ${index + 1}`}
                                    />
                                </div>
                            ))
                        ) : null
                    )}
            </div>
        </>
    );
};

export default ProductImage;
