import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AuthContext } from "@/context/AuthContext";

import axios from "axios";
import { useContext, useEffect, useState } from "react";

function Earnings() {
  const { currentUser } = useContext(AuthContext);
  const [earnings, setEarnings] = useState([]);

  const getEarnings = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/admin/earnings`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "auth-token": `Bearer ${currentUser.token}`,
          },
        }
      );
      if (data) {
        setEarnings(data);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getEarnings();
  }, []);

  return (
    <div className="p-5 my-5">
      <h2 className="font-bold text-2xl mb-2">Users</h2>
      <Table>
        <TableCaption>A list of your earnings.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Year</TableHead>
            <TableHead>Month</TableHead>
            <TableHead>Earnings</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {earnings.map((earning, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium">
                <h2>{earning._id.year}</h2>
              </TableCell>
              <TableCell>{earning.monthName}</TableCell>
              <TableCell>${earning.earnings}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default Earnings;
