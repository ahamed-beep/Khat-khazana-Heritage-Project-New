// SearchResultsPage.jsx – final version with keyword logic and A‑Z category display
import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router";
import axios from "./Connection/Api";
import Nax from "./Nax";
import Footer from "./Footer";
import { Fade } from "react-awesome-reveal";

const SearchResultsPage = () => {
  const [results, setResults] = useState({
    letters: [],
    photos: [],
    products: []
  });
  const [filteredResults, setFilteredResults] = useState({
    letters: [],
    photos: [],
    products: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const query = new URLSearchParams(useLocation().search).get("query") || "";

  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setError("Please enter a valid search term (at least 2 characters)");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");
    setSearchQuery(query);

    const fetchData = async () => {
      try {
        const endpoints = {
          letters: "/getapprovedletters",
          photos: "/getapprovedphotographs",
          products: "/getproduct"
        };

        // fetch all three categories in parallel
        const [lettersRes, photosRes, productsRes] = await Promise.all([
          axios.get(endpoints.letters),
          axios.get(endpoints.photos),
          axios.get(endpoints.products)
        ]);

        const all = {
          letters: lettersRes.data.data || [],
          photos: photosRes.data.data || [],
          products: productsRes.data || []
        };
        setResults(all);

        const lower = query.toLowerCase();

        // Helper to filter by title / description / category
        const match = (item, type) => {
          if (item.title?.toLowerCase().includes(lower)) return true;
          if (item.description?.toLowerCase().includes(lower)) return true;
          if (type === "products" && item.category?.toLowerCase().includes(lower)) return true;
          return false;
        };

        const keywordMap = {
          letters: lower.includes("letter"),
          photos: lower.includes("photo") || lower.includes("image"),
          products: lower.includes("product") || lower.includes("shop")
        };

        // If keyword present, show full category; otherwise filter
        const filtered = {
          letters: keywordMap.letters ? all.letters : all.letters.filter((i) => match(i, "letters")),
          photos: keywordMap.photos ? all.photos : all.photos.filter((i) => match(i, "photos")),
          products: keywordMap.products ? all.products : all.products.filter((i) => match(i, "products"))
        };

        setFilteredResults(filtered);
      } catch (err) {
        console.error("Search error:", err);
        setError("Failed to load search results. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  const renderResults = (items, type) => {
    if (!items || items.length === 0) return null;

    const headings = {
      letters: "Historical Letters",
      photos: "Photographs",
      products: "Products"
    };

   const linkFor = (id) =>
  type === "products" ? `/product-view/${id}` : `/details/${id}`;

    return (
      <Fade cascade damping={0.1}>
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">{headings[type]}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <Link
                key={item._id}
                to={linkFor(item._id)}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={item.image || item.image1 || "/placeholder.jpg"}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    onError={(e) => (e.currentTarget.src = "/placeholder.jpg")}
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1 text-gray-800 line-clamp-1">{item.title}</h3>
                  {item.date && (
                    <p className="text-sm text-gray-500 mb-2">{new Date(item.date).toLocaleDateString()}</p>
                  )}
                  {item.description && (
                    <p className="text-gray-600 text-sm line-clamp-2">{item.description}</p>
                  )}
                  {type === "products" && item.price && (
                    <p className="text-indigo-600 font-medium mt-2">₹{item.price.toLocaleString()}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>
      </Fade>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Nax />

      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
              <p className="text-gray-600">Searching our archives...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <h2 className="text-xl font-bold text-gray-800 mb-2">{error}</h2>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Search Results for "{searchQuery}"</h1>
                <p className="text-gray-600">
                  Found {filteredResults.letters.length + filteredResults.photos.length + filteredResults.products.length} items
                </p>
              </div>

              {renderResults(filteredResults.letters, "letters")}
              {renderResults(filteredResults.photos, "photos")}
              {renderResults(filteredResults.products, "products")}

              {filteredResults.letters.length === 0 &&
                filteredResults.photos.length === 0 &&
                filteredResults.products.length === 0 && (
                  <p className="text-center text-gray-600 mt-12">No results found. Try a different keyword.</p>
                )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SearchResultsPage;
