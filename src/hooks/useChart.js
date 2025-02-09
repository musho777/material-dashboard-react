import { useEffect, useState } from "react";

export const useChart = ({ data }) => {
  const [chartData, setChartData] = useState({
    data: {},
    error: "",
    loading: false,
    lastUpdate: "",
  });

  useEffect(() => {
    const now = new Date();
    const options = { hour: "2-digit", minute: "2-digit" };
    let curretnDate = now.toLocaleTimeString([], options);
    let newData = {};
    if (data) {
      newData = {
        labels: data
          ?.map((blink) => {
            const date = new Date(blink.timestamp);
            return `${date.getHours()}:${String(date.getUTCMinutes()).padStart(2, "0")}`;
          })
          .reverse(),
        datasets: {
          label: "eye blink",
          data: data?.map((blink) => blink.count).reverse(),
        },
      };
    }
    setChartData({
      data: newData,
      error: "",
      loading: false,
      lastUpdate: curretnDate,
    });
  }, [data]);

  return { chartData };
};
