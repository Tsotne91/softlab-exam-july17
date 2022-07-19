import React, {useEffect, useState, useRef} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {Alert, Container, InputGroup} from "react-bootstrap";
import api from "./api";

export default function ChatModal({show, user, onHide}) {
    const [formValue, setFormValue] = useState("");
    const [messages, setMessages] = useState([]);
    const bottomRef = useRef(null);


    useEffect(() => {
        let myInterval = setInterval(getConversation, 3000);
        return (() =>
                clearInterval(myInterval)
        )
    }, [user])

    useEffect(() => {
        // 👇️ scroll to bottom every time messages change
        bottomRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [messages]);


    async function getConversation() {
        const {data} = await api.get(`chat?username=${user.username}`);
        await setMessages(data);
    }

    const changeHandler = (e) => setFormValue(e.target.value);

    const sendMessage = async (e) => {
        e.preventDefault();
        try {
            await api.post(`chat?username=${user.username}`, {"text": formValue});
        } catch (e) {
            console.log(e);
        }
        setFormValue("");
        await getConversation();
    }


    return (
        <>
            <Modal show={show} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title> {user.firstName} {user.lastName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container className="overflow-auto vh-100">
                        {
                            messages.map(message => (
                                message.sender === user.username ?
                                    <Alert key={message.time} variant="secondary" className="me-5">
                                        {message.text}
                                    </Alert> :
                                    <Alert key={message.time} variant="primary" className="ms-5">
                                        {message.text}
                                    </Alert>
                            ))
                        }
                        <div ref={bottomRef}/>
                    </Container>
                    <Form onSubmit={sendMessage}>
                        <InputGroup className="mb-3">
                            <Form.Group className="flex-fill">
                                <Form.Control
                                    type="textarea"
                                    placeholder="Type here..."
                                    onChange={changeHandler}
                                    value={formValue}
                                    required/>
                            </Form.Group>
                            <Button
                                type="submit"
                            >Send</Button>
                        </InputGroup>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}