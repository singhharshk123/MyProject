import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
        root: {
            border: "solid",
            padding: '0 30px',
        },
    },
});


function MaterialTable() {
    const design = useStyles();

    const [userId, setUserId] = useState("");
    const [user, setUser] = useState([]);
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [website, setWebsite] = useState("");


    function getList() {
        fetch("https://jsonplaceholder.typicode.com/users").then((response) => {
            response.json().then((solution) => {
                // console.log("results",solution.results);
                setUser(solution);
                setName(solution.name);
                setUsername(solution.username);
                setEmail(solution.email);
                setPhone(solution.phone);
                setWebsite(solution.website);
                setUserId(solution.id);
            })
        })
    }

    useEffect(() => {
        getList();
    }, []);


    function AddUserRow(e) {
        e.preventDefault();

        let newData = {
            userId,
            name,
            username,
            email,
            phone,
            website
        }

        fetch("https://jsonplaceholder.typicode.com/users", {
            method: 'POST',
            headers: {
                'Accept': "application/json",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newData)
        }).then((resp) => {
            resp.json().then((result) => {
                console.log("result is :-", result);
                setUser([...user, result]);

                // setnewData(result);
                setName("");
                setUsername("");
                setEmail("");
                setPhone("");
                setWebsite("");
                setUserId("");
            })
        })
    }

    function deleteUser(id) {
        fetch(`https://jsonplaceholder.typicode.com/users ${id}`, {
            method: 'DELETE'
        }).then(resp => {
            resp.json().then(result => {
                console.warn(result);
                getList();
            })
        })
    }

    function selectUser(id) {
        // console.log(user[id - 1]);
        let updateItem = user[id - 1];
        setName(updateItem.name);
        setUsername(updateItem.username);
        setEmail(updateItem.email);
        setPhone(updateItem.phone);
        setWebsite(updateItem.website);
        setUserId(updateItem.id);
    }

    function updateUser(e) {
        e.preventDefault();
        let updateItem = { name, username, email, phone, website, userId };

        fetch(`https://jsonplaceholder.typicode.com/users ${userId}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateItem)
        }).then(resp => {
            resp.json().then(result => {
                console.warn(result);
                getList();
            })
        })
    }

    return (
        <div className="design">
            <h1>Task Completed in Material UI Table</h1>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>UserName</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Website</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {
                            user.map((item, i) =>
                                <TableRow key={i}>
                                    <TableCell>{item.id}</TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.username} </TableCell>
                                    <TableCell>{item.email}</TableCell>
                                    <TableCell>{item.phone}</TableCell>
                                    <TableCell>{item.website}</TableCell>
                                    <td><button onClick={() => deleteUser(item.id)}  >Delete</button></td>
                                    <td><button onClick={() => selectUser(item.id)}>Update</button></td>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <br /> <br />
            <h1 className="editing">For adding a user or updating the user details :-</h1>
            <form onSubmit={() => AddUserRow} >
                <input type="text" placeholder="name" name="name" value={name} onChange={(e) => { setName(e.target.value) }} /> &nbsp;&nbsp;
                    <input type="text" placeholder="username" name="username" value={username} onChange={(e) => { setUsername(e.target.value) }} /> &nbsp;&nbsp;
                    <input type="text" placeholder="email" name="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />&nbsp;&nbsp;
                    <input type="text" placeholder="phone" name="phone" value={phone} onChange={(e) => { setPhone(e.target.value) }} />&nbsp;&nbsp;
                    <input type="text" placeholder="website" name="website" value={website} onChange={(e) => { setWebsite(e.target.value) }} />&nbsp;&nbsp;
                    <button type="button" onClick={AddUserRow} >Add User Row</button>  &nbsp;&nbsp;
                   <button onClick={updateUser} >Update User Row</button>
            </form>
        </div>
    )

}

export default MaterialTable;