import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getSingleSubmissionById, updateSubmissionById } from "../Redux/submission";

const SubmissionView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singlesubmission, loading, error } = useSelector((state) => state.submmission);

  const [formData, setFormData] = useState({
    title: "",
    admindescription: "",
    status: "",
    featuredletter: "",
    featuredphotograph: "",
  });

  useEffect(() => {
    dispatch(getSingleSubmissionById(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (singlesubmission) {
      setFormData({
        title: singlesubmission.title || "",
        admindescription: singlesubmission.admindescription || "",
        status: singlesubmission.status || "",
        featuredletter: singlesubmission.featuredletter || "False",
        featuredphotograph: singlesubmission.featuredphotograph || "False",
      });
    }
  }, [singlesubmission]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      let updatedData = { ...prev, [name]: value };
      // Auto-update status if featured flags change
      if (name === "featuredphotograph" || name === "featuredletter") {
        const photograph = name === "featuredphotograph" ? value : prev.featuredphotograph;
        const letter = name === "featuredletter" ? value : prev.featuredletter;

        if (photograph === "True" || letter === "True") {
          updatedData.status = "True";
        } else {
          updatedData.status = "False";
        }
      }
      return updatedData;
    });
  };

  const handleUpdate = () => {
    dispatch(updateSubmissionById({ id, updatedData: formData }));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!singlesubmission) return <p>No submission found.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow rounded space-y-6">
      <h1 className="text-xl font-semibold mb-2">View & Edit Submission</h1>

      {/* View Info */}
      <div className="space-y-1 text-sm">
        <p><strong>Name:</strong> {singlesubmission.name}</p>
        <p><strong>Email:</strong> {singlesubmission.email}</p>
        <p><strong>Category:</strong> {singlesubmission.category}</p>
      </div>

      {/* Edit Form */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

  
       <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="admindescription"
            rows={4}
            value={formData.admindescription}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Featured Photograph</label>
          <select
            name="featuredphotograph"
            value={formData.featuredphotograph}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="False">False</option>
            <option value="True">True</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Featured Letter</label>
          <select
            name="featuredletter"
            value={formData.featuredletter}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="False">False</option>
            <option value="True">True</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <button
          onClick={handleUpdate}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default SubmissionView;
