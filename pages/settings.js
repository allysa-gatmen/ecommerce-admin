import Layout from "@/components/Layout";
import {useEffect, useState} from "react";
import axios from "axios";
import {withSwal} from 'react-sweetalert2';

function Settings({swal}) {
    const [editedUser, setEditedUser] = useState(null);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    function fetchUsers() {
        axios.get('/api/users').then(result => {
            setUsers(result.data);
        });
    }

    async function saveUser(ev) {
        ev.preventDefault();
        const data = {email, name};
        try {
            if (editedUser) {
                data._id = editedUser._id;
                await axios.put('/api/users', data);
                setEditedUser(null);
            } else {
                await axios.post('/api/users', data);
            }
            setEmail('');
            setName('');
            fetchUsers();
        } catch (error) {
            console.error('Error saving user:', error);
            swal.fire('Error!', 'There was a problem saving the user.', 'error');
        }
    }

    function editUser(user) {
        setEditedUser(user);
        setEmail(user.email);
        setName(user.name);
    }

    function deleteUser(user) {
        swal.fire({
            title: 'Are you sure?',
            text: `Do you want to delete ${user.name}?`,
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Yes, Delete!',
            confirmButtonColor: '#d55',
            reverseButtons: true,
        }).then(async result => {
            if (result.isConfirmed) {
                try {
                    const {_id} = user;
                    await axios.delete('/api/users?_id=' + _id);
                    fetchUsers();
                    swal.fire({
                        title: 'Deleted!',
                        text: 'The user has been deleted.',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                } catch (error) {
                    console.error(error);
                    swal.fire('Error!', 'There was a problem deleting the user.', 'error');
                }
            }
        });
    }

    return (
        <Layout>
            <h1>Settings</h1>
            <label>{editedUser ? `Edit user ${editedUser.name}` : 'Create new user'}</label>
            <form onSubmit={saveUser}>
                <div className="flex gap-1">
                    <input
                        type="text"
                        placeholder="User name"
                        onChange={ev => setName(ev.target.value)}
                        value={name}/>
                    <input
                        type="email"
                        placeholder="User email"
                        onChange={ev => setEmail(ev.target.value)}
                        value={email}/>
                </div>
                <div className="flex gap-1">
                    {editedUser && (
                        <button
                            type="button"
                            onClick={() => {
                                setEditedUser(null);
                                setName('');
                                setEmail('');
                            }}
                            className="btn-primary">
                            Cancel
                        </button>
                    )}
                    <button type="submit" className="btn-primary py-1">Save</button>
                </div>
            </form>
            {!editedUser && (
                <table className="basic mt-4">
                    <thead>
                    <tr>
                        <td>User name</td>
                        <td>User email</td>
                        <td>Actions</td>
                    </tr>
                    </thead>
                    <tbody>
                    {users.length > 0 && users.map(user => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <div className="flex">
                                    <button
                                        onClick={() => editUser(user)}
                                        className="btn-primary mr-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"/>
                                        </svg>
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deleteUser(user)}
                                        className="btn-primary">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                                        </svg>
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </Layout>
    );
}

export default withSwal(({swal}, ref) => (
    <Settings swal={swal}/>
));
