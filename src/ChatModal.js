import React, {useEffect, useState, useRef} from 'react';
import {Alert, Container, InputGroup, Button, Form, Modal} from "react-bootstrap";
import {RiSendPlaneFill} from "react-icons/ri";
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
        bottomRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [messages.length]);


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
                <Modal.Header closeButton className="position-sticky">
                    <Modal.Title> {user.firstName} {user.lastName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container className="overflow-auto" style={{height: "70vh"}}>
                        {
                            messages.map(message => (
                                message.sender === user.username ?
                                    <Alert key={message.time} variant="secondary" className="me-5 my-2 py-2">
                                        {message.text}
                                    </Alert> :
                                    <Alert key={message.time} variant="primary" className="ms-5 my-2 py-2">
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
                            >
                                <RiSendPlaneFill/>
                            </Button>
                        </InputGroup>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}