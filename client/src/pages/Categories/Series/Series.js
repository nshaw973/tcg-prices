import React, { useEffect, useState } from "react";
import { upperCase } from "../../utils/utils";
import { getData } from "../utils/utils";
import SearchAll from "../../Search/Results/SearchAll";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
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
    const fetchData = async () => {
      navigate(`?set=${series}`);
      if (series) {
        try {
          const url = `http://localhost:3001/api/search/series/${series}`;
          const results = await getData(url);
          setSeriesData(results);
        } catch (error) {
          console.error("Error fetching series data:", error);
        }
      }
    };

    fetchData();
  }, [series]);

  useEffect(() => {
    if (path === "/categories/series") {
      setSeriesData(null);
      navigate("/categories/series");
    }
    const fetchData = async () => {
      try {
        setLoading(true);
        const url = `http://localhost:3001/api/search/series`;
        const results = await getData(url);
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
      <div className="flex flex-wrap gap-4 justify-center animate-fade animate-ease-in-out">
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
                  <div
                    key={index}
                    className="flex flex-col border p-4 shadow-xl cursor-pointer"
                    onClick={() => selectSeries(series.id)}
                  >
                    {/* Image */}
                    <div
                      className={`flex justify-center items-center h-24 w-56`}
                    >
                      <img
                        src={series.images.logo}
                        className="max-h-24 max-w-56"
                        alt={series.name}
                      />
                    </div>

                    {/* Data */}
                    <div className="text-center mt-4 flex flex-col text-black">
                      <strong>{upperCase(series.name)}</strong>
                      <h1 className="text-sm">{series.releaseDate}</h1>
                      <h1>{series.series}</h1>
                    </div>
                  </div>
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
