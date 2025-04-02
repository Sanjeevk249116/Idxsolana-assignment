import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const NoteSkeleton = () => {
  return (
    <div className="note-card skeleton">
      <h3 className="note-title">
        <Skeleton width={150} height={24} />
      </h3>
      <p className="note-content">
        <Skeleton count={2} />
      </p>
      <p className="note-date">
        <Skeleton width={100} />
      </p>
      <Skeleton width={80} height={30} borderRadius={30} />
    </div>
  );
};

export default NoteSkeleton;
