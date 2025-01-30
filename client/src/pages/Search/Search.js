import React, { useEffect, useState } from "react";
import { searchQuery } from "../../components/Navbar/searchQuery/searchQuery";
import { useSearchParams } from "react-router-dom";
import { Loading } from "../../components";
import SearchAll from "./Results/SearchAll";
import CardById from "./Results/CardById";

const Search = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [searchParams] = useSearchParams();

  const [search, setSearch] = useState({
    type: searchParams.get("type"),
    query: searchParams.get("query")
  });

  // Update the search state whenever the searchParams change
  useEffect(() => {
    const newType = searchParams.get("type");
    const newQuery = searchParams.get("query");

    // If search parameters change, reset the data and start loading the new data
    setSearch({
      type: newType,
      query: newQuery
    });
    setData(null); // Reset data when search query/type changes
    setLoading(true); // Set loading to true when starting to fetch new data
  }, [searchParams]);

  // Fetch data based on the search parameters (query and type)
  useEffect(() => {
    if (!search.query || !search.type) return;

    const fetchData = async () => {
      try {
        const result = await searchQuery(search.type, search.query.toLowerCase());
        setData(result); // Update data after fetching
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setLoading(false); // Stop loading after the data is fetched
      }
    };

    fetchData();
  }, [search.query, search.type]); // Re-run when `search.query` or `search.type` changes

  // Render the results based on search type
  const renderResults = (data) => {
    if (!data || data.length === 0) {
      return <h1>No results found!</h1>;
    }

    switch (search.type) {
      case "name":
        return data.map((item, index) => <SearchAll key={index} props={{ item, index }} />);
      case "id":
        return <CardById data={data} />;
      default:
        return <h1>Invalid search type!</h1>;
    }
  };
    useEffect(() => {
      console.log(data)
    }, [data])

  return (
    <>
      {loading ? (
        <Loading /> // Show loading spinner while fetching
      ) : (
        <>
          <h1 className="w-full text-black">Search Results: </h1>
          <div className="w-full">
            {data ? (
              <ul className="flex flex-wrap justify-center">
                {renderResults(data)} {/* Only render after data is fetched */}
              </ul>
            ) : (
              <h1>Sorry, no results were found!</h1> // Show when no data
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Search;
