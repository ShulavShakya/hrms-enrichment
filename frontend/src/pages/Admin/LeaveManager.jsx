import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const LeaveManager = () => {
  const [leaves, setLeaves] = useState([]);
  const [employees, setEmployess] = useState([]);
  const [formData, setFormData] = useState([]);

  const fetchLeaves = async () => {
    try {
      const res = await axios.get("https://localhost/3000/api/leave/get");
      setLeaves(res.data.data);
    } catch (error) {
      toast.error("Failed to retrieve leave applications", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
      });
      console.log(err);
    }
  };
};
