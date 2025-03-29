import React from 'react';

const CategoryList = ({ categories, level = 0 }) => {
    const colors = [
        "border-blue-500", 
        "border-green-500", 
        "border-yellow-500", 
        "border-purple-500"
    ];

    const textColors = [
        "text-blue-600",
        "text-green-600",
        "text-yellow-600",
        "text-purple-600"
    ];

    const renderCategories = (categories, level = 0) => {
        const borderColor = colors[level % colors.length];
        const textColor = textColors[level % textColors.length];

        return (
            <ul className={`pl-4 border-l-4 ${borderColor}`}>
                {categories.map((category) => (
                    <li key={category._id} className="mb-3">
                        <div className={`flex items-center gap-2 ${textColor}`}>
                            <span className="font-semibold">{category.name}</span>
                            {Array.isArray(category.children) && category.children.length > 0 && (
                                <span className="text-xs text-gray-400">
                                    ({category.children.length} subcategories)
                                </span>
                            )}
                        </div>
                        {Array.isArray(category.children) &&
                            category.children.length > 0 &&
                            renderCategories(category.children, level + 1)}
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div className="p-6 bg-white shadow-lg rounded-2xl w-full max-w-md mx-auto border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Menu Categories</h2>
            {categories?.length > 0 ? (
                renderCategories(categories)
            ) : (
                <p className="text-gray-500">No categories available.</p>
            )}
        </div>
    );
};

export default CategoryList;
