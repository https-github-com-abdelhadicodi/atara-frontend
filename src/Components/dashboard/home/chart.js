import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { ArcElement, Tooltip, Legend, Chart as ChartJS } from "chart.js";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend);

export function Chart() {
  const [value, setValue] = useState("dashboard");
  const [userData, setUserData] = useState(0);
  const [adminData, setAdminData] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userResponse = await axios.get(`https://atara-backend.onrender.com/user`);
      const adminResponse = await axios.get(`https://atara-backend.onrender.com/admin`);
      setUserData(userResponse.data.length);
      setAdminData(adminResponse.data.length);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const chartData = {
    datasets: [
      {
        data: [userData, adminData],
        backgroundColor: ["#006226", "#ee992c"],
        borderColor: ["white"],
        borderWidth: 4,
        cutout: "65%",
      },
    ],
    labels: ["User", "Admin"],
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box>
        <Typography variant="h6" sx={{ fontWeight: "bold" }} marginBottom={1}>
         Charts
        </Typography>
      </Box>
      <Box>
        <Tabs
          sx={{ margin: "30px" }}
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
        </Tabs>
      </Box>
      <Doughnut data={chartData} />
    </Box>
  );
}

export default Chart;


