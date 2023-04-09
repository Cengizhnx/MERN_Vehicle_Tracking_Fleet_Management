import React, { useEffect, useState } from "react";
import axios from "axios";

function useCarFetch() {
  const [car, setCar] = useState([]);
  const [carLoading, setCarLoading] = useState([]);
  const [carError, setCarError] = useState([]);

  const options = {
    method: "GET",
    url: "https://car-data.p.rapidapi.com/cars",
    params: { limit: "30", page: "0" },
    headers: {
      "X-RapidAPI-Key": "a09770bc04msh51d7f23138d4483p1b4f26jsn36fc5648a13f",
      "X-RapidAPI-Host": "car-data.p.rapidapi.com",
    },
  };

  useEffect(() => {
    const fetchCar = async () => {
      setCarLoading(true);
      try {
        const res = await axios.request(options);
        setCar(res.data);
      } catch (error) {
        setCarError(error);
      }
      setCarLoading(false);
    };
    fetchCar();
  }, []);

  const reFetchCar = async () => {
    setCarLoading(true);
    try {
      const res = await axios.request(options);
      setCar(res.data);
    } catch (error) {
      setCarError(error);
    }
    setCarLoading(false);
  };

  return { car, carLoading, carError, reFetchCar };
}

export default useCarFetch;
