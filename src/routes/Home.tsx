import MapCluster from "components/MapCluster";

function Home({ reviewData }: any) {
  const color = "red";
  return (
    <>
      <MapCluster reviewData={reviewData} />
    </>
  );
}

export default Home;
