
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";

const AppliedJob = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);

  const [selectedDay, setSelectedDay] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const getDaysAgo = (dateString) => {
    const appliedDate = new Date(dateString);
    const today = new Date();
    const diffTime = today - appliedDate;
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  };

  const filteredJobs = showAll
    ? allAppliedJobs
    : allAppliedJobs.filter(
        (job) => getDaysAgo(job.createdAt.split("T")[0]) === selectedDay
      );

  const handleSortDaysBack = (day) => {
    setSelectedDay(day);
    setShowAll(false); 
  };

  const handleShowAll = () => {
    setShowAll(true); 
  };

  return (
    <div className="space-y-6">
      
      <div className="flex gap-2 flex-wrap">
        <Button style={{display:""}} onClick={() => handleSortDaysBack(0)}>Today</Button>
        <Button onClick={handleShowAll}>Show All</Button>
      </div>

     
      <div>
        <h2 className="text-lg font-semibold mb-2">
          {showAll
            ? "All Applied Jobs"
            : selectedDay === 0
            ? "Jobs Applied Today"
            : `${selectedDay} Day${selectedDay > 1 ? "s" : ""} Ago`}
        </h2>

        {filteredJobs.length === 0 ? (
          <p className="text-sm text-gray-500">No jobs applied on this day.</p>
        ) : (
          <Table>
            <TableCaption>Recent Applied Jobs</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Job Title</TableHead>
                <TableHead>Company</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredJobs.map((appliedJob) => (
                <TableRow
                  key={appliedJob._id}
                  className={
                    !showAll &&
                    getDaysAgo(appliedJob.createdAt.split("T")[0]) === 0 &&
                    selectedDay !== 0
                      ? "hidden"
                      : ""
                  }
                >
                  <TableCell>
                    {appliedJob?.createdAt.split("T")[0]}
                  </TableCell>
                  <TableCell>{appliedJob.job?.title}</TableCell>
                  <TableCell>{appliedJob.job?.company.name}</TableCell>
                  <TableCell className="text-right">
                    <Badge
                      className={`${
                        appliedJob?.status === "rejected"
                          ? "bg-red-500"
                          : appliedJob?.status === "accepted"
                          ? "bg-green-600"
                          : "bg-gray-500"
                      }`}
                    >
                      {appliedJob?.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default AppliedJob;