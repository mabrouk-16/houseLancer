import React, { useEffect, useState } from 'react';
import Offer from '../Offer/Offer';
import { useGetProjectOffersQuery } from '../../services/offer';

function Offers({ projectId }) {
  console.log(projectId)
  const { data: projectOffers, error, isLoading } = useGetProjectOffersQuery(projectId);
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    if (projectOffers) {
      console.log(projectOffers)
      setOffers(projectOffers.data);
    }
  }, [projectOffers]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      {offers.length > 0 &&
        offers.map((item) => (
          <div key={item._id}>
            <Offer data={item} />
          </div>
        ))}
    </>
  );
}

export default Offers;
