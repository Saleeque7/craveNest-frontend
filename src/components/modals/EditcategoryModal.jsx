import React, { memo, useEffect, useState } from "react";

export default memo( function EditCategoryModal({
  isOpen,
  onClose,
  category,
  onSubmit,
  categories,
}) {
  const [newName, setNewName] = useState(category?.name || "");
  const [parentId, setParentId] = useState(category?.parent || "");

  useEffect(() => {
    if (category) {
      setNewName(category.name || "");
      setParentId(category.parent || "");
    }
  }, [category]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newName.trim() === "") return;
    onSubmit(category._id, newName, parentId === "" ? null : parentId);
    onClose();
  };

  const findParentCategory = (categories, parentId) => {
    for (const cat of categories) {
      if (cat._id.toString() === parentId) return cat;
      if (cat.children) {
        const found = findParentCategory(cat.children, parentId);
        if (found) return found;
      }
    }
    return null;
  };

  const currentParent = findParentCategory(categories, parentId);
  return (
    isOpen && (
      <div className="fixed inset-0 flex items-start justify-center pt-20 bg-black/30 backdrop-blur-sm z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
          <h2 className="text-xl font-bold mb-4">Edit Category</h2>

          <div className="bg-gray-100 text-gray-700 p-2 rounded-md mb-4">
            <strong>Current Category:</strong> {category?.name}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Category Name
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter new category name"
              />
            </label>

            <label className="block text-sm font-medium text-gray-700">
              Parent Category
              <select
                value={parentId || ""}
                onChange={(e) => setParentId(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {currentParent && parentId && (
                  <option value={currentParent._id}>
                    {currentParent.name}
                  </option>
                )}

                <option value="">None (Main Level)</option>

                {categories
                  .filter((cat) => cat._id !== category?._id)
                  .map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
              </select>
            </label>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
})
