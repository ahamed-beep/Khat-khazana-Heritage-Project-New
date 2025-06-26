import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  LayoutDashboard,
  Menu,
  X,
  LogOut,
  PackagePlus,
} from "lucide-react";
import { getAllUsers } from "../Redux/user";
import { getsubmissionsdata, logout } from "../Redux/submission";

const currentAdmin = {
  isLoggedIn: true,
  avatar: "/admin-avatar.jpg",
};

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users } = useSelector((state) => state.user);
  const { submission, loading, error } = useSelector((state) => state.submmission);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getsubmissionsdata());
  }, [dispatch]);

  const getStatusColor = (status) => {
    if (status === "Approved") return "text-green-500";
    if (status === "Rejected") return "text-red-500";
    return "text-yellow-500";
  };

  const filtered = submission?.filter((item) => {
    const matchesStatus = selectedStatus === "All" || item.status === selectedStatus;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      item.name?.toLowerCase().includes(query) ||
      item.email?.toLowerCase().includes(query) ||
      item.category?.toLowerCase().includes(query) ||
      item.title?.toLowerCase().includes(query);
    return matchesStatus && matchesSearch;
  }) || [];

  return (
    <div>
      <div className="flex min-h-screen text-gray-800 bg-gradient-to-tr from-white to-gray-100 ">

        {/* Sidebar */}
        <aside className={`bg-white shadow-2xl w-64 fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="p-5 flex justify-between items-center border-b">
            <h2 className="text-xl font-bold text-indigo-600">Khat Khazana</h2>
            <button onClick={() => setSidebarOpen(false)} className="md:hidden"><X /></button>
          </div>
          <nav className="mt-6 space-y-3 px-4">
            <button onClick={() => navigate("/admin")} className="w-full flex items-center gap-3 p-2 font-medium rounded-lg hover:bg-indigo-50 text-indigo-700"><LayoutDashboard className="w-5 h-5" /> Dashboard</button>
            <button onClick={() => navigate("/addproduct")} className="w-full flex items-center gap-3 p-2 font-medium rounded-lg hover:bg-indigo-50 text-indigo-700"><PackagePlus className="w-5 h-5" /> Add Product</button>
            <button onClick={() => navigate("/getallproducts")} className="w-full flex items-center gap-3 p-2 font-medium rounded-lg hover:bg-indigo-50 text-indigo-700"><PackagePlus className="w-5 h-5" /> Get Products</button>
            <button onClick={() => navigate("/featuredproduct")} className="w-full flex items-center gap-3 p-2 font-medium rounded-lg hover:bg-indigo-50 text-indigo-700"><PackagePlus className="w-5 h-5" /> Featured</button>
            <button onClick={() => navigate("/getcontact")} className="w-full flex items-center gap-3 p-2 font-medium rounded-lg hover:bg-indigo-50 text-indigo-700"><PackagePlus className="w-5 h-5" /> Contacts</button>
            <button onClick={() => navigate("/lettersubmissions")} className="w-full flex items-center gap-3 p-2 font-medium rounded-lg hover:bg-indigo-50 text-indigo-700"><PackagePlus className="w-5 h-5" /> Letters</button>
            <button onClick={() => navigate("/photographsubmissions")} className="w-full flex items-center gap-3 p-2 font-medium rounded-lg hover:bg-indigo-50 text-indigo-700"><PackagePlus className="w-5 h-5" /> Photographs</button>
            <button onClick={() => navigate("/adminsubmission")} className="w-full flex items-center gap-3 p-2 font-medium rounded-lg hover:bg-indigo-50 text-indigo-700"><PackagePlus className="w-5 h-5" /> Admin Submissions</button>

          </nav>
        </aside>

        {/* Main */}
        <main className="flex flex-col w-full">
          {/* Header */}
          <header className="flex justify-between items-center px-4 py-4 bg-white shadow sticky top-0 z-10">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden"><Menu className="text-indigo-600" /></button>
            <h1 className="text-xl font-semibold text-indigo-700">Admin Panel</h1>
            <div className="flex items-center gap-4">
             <button
  onClick={() => {
    dispatch(logout());       
    navigate("/log");      
    localStorage.clear();   
  }}
>
  <LogOut className="text-gray-500 hover:text-red-500" />
</button>
              <img src='https://www.shutterstock.com/image-vector/admin-icon-strategy-collection-thin-600nw-2307398667.jpg' alt="Admin" className="w-10 h-10 rounded-full border-2 border-indigo-300 shadow" />
            </div>
          </header>

          {/* Stats */}
          <section className="flex justify-center gap-4 p-4 overflow-x-auto">
            <div className="bg-white rounded-2xl shadow-md p-4 text-center w-64">
              <p className="text-gray-500 font-medium">Total Submissions</p>
              <h2 className="text-3xl font-bold text-indigo-600">{submission.length}</h2>
            </div>
            {["Approved", "Pending", "Rejected"].map((status) => (
              <div key={status} className="bg-white rounded-2xl shadow-md p-4 text-center w-64">
                <p className="text-gray-500 font-medium">{status}</p>
                <h2 className={`text-3xl font-bold ${getStatusColor(status)}`}>{submission.filter((s) => s.status === status).length}</h2>
              </div>
            ))}
          </section>

          {/* Filters */}
          <section className="flex flex-col sm:flex-row justify-between items-center gap-4 px-4 pb-4">
            <div className="flex flex-wrap gap-2">
              {["All", "Pending", "Approved", "Rejected"].map((type) => (
                <button key={type} onClick={() => setSelectedStatus(type)} className={`px-4 py-1.5 rounded-full text-sm font-medium ${selectedStatus === type ? "bg-indigo-600 text-white" : "bg-indigo-100 text-indigo-600 hover:bg-indigo-200"}`}>{type}</button>
              ))}
            </div>
            <input
              type="text"
              placeholder="Search by title, email, category"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-64 px-4 py-2 border rounded-lg focus:ring-indigo-400"
            />
          </section>

          {/* Submission Cards */}
          {loading && <p className="text-center py-10 text-gray-500">Loading...</p>}
          {error && <p className="text-center py-10 text-red-500">Error: {error}</p>}
          {filtered.map((entry) => (
            <section key={entry._id} className="px-4 pb-10">
              <div className="bg-white rounded-2xl shadow-md p-6 max-w-3xl mx-auto space-y-4">
                <div className="flex justify-center">
                  <img src={entry.image} alt={entry.title} className="w-40 h-40 object-cover rounded shadow" />
                </div>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <dt className="text-gray-600 font-medium">Title</dt>
                  <dd className="text-gray-800">{entry.title}</dd>
                  <dt className="text-gray-600 font-medium">Email</dt>
                  <dd className="text-gray-800">{entry.email}</dd>
                  <dt className="text-gray-600 font-medium">Category</dt>
                  <dd className="text-gray-800">{entry.category}</dd>
                  <dt className="text-gray-600 font-medium">Status</dt>
                  <dd className={`font-semibold ${getStatusColor(entry.status)}`}>{entry.status}</dd>
                </dl>
                <button
                  onClick={() => navigate(`/submission/view/${entry._id}`)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded mt-4 hover:bg-indigo-700"
                >
                  View / Edit
                </button>
              </div>
            </section>
          ))}
        </main>
      </div>
    </div>
  );
}
