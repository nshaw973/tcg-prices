import React, { useEffect, useState } from "react";
import { getData } from "../utils/utils";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Loading } from "../../../components";

const Types = () => {
  const [data, setData] = useState();
  const [type, selectType] = useState(null);
  const [typeData, setTypeData] = useState(null);
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const setParam = searchParams.get("type");
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  /*   useEffect(() => {
    const fetchData = async () => {
      navigate(`?type=${type}`);
      if (type) {
        try {
          const url = `http://localhost:3001/api/search/types/${type}`;
          const results = await getData(url);

          setTypeData(results);
        } catch (error) {
          console.error("Error fetching type data:", error);
        }
      }
    };

    fetchData();
  }, [type]); */

  useEffect(() => {
    if (path === "/categories/types") {
      setTypeData(null);
      navigate("/categories/types");
    }
    const fetchData = async () => {
      try {
        setLoading(true);
        const url = `http://localhost:3001/api/search/types`;
        const results = await getData(url);
        setData(results);
        console.log(results)
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
      {loading ? (
        <Loading />
      ) : (
        <>
          <h1>Types: </h1>
          {setParam ? (
            !typeData ? (
              <Loading />
            ) : (
              <h1>Type selected</h1>
            )
          ) : (
            <>
{/*             {data.map((pkmnType, index) => (
              <div>
                <h1>{pkmnType}</h1>
              </div>
            ))} */}

            </>
          )}
        </>
      )}
    </>
  );
};

export default Types;
