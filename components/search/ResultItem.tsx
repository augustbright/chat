import React from "react";
import Link from "next/link";

export default ({ exploreResult }) => {
  return (
    <Link href="/room/[id]" as={`/room/${exploreResult._id}`}>
      <div>
        <a className="card bg-light">
          <div className="card-body">
            <div className="card-title">{exploreResult.name}</div>
          </div>
        </a>
      </div>
    </Link>
  );
};
