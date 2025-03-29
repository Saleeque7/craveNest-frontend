import React, { useEffect, useState } from "react";
import { adminApi } from "../../helpers/api/axioscall";
import { Flip, Slide, toast } from "react-toastify";
import { FaRegListAlt } from "react-icons/fa";
import ConfirmationModal from "../modals/confirmationModal";
import EditCategoryModal from "../modals/EditcategoryModal";

const CategoryItem = ({ category, onEdit, onDelete, isMainLevel }) => (
  <li className={`py-2 ${isMainLevel ? "border-b border-gray-400" : ""}`}>
    <div className="flex justify-between items-center">
      <span className="font-medium flex items-center space-x-2">
        {isMainLevel && <FaRegListAlt className="text-blue-500" />}
        <span>{category.name}</span>
      </span>
      <div className="space-x-2">
        <button
          className="bg-yellow-500 text-white px-3 py-1 rounded-md"
          onClick={() => onEdit(category)}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white px-3 py-1 rounded-md"
          onClick={() => onDelete(category)}
        >
          Delete
        </button>
      </div>
    </div>

    {category.children && category.children.length > 0 && (
      <ul className="pl-4 border-l border-gray-300 mt-2 space-y-2">
        {category.children.map((subCategory) => (
          <CategoryItem
            key={subCategory._id}
            category={subCategory}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </ul>
    )}
  </li>
);

export default function EditCategoryPage() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const response = await adminApi.get("category");
      setCategories(response.data.categoryTree || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to load categories.", { transition: Flip });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = (category) => {
    setSelectedCategory({
      ...category,
      parentId: category.parentId ? category.parentId : null,
    });
    setEditMode(false);
    setIsConfirmationModalOpen(true);
  };

  const handleEditClick = (category) => {
    setSelectedCategory({
      ...category,
      parentId: category.parentId ? category.parentId : null,
    });
    setIsEditModalOpen(true);
  };

  const handleConfirmAction = () => {
    if (editMode) {
      setIsEditModalOpen(true);
    } else {
      handleConfirmDelete();
    }
    setIsConfirmationModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (!selectedCategory) return;

    try {
      const response = await adminApi.delete(
        `category/${selectedCategory._id}`
      );

      if (response.data && response.data.success) {
        toast.success(response.data.message, {
          transition: Slide,
          autoClose: 1000,
        });
        fetchCategories();
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

  const handleEdit = async (categoryId, updatedName, parentId) => {
    if (!updatedName || updatedName.trim() === "") return;

    const data = {
      name: updatedName,
      parentId: parentId || null,
    };

    try {
      const response  = await adminApi.put(`category/${categoryId}`, data);
      if (response.data && response.data.success) {
        toast.success(response.data.message, {
          transition: Slide,
          autoClose: 1000,
        });
      fetchCategories();
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
    setIsEditModalOpen(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="p-4 bg-white shadow-md rounded-xl w-full max-w-3xl mx-auto mt-6">
      <h2 className="text-lg font-bold mb-4">Categories</h2>

      {isLoading ? (
        <div className="inline-flex items-center">
          <span className="text-blue-500 text-sm">Loading...</span>
        </div>
      ) : (
        <ul className="space-y-4">
          {categories.map((category) => (
            <CategoryItem
              key={category._id}
              category={category}
              isMainLevel={true}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
          ))}
        </ul>
      )}

      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)}
        onConfirm={handleConfirmAction}
        title={editMode ? "Edit Category" : "Delete Category"}
        description={
          editMode
            ? `Are you sure you want to edit "${selectedCategory?.name}"?`
            : `Are you sure you want to delete "${selectedCategory?.name}"?`
        }
      />

      <EditCategoryModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        category={selectedCategory}
        onSubmit={(id, newName, parentId) => handleEdit(id, newName, parentId)}
        categories={categories}
      />
    </div>
  );
}
