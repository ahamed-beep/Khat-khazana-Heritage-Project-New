import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchApprovedSubmissionById, fetchApprovedLetters } from './Components/Redux/submission';
import Footer from './Components/Footer';
import Nax from './Components/Nax';

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentSubmission, approvedLetters, loading, error } = useSelector(
    (state) => state.submmission
  );

  useEffect(() => {
    if (id) dispatch(fetchApprovedSubmissionById(id));
    dispatch(fetchApprovedLetters());
  }, [dispatch, id]);

  if (loading) return <div className="text-center mt-20 text-xl">Loading...</div>;
  if (error) return <div className="text-center mt-20 text-xl">Error: {error.message || error}</div>;

  const item = currentSubmission?.data || currentSubmission;
  if (!item) return <div className="text-center mt-20 text-xl">No data found</div>;

  // Filter 3 related letters from the same category, not including current one
  const relatedLetters = approvedLetters
    ?.filter((letter) => letter.category === item.category && letter._id !== item._id)
    .slice(0, 3);

  return (
    <div>

<Nax/>
    <div className="font-serif text-[18px] bg-white leading-[3.2] text-black">
      {/* Orange Banner */}
      <div
        className="relative text-white text-center mx-16 pt-28 pb-64 px-6"
        style={{
          backgroundColor: '#e75b1e',
          clipPath: 'polygon(0 0, 100% 0, 100% 80%, 0% 100%)',
        }}
      >
        <div className="max-w-4xl mx-auto">
          <p className="italic text-sm font-medium">{item.dateimage}</p>
          <h1 className="text-5xl font-light leading-tight mt-2 capitalize">{item.title}</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 -mt-60 pb-24 relative z-10">
        {/* Image */}
        <div className="flex justify-center -mt-10">
          <img
            src={item.image}
            alt={item.title}
            className="w-full border-[10px] border-black"
          />
        </div>
        <p className="text-xs italic text-center mt-4 text-gray-500">
          Photograph is for illustrative purposes only
        </p>

        <div className="mt-12 p-6 bg-[#f7f7f7] border border-gray-300 justify-center rounded-md shadow-md">
  <h2 className="text-2xl font-bold mb-4 text-center text-[#e75b1e]">Story</h2>
  <div className="space-y-4 text-[1.125rem] text-gray-800 leading-relaxed">
    {item.story?.split('\n').map((line, idx) =>
      line.trim() ? <p key={idx}>{line}</p> : <br key={idx} />
    )}
  </div>

  <div className="mt-12 text-gray-800 space-y-1 text-center">
    <p><strong>Date:</strong> {item.dateimage}</p>
    <p><strong>Place:</strong> {item.placeimage}</p>
    <p><strong>Submitted by:</strong> {item.name}</p>
    <p><strong>Category:</strong> {item.category}</p>
  </div>
</div>
        {/* Back Button */}
        <div className="text-center  mt-14">
          <button
            onClick={() => navigate(-1)}
            className="bg-[#003366] text-white px-6 py-2 rounded hover:bg-[#001a33] transition"
          >
            ← Back
          </button>
        </div>

 
      </div>
             {/* Related Letters (with image and description) */}
        {relatedLetters && relatedLetters.length > 0 && (
          <div className="mt-10 mb-10">
  <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 border-b pb-2">
    Related Letters
  </h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-2">
    {relatedLetters.map((letter) => (
      <div
        key={letter._id}
        onClick={() => navigate(`/details/${letter._id}`)}
        className="cursor-pointer border border-gray-200 bg-white rounded-lg shadow hover:shadow-lg transition"
      >
        <img
          src={letter.image}
          alt={letter.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-[#e75b1e] mb-1 truncate">
            {letter.title}
          </h3>
          <p className="text-sm text-gray-600 mb-2">
            {letter.story?.slice(0, 120)}...
          </p>
          <p className="text-xs text-gray-500 italic">
            {letter.dateimage} – {letter.placeimage}
          </p>
        </div>
      </div>
    ))}
  </div>
</div>
        )}
      <Footer/>
    </div>

        </div>
  );
};

export default DetailPage;
