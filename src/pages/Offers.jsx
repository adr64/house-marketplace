import { useEffect, useState } from "react"
import { collection, getDocs, query, where, orderBy, limit, startAfter } from "firebase/firestore"
import { db } from "../firebase.config"
import { toast } from "react-toastify"
import Spinner from "../components/Spinner"
import ListingItem from "../components/ListingItem"

function Offers() {
    const [listings, setListings] = useState(null)
    const [loading, setLoading] = useState(true)
    const [lastFetchListing, setLastFetchListing] = useState(null)

    const l = 10

    useEffect(() => {
        const fetchListings = async () => {
            try {
                // Get reference
                const listingsRef = collection(db,'listings')

                // Create query
                const q = query(listingsRef, where('offer', '==', true), orderBy('timestamp', 'desc'), limit(l))

                // Exceute query
                const querySnap = await getDocs(q)

                const lastVisible = querySnap.docs[querySnap.docs.length - 1]
                setLastFetchListing(lastVisible)

                const listings = []

                querySnap.forEach((doc) => {
                    return listings.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })

                setListings(listings)
                setLoading(false)
            } catch (error) {
                toast.error('Could not fetch listings')
            }
        }
        fetchListings()
    }, [])
    
    // Pagination / Load More
    const onFetchMoreListings = async () => {
        try {
            // Get reference
            const listingsRef = collection(db, 'listings')

            // Create query
            const q = query(listingsRef, where('offer', '==', true), orderBy('timestamp', 'desc'), 
                        limit(l), startAfter(lastFetchListing))

            // Exceute query
            const querySnap = await getDocs(q)

            const lastVisible = querySnap.docs[querySnap.docs.length - 1]
            setLastFetchListing(lastVisible)

            const listings = []

            querySnap.forEach((doc) => {
                return listings.push({
                    id: doc.id,
                    data: doc.data()
                })
            })

            setListings((prevState) => [...prevState, ...listings])
            setLoading(false)
        } catch (error) {
            console.log(error)
            toast.error('Could not fetch listings')
        }
    }    

    return (
        <div className="category">
            <header>
                <p className="pageHeader">Offers</p>
            </header>

            {loading ? <Spinner/> : listings && listings.length > 0 ? ( 
            <>
                <main>
                    <ul className="categoryListings">
                        {listings.map((listing) => (
                            <ListingItem key={listing.id} listing={listing.data} id={listing.id}/>
                        ))}
                    </ul>
                </main>
                <br />
                {lastFetchListing && (
                    <p className="loadMore" onClick={onFetchMoreListings}>Load More</p>
                )}
            </> 
            )
            : (<p>No offers available </p>)}
        </div>
    )
  }
  
  export default Offers