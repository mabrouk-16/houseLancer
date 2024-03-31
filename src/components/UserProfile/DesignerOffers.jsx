import { useGetDesignerOffersQuery } from "../../services/offer"
import Offer from "../Offer/Offer"
import UserProjectsOffer from "../UserProjectsOffer/UserProjectsOffer"
import styles from './UserProfile.module.css'

function DesignerOffers() {
  const {data:designerOffers ,isLoading ,error} = useGetDesignerOffersQuery()
  console.log(designerOffers)
  return (
    <>
      {designerOffers?.data?.length > 0 ? (
        designerOffers?.data?.map((item) => (
          <div className={`${styles.designer_offres}`} key={item._id}>
            <UserProjectsOffer data={item} />
          </div>
        ))
      ) : (
        <p className='p-3'>NO OFFERS FOUND</p>
      )}
    </>
  )
}

export default DesignerOffers