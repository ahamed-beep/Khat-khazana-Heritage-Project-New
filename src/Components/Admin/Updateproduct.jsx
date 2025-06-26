import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductById, updateProductById } from "../Redux/product";
import { useParams, useNavigate } from "react-router";

const ProductUpdateForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product, loading } = useSelector(state => state.product);

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    image1: "",
    image2: "",
    image3: "",
    image4: "",
    featuredproduct: "false"
  });

  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || "",
        price: product.price || "",
        description: product.description || "",
        image1: product.image1 || "",
        image2: product.image2 || "",
        image3: product.image3 || "",
        image4: product.image4 || "",
        featuredproduct: product.featuredproduct || "false"
      });
    }
  }, [product]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleImageChange = (e, imageKey) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          [imageKey]: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProductById({ id, data: formData }))
      .then(() => navigate("/getallproducts"));
  };

  if (loading) {
    return <p className="text-center py-10">Loading...</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white rounded shadow space-y-4">
      <h1 className="text-xl font-bold text-indigo-600">Update Product</h1>

      <input
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded"
      />

      <input
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded"
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded"
        rows={3}
      />

      {/* Featured Product Dropdown */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Is Featured Product?</label>
        <select
          name="featuredproduct"
          value={formData.featuredproduct}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
        >
          <option value="false">False</option>
          <option value="true">True</option>
        </select>
      </div>

      {/* Image Uploads */}
      {[1, 2, 3, 4].map(num => (
        <div key={num}>
          <p className="text-sm font-medium">Image {num} Preview:</p>
          <img src={formData[`image${num}`]} alt={`Image${num}`} className="h-24 w-auto rounded mb-1" />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e, `image${num}`)}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
      ))}

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
      >
        {loading ? "Updating..." : "Update Product"}
      </button>
    </form>
  );
};

export default ProductUpdateForm;
