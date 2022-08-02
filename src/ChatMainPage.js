import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import {useContext, useEffect, useState} from "react";
import api from "./api";
import userContext from "./UserContext";
import {Button, Container, Navbar} from "react-bootstrap";
import ChatModal from './ChatModal';

export default function ChatMainPage() {

    const [users, setUsers] = useState([]);
    const [chattingUser, setChattingUser] = useState({});
    const [chatModalShow, setChatModalShow] = useState(false);

    useEffect(() => {
        getUsers().catch(console.error);
    }, [])

    const currentUser = useContext(userContext);

    async function getUsers() {
        try {
            const {data} = await api.get('users');
            const users = data.filter((user) => user.username !== currentUser.username);
            setUsers(users);
        } catch (err) {
            console.log(err);
        }

    }

    const showChat = (user) => {
        setChattingUser(user);
        setChatModalShow(true);
    }

    const onHide = () => {
        setChatModalShow(false)
    }

    return (
        <Container>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand>{currentUser.firstName} {currentUser.lastName}</Navbar.Brand>
                    <Button variant="outline-light"
                            onClick={() => {
                                localStorage.clear();
                                window.location.reload();
                            }}
                    >Logout</Button>
                </Container>
            </Navbar>
            <ListGroup className="m-2">
                {
                    users.map(user => (
                        <ListGroup.Item key={user.username}
                                        as="li"
                                        className="d-flex justify-content-between align-items-start"
                        >
                            <div className="ms-3 me-auto"
                                 onClick={() => showChat(user)}
                                 style={{cursor: "pointer"}}
                            >
                                {user.firstName} {user.lastName}
                            </div>
                            <Badge bg="primary" pill>
                                {user.username}
                            </Badge>
                        </ListGroup.Item>
                    ))
                }
            </ListGroup>
            <ChatModal
                show={chatModalShow}
                user={chattingUser}
                onHide={onHide}
            />
        </Container>
    )


}