import React, { useState, useEffect } from 'react';
import { MolecularComponents, Components} from '../../Exports/index';
import "./allPosts.scss";
import { GetAllPosts } from '../../API/GetAllPosts/GetAllPosts';
import PostCard from '../../MolecularComponents/PostCard/PostCard';


const AllPosts = () => {
    const { ErrorModal } = MolecularComponents
    const [allPosts, setAllPosts] = useState(null)
    const [errMessage, setErrMessage] = useState(null)
    const { UserProfile: { PostContainer } } = Components

    useEffect(() => {
      GetAllPosts()
      .then((data)=> {
        setAllPosts([...data])
      })
      .catch((err) => {
        setErrMessage(err.message)
      })    
    }, [])

  return (
    <div className='all-posts'>
    <div className='wrapper'>{
      allPosts &&
        allPosts.map((post)=> {
          return <PostCard post = {post}/>
        })
    }</div>
    <ErrorModal message={errMessage} setErrMessage= {setErrMessage}/>
    </div>
  )
}

export default AllPosts;