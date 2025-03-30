import React, { useState, useEffect } from 'react';
import CategoryList from './categoryList';
import AddCategoryForm from './Addcategory';
import { adminInstance } from '../../helpers/api/inteceptors';

const CategoryPage = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await adminInstance.get('category');
            setCategories(response.data.categoryTree || []);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Menu Management</h1>

            <div className="grid md:grid-cols-2 gap-6">
                <CategoryList categories={categories} />
                <AddCategoryForm 
                    categories={categories} 
                    onCategoryAdded={fetchCategories}  
                />
            </div>
        </div>
    );
};

export default CategoryPage;
