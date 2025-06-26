import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLetterSubmissions } from "../Redux/submission";

const LetterSubmissionsPage = () => {
  const dispatch = useDispatch();
  const { letters, loading, error } = useSelector((state) => state.submmission);

  useEffect(() => {
    dispatch(fetchLetterSubmissions());
  }, [dispatch]);

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-orange-600">Letter Submissions</h1>

      {letters.length === 0 ? (
        <p className="text-center">No letter submissions found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {letters.map((item) => (
            <div key={item._id} className="bg-white shadow-md p-6 rounded-lg border border-gray-200">
              <h2 className="text-xl font-semibold text-orange-700 mb-2">{item.title}</h2>

              <div className="text-sm space-y-1 text-gray-700">
                <p><span className="font-medium">Name:</span> {item.name}</p>
                <p><span className="font-medium">Location:</span> {item.location}</p>
                <p><span className="font-medium">Phone:</span> {item.phone}</p>
                <p><span className="font-medium">Email:</span> {item.email}</p>
                <p><span className="font-medium">Guardian/Owner:</span> {item.guadianowner}</p>
                <p><span className="font-medium">Attachment:</span> {item.attachment}</p>
                <p><span className="font-medium">Image Date:</span> {item.dateimage}</p>
                <p><span className="font-medium">Place Image:</span> {item.placeimage}</p>
                <p><span className="font-medium">Story:</span> {item.story?.substring(0, 100)}...</p>
                <p><span className="font-medium">Status:</span> {item.status}</p>
              </div>

              <div className="mt-4">
                <img
                  src={item.image}
                  alt="Uploaded"
                  className="w-full h-48 object-cover rounded border border-gray-300"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LetterSubmissionsPage;
