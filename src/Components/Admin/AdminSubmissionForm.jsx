// src/Pages/AdminSubmissionForm.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { adminPostSubmission } from "../Redux/submission";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';

const AdminSubmissionForm = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    title: "",
    name: "",
    location: "",
    phone: "",
    phone2: "",
    email: "",
    socialmedia: "",
    guadianowner: "true",
    attachment: "Letter",
    otherspecify: "",
    image: "",
    dateimage: "",
    placeimage: "",
    photographcaptain: "",
    story: "",
    narrative: "",
    imageadded: "true",
    imagebefore: "true",
    termsandcondition: "true",
    category: "",
    status: "Approved", 
    admindescription: "",
    featuredphotograph: "false",
    featuredletter: "false",
    language: "english"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  
  // Handle date change with validation
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setFormData(prev => ({ ...prev, dateimage: selectedDate }));
  };

  // Image handler to convert file to data URL
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.match('image/jpeg') && !file.type.match('image/png')) {
      toast.error('Please select a JPG or PNG image');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({ ...prev, image: reader.result }));
    };
    reader.onerror = () => {
      toast.error('Error reading file');
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    // Validate date range
    if (formData.dateimage) {
      const year = parseInt(formData.dateimage.split('-')[0]);
      if (year < 1900 || year > 2000) {
        toast.error('Date must be between 1900 and 2000');
        return;
      }
    }

    // Validate image
    if (!formData.image) {
      toast.error('Please upload an image');
      return;
    }

    try {
      setLoading(true);
      await dispatch(adminPostSubmission(formData)).unwrap();
      toast.success("Submission created successfully!");
      
      // Reset form
      setFormData({
        title: "",
        name: "",
        location: "",
        phone: "",
        phone2: "",
        email: "",
        socialmedia: "",
        guadianowner: "true",
        attachment: "Letter",
        otherspecify: "",
        image: "",
        dateimage: "",
        placeimage: "",
        photographcaptain: "",
        story: "",
        narrative: "",
        imageadded: "true",
        imagebefore: "true",
        termsandcondition: "true",
        category: "",
        status: "Approved", 
        admindescription: "",
        featuredphotograph: "false",
        featuredletter: "false",
        language: "english"
      });
      
      // Reset file input
      const fileInput = document.getElementById('image-upload');
      if (fileInput) fileInput.value = '';
      
    } catch (err) {
      const errorMsg = err.message || "Submission failed";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Admin Submission Form</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
            <input 
              type="text" 
              name="title" 
              value={formData.title} 
              onChange={handleChange} 
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" 
              required 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" 
              required 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
            <input 
              type="text" 
              name="location" 
              value={formData.location} 
              onChange={handleChange} 
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" 
              required 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
            <input 
              type="text" 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange} 
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" 
              required 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Alternate Phone</label>
            <input 
              type="text" 
              name="phone2" 
              value={formData.phone2} 
              onChange={handleChange} 
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" 
              required 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Social Media</label>
            <input 
              type="text" 
              name="socialmedia" 
              value={formData.socialmedia} 
              onChange={handleChange} 
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Guardian/Owner *</label>
            <select 
              name="guadianowner" 
              value={formData.guadianowner} 
              onChange={handleChange} 
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Attachment Type *</label>
            <select 
              name="attachment" 
              value={formData.attachment} 
              onChange={handleChange} 
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="Letter">Letter</option>
              <option value="Photograph">Photograph</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Other Specify</label>
            <input 
              type="text" 
              name="otherspecify" 
              value={formData.otherspecify} 
              onChange={handleChange} 
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" 
            />
          </div>
          
          {/* Updated Image Upload Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image *</label>
            <input 
              type="file"
              id="image-upload"
              accept="image/jpeg, image/png"
              onChange={handleImageChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" 
              required 
            />
            {formData.image && (
              <div className="mt-2">
                <p className="text-xs text-gray-600">Image Preview:</p>
                <img 
                  src={formData.image} 
                  alt="Preview" 
                  className="mt-1 max-w-xs max-h-32 object-contain"
                />
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date (1900-2000) *</label>
            <input 
              type="date"
              name="dateimage"
              value={formData.dateimage}
              onChange={handleDateChange}
              min="1900-01-01"
              max="2000-12-31"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" 
              required 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Place *</label>
            <input 
              type="text" 
              name="placeimage" 
              value={formData.placeimage} 
              onChange={handleChange} 
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" 
              required 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Photograph Caption *</label>
            <input 
              type="text" 
              name="photographcaptain" 
              value={formData.photographcaptain} 
              onChange={handleChange} 
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" 
              required 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Story *</label>
            <textarea 
              name="story" 
              value={formData.story} 
              onChange={handleChange} 
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" 
              required 
              rows="3"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Narrative *</label>
            <textarea 
              name="narrative" 
              value={formData.narrative} 
              onChange={handleChange} 
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" 
              required 
              rows="3"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image Added *</label>
            <select 
              name="imageadded" 
              value={formData.imageadded} 
              onChange={handleChange} 
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pre-1992 Image *</label>
            <select 
              name="imagebefore" 
              value={formData.imagebefore} 
              onChange={handleChange} 
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Terms Accepted *</label>
            <select 
              name="termsandcondition" 
              value={formData.termsandcondition} 
              onChange={handleChange} 
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          
        <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
  <select
    name="category" // Added name attribute
    value={formData.category} 
    onChange={handleChange}
    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
    required
  >
    <option value="">Select category</option>
    <option value="love-letters">LOVE LETTERS</option>
    <option value="family">FAMILY</option>
    <option value="war-political-turmoil">WAR/POLITICAL TURMOIL</option>
    <option value="travel">TRAVEL</option>
    <option value="dairypages-newspaper">DAIRYPAGES/NEWSPAPER</option>
    <option value="cards-postcards">CARDS/POSTCARDS</option>
    <option value="moviecards">MOVIECARDS</option>
    <option value="calenders">CALENDERS</option>
    <option value="letter-by-famous-personalities">LETTER BY FAMOUS PERSONALITIES</option>
    <option value="others">OTHERS</option>
  </select>
</div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Language *</label>
            <select
              name="language"
              value={formData.language}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            >
              <option value="english">English</option>
              <option value="urdu">Urdu</option>
           <option value="saraiki">Saraiki</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
            <select 
              name="status" 
              value={formData.status} 
              onChange={handleChange} 
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            >
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Admin Description</label>
            <textarea 
              name="admindescription" 
              value={formData.admindescription} 
              onChange={handleChange} 
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" 
              rows="3"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Featured Photograph</label>
            <select 
              name="featuredphotograph" 
              value={formData.featuredphotograph} 
              onChange={handleChange} 
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Featured Letter</label>
            <select 
              name="featuredletter" 
              value={formData.featuredletter} 
              onChange={handleChange} 
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md shadow-md transition duration-300 flex items-center justify-center ${
            loading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {loading ? (
            <ClipLoader size={20} color="#ffffff" />
          ) : (
            'Create Submission'
          )}
        </button>
      </form>
    </div>
  );
};

export default AdminSubmissionForm;