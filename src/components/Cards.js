import React, { useMemo, useRef, useState } from 'react'
import TinderCard from 'react-tinder-card'
// import axios from "axios"
import '../styles/movieCards.css'
import '../styles/buttons.css'

const Cards = () => {

    const [movies, setMovies] = useState([
            {
                id: "1and3011",
                imageURL: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTUzNTE2NTkzMV5BMl5BanBnXkFtZTgwMDAzOTUyMDI@._V1_SY1000_CR0,0,674,1000_AL_.jpg",
                title: "Inferno",
                summary: "Lorem ipsum….",
                rating: 5.3
            },
            {
                id: "2301abc",
                imageURL: "https://images-na.ssl-images-amazon.com/images/M/MV5BOTAzODEzNDAzMl5BMl5BanBnXkFtZTgwMDU1MTgzNzE@._V1_SY1000_CR0,0,677,1000_AL_.jpg",
                title: "Star Wars: Episode VII - The Force Awakens",
                summary: "Lorem ipsum….",
                rating: 8.2
            },
            {
              id: "2301abc1",
              imageURL: "https://musicart.xboxlive.com/7/df1a5100-0000-0000-0000-000000000002/504/image.jpg?w=1920&h=1080",
              title: "John Wick 3",
              summary: "Lorem ipsum….",
              rating: 9.2
            },
            {
              id: "2301abc12",
              imageURL: "https://i.ebayimg.com/images/g/L0UAAOSwLjtiVwE5/s-l500.jpg",
              title: "Top Gun Maverick",
              summary: "Lorem ipsum….",
              rating: 9.8
            }
    ])

    // useEffect(() => {
    //     const getMovies = async () => {
    //       try{
    //        const res = await axios.get("http://somebackend/recommendations")
    //        setMovies(res.data)
    //       }catch(err){
    //           console.log(err) 
    //       }
    //     };
    //    getMovies()
    //   }, [])
    
    const [currentIndex, setCurrentIndex] = useState(movies.length - 1)
    const [lastDirection, setLastDirection] = useState()
    const currentIndexRef = useRef(currentIndex)
  
    const childRefs = useMemo(
      () =>
        Array(movies.length)
          .fill(0)
          .map((i) => React.createRef()),
      [movies.length]
    )
  
    const updateCurrentIndex = (val) => {
      setCurrentIndex(val)
      currentIndexRef.current = val
    }
    
    const canSwipe = currentIndex >= 0
  
    const swiped = (direction, id, index) => {
      setLastDirection(direction)
      updateCurrentIndex(index - 1)
    //   axios.put(`https://somebackend/recommendations/${id}/reject`, {
    //   })
    //   .then(response => {
    //       console.log(response);
    //   })
    //   .catch(error => {
    //       console.error(error);
    //   });//Dummy call to backend
    }
  
    const outOfFrame = (name, idx) => {
      currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
    }
  
    const swipe = async (dir,id) => {
      if (canSwipe && currentIndex < movies.length) {
        // if(dir === 'left'){
        //   axios.put(`https://somebackend/recommendations/${id}/reject`, {
        //   })
        //   .then(response => {
        //       console.log(response);
        //   })
        //   .catch(error => {
        //       console.error(error);
        //   });//Dummy call to backend
        // }else{
        //   axios.put(`https://somebackend/recommendations/${id}/reject`, {
        //   })
        //   .then(response => {
        //       console.log(response);
        //   })
        //   .catch(error => {
        //       console.error(error);
        //   });//Dummy call to backend
        // }
        await childRefs[currentIndex].current.swipe(dir)
      }
    }
      
  return (
    <div className='Cards'>
      <div className='cardContainer'>
        {movies.map((movie, index)  => (
              <TinderCard
                className='swipe'
                key={movie.id} 
                ref={childRefs[index]}
                preventSwipe={['right', 'up', 'down']}
                onSwipe={(dir) => swiped(dir, movie.id, index)}
                onCardLeftScreen={() => outOfFrame(movie.id, index)}
              >
                <div className='card' data={currentIndex} data-testid='card' style={{ backgroundImage: `url(${movie.imageURL})` }}>
                  <div className='infoContainer'>
                    <h3 data-testid='card-title' className='movieTitle'>{movie.title}</h3>
                    <h3 className='movieRating'>{movie.rating}/10</h3>
                    <h3 className='movieSummary'>{movie.summary}</h3>
                  </div>
                </div>
              </TinderCard>
        ))}
            {movies.map(movie => (
            <div className='Buttons' key={movie.id}>
              <svg data-testid="swipe-left" onClick={() => swipe('left', movie.id)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="reject" viewBox="0 0 16 16">
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
              </svg>
              <svg data-testid="swipe-right" onClick={() => swipe('right', movie.id)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="accept" viewBox="0 0 16 16">
                  <path filrule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
              </svg>
            </div>
            ))}
      </div>
    </div>
  )
}

export default Cards