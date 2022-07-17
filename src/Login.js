import {Form, Button} from "react-bootstrap";
import {useState} from "react";
import api from "./api";


export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("");



    const login = async (e) => {
        e.preventDefault();
        const {data} = await api.post('login', {username, password});
        localStorage.setItem('token', data.token);
        window.location.reload();
    }

    return (
        <>
            <Form className="d-grid m-2 justify-content-center" onSubmit={login}>
                <Form.Group className="mb-3 text-center w-75" >
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username"
                                  onChange={(e) => setUsername(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3 text-center w-75">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"
                                  onChange={(e) => setPassword(e.target.value)}/>
                </Form.Group>
                <Button variant="primary" type="submit" className="w-75">
                    Submit
                </Button>
            </Form>
        </>
    )
}