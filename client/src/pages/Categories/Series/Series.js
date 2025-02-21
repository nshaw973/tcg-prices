import React, { useEffect, useState } from "react";
import { upperCase } from "../../utils/utils";
import { getData } from "../utils/utils";
import { removeOldestItem } from "../../../utils/utils";
import SearchAll from "../../Search/Results/SearchAll";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Loading } from "../../../components";

const Series = () => {
  const [data, setData] = useState();
  const [series, selectSeries] = useState(null);
  const [seriesData, setSeriesData] = useState(null);
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const setParam = searchParams.get("set");
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      setSeriesData(null);
      if (series) {
        let results;
        try {
          const cachedData = sessionStorage.getItem(`${series}Data`);

          if (cachedData) {
            // Use cached data
            results = JSON.parse(cachedData);
          } else {
            const url = `/api/search/series/${series}`;
            results = await getData(url);
            // Store in localStorage
            sessionStorage.setItem(`${series}Data`, JSON.stringify(results));
          }
          setSeriesData(results);
          setLoading(false);
        } catch (error) {
          if (error.name === "QuotaExceededError") {
            // If storage is full, remove the oldest item
            sessionStorage.clear()
            // Retry adding the item
            const url = `/api/search/series/${series}`;
            results = await getData(url);
            sessionStorage.setItem(`${series}Data`, JSON.stringify(results));
          } else {
            console.error("Error fetching series data:", error);
            setLoading(false);
            return;
          }
        }
      }
    };

    fetchData();
  }, [series]);

  useEffect(() => {
    if (path === "/categories/series") {
      setLoading(true);
      setSeriesData(null);
      navigate("/categories/series");
      setLoading(false);
    }
    const fetchData = async () => {
      try {
        setLoading(true);
        const cachedData = localStorage.getItem("pkmnSeries");
        let results;
        if (cachedData) {
          // Use cached data
          results = JSON.parse(cachedData);
        } else {
          const url = `/api/search/series`;
          results = await getData(url);
          // Store in localStorage
          localStorage.setItem("pkmnSeries", JSON.stringify(results));
        }
        setData(results);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [path, navigate]);

  return (
    <>
      {/* Container for all series */}
      <div className="flex flex-wrap gap-4 justify-center animate-fade animate-ease-in-out pt-4">
        {loading ? (
          <Loading />
        ) : (
          <>
            {setParam ? (
              !seriesData ? (
                <Loading /> // Show loading spinner if seriesData is not available
              ) : (
                // Render SearchAll components for each item in seriesData
                seriesData.map((item, index) => (
                  <SearchAll key={index} props={{ item, index }} />
                ))
              )
            ) : (
              <>
                {data.map((series, index) => (
                  <Link
                    key={index}
                    className="flex flex-col border p-4 shadow-xl cursor-pointer bg-white rounded"
                    onClick={() => selectSeries(series.id)}
                    to={`/categories/series?set=${series.id}`}
                  >
                    {/* Image */}
                    <div
                      className={`flex justify-center items-center h-24 w-56`}
                    >
                      <img
                        src={series.images.logo}
                        className="max-h-24 max-w-56 m-auto"
                        alt={series.name}
                      />
                    </div>

                    {/* Data */}
                    <div className="text-center mt-4 flex flex-col text-black">
                      <strong>{upperCase(series.name)}</strong>
                      <h1 className="text-sm">{series.releaseDate}</h1>
                      <h1>{series.series}</h1>
                    </div>
                  </Link>
                ))}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Series;
