import { Suspense } from "react";
import Results, { ResultsSkeleton } from "./_components/results";

export default async function Home() {
  return (
    <div className="h-full p-8 max-w-screen-2xl mx-auto">
      <Suspense fallback={<ResultsSkeleton />}>
        <Results />
      </Suspense>
    </div>
  );
}
