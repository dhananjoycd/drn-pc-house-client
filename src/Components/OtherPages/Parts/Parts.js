import React from 'react';
import Loading from '../../../Hooks/Loading';
import useMongoDB from '../../../Hooks/useMongoDB';
import Part from '../Part/Part';

const Parts = () => {
    const {pcParts} = useMongoDB();
    const posts = pcParts;
    if(!pcParts.length){
        return <Loading></Loading>
    }
    return (
        <div className='container-xxl'>
            <div className="d-flex justify-content-center mt-4">
            <h3 className='title text-center'>All Products Collecton</h3>
            </div>

            <h3 className='text-center py-1 text-primary fs-5'><small className='font-title'>
      We have <span  className='text-danger'>{posts?.length}</span> attractive products available in our total  products collection 
          
          </small> </h3>
   
<div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 g-4">
{
    posts.map(post => <Part key={post._id} post={post}></Part>)
}
  
</div>
        </div>
    );
};

export default Parts;