// Components/Admin/ContactList.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContactData } from "../Redux/contact";

const ContactList = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.contact);

  useEffect(() => {
    dispatch(getContactData());
  }, [dispatch]);

  if (loading) return <p className="text-center py-6">Loading contacts...</p>;

  if (!Array.isArray(data)) {
    return <p className="text-center text-red-500">No contact data available.</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-indigo-600 mb-4">📩 Contact Submissions</h1>
      <div className="grid gap-4">
        {data.map((item, i) => (
          <div key={i} className="border p-4 rounded shadow bg-white">
            <p><strong>Name:</strong> {item.name}</p>
            <p><strong>Email:</strong> {item.email}</p>
            <p><strong>Message:</strong> {item.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactList;
