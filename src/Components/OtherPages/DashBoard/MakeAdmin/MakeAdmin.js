import React from 'react';
import { Button } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import auth from '../../../../firebase.init';
import Loading from '../../../../Hooks/Loading';
import useDeletePost from '../../../../Hooks/useDeletePost';
import useGetPost from '../../../../Hooks/useGetPost';
import useUpdatePost from '../../../../Hooks/useUpdatePost';


const MakeAdmin = () => {
    const [user, loading, error] = useAuthState(auth);
    const {updateApi, updateDone} = useUpdatePost();
    const {deleteApi} = useDeletePost();
    //get correct user
  let userUrl = 'http://localhost:5000/users'
  const {posts} = useGetPost(userUrl);
   let dbUsers = posts;

   if(loading || !dbUsers?.length){
       return <Loading></Loading>
   }

    return (
        <div>
    <div className="table-responsive-md">
        <h6 className='text-center'>We Have <span className='text-danger'>{dbUsers?.length}</span>  users with Admin </h6>
    <table className="table table-striped">
    <thead>
    <tr>
      <th scope="col">SN.</th>
      <th scope="col">User Name</th>
      <th scope="col">Email</th>
      <th scope="col">Status</th>
      <th className='bg-warning rounded' scope="col"  colspan="2">Admin Action</th>
    </tr>
  </thead>
  <tbody>
  {
      dbUsers.map((dbUser, index) => <tr>
        <th scope="row">{index+1}</th>
        <td>{dbUser?.displayName}</td>
        <td>{dbUser?.email}</td>
        <td>{dbUser?.role ||'Viewer'}</td>

        <td> {
            (dbUser?.role ==='Admin') ? <Button variant="success" className='fw-bold b-title' size="sm" disabled>
          Already Admin
        </Button>:
        <Button onClick={()=>{
            const data ={ role: "Admin"}
             updateApi(`http://localhost:5000/users/${dbUser._id}`, data, user?.uid, 'Admin' )
        
        }} variant="success" className='fw-bold b-title' size="sm">
      Make Admin
    </Button>
            }</td>


        <td> <Button onClick={()=>{
            const data ={ role: "Admin"}
             deleteApi(`http://localhost:5000/users/${dbUser._id}`, dbUser._id, 'Admin' )
    
        }} variant="danger" className='fw-bold b-title' size="sm">
    Remove User
    </Button></td>
      </tr>)
  }

  </tbody>

    </table>
    </div>
        </div>
    );
};

export default MakeAdmin;