import React, { useState } from 'react';
import { adminApi } from '../../helpers/api/axioscall';
import { Flip, Slide, toast } from 'react-toastify';

const AddCategoryForm = ({ categories, onCategoryAdded }) => {
    const [name, setName] = useState('');
    const [parentId, setParentId] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = {
                name,
                parentId: parentId || null  
            };
            const response = await adminApi.post('category', payload);

            if (response.data && response.data.success) {
                toast.success(response.data.message, {
                    transition: Slide,
                    autoClose: 1000,
                });

                onCategoryAdded(); 
                setName('');
                setParentId('');
            }
        } catch (error) {
            console.error(error, "error in submitting form");
            if (error.response && error.response.data) {
                const { message } = error.response.data;
                toast.error(message, {
                    transition: Flip,
                    autoClose: 2000,
                });
            }
        }
    };


    const renderCategoryOptions = (categoryList, indent = '') => {
        return categoryList.map((category) => (
            <React.Fragment key={category._id}>
                <option value={category._id}>
                    {indent + category.name}
                </option>
                {category.children && category.children.length > 0 && (
                    renderCategoryOptions(category.children, `${indent}-- `)
                )}
            </React.Fragment>
        ));
    };

    return (
        <div className="p-4 bg-white shadow-md rounded-xl w-full max-w-md mx-auto mt-6">
            <h2 className="text-lg font-bold mb-4">Add Category</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Category Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 border rounded-md"
                    required
                />

                <select
                    value={parentId}
                    onChange={(e) => setParentId(e.target.value)}
                    className="w-full p-2 border rounded-md"
                >
                    <option value="">No Parent (Top-level)</option>
                    {renderCategoryOptions(categories)}
                </select>

                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                    Add Category
                </button>
            </form>
        </div>
    );
};

export default AddCategoryForm;
