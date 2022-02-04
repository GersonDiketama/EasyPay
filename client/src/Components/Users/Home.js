import React from "react";
import { useState, useEffect } from "react";
import DataManager from "./UsersDataManager";
import HomeCard from "./HomeCard";

const Home = () => {
  const [getbills, setGetbills] = useState([]);

  const bills = () => {
    DataManager.getBills().then((res) => setGetbills(res));
  };

  useEffect(() => {
    bills();
  }, []);

  return (
    <div>
      {getbills.map((b) => (
        <HomeCard key={b.id} bill={b} />
      ))}
    </div>
  );
};

export default Home;
