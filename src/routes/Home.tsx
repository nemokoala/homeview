import MapCluster from "components/MapCluster";

function Home({ reviewData }: any) {
  return (
    <>
      <MapCluster reviewData={reviewData} />
    </>
  );
}

export default Home;
