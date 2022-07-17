import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {Alert, InputGroup} from "react-bootstrap";
import api from "./api";

export default function ChatModal({show, user, onHide}) {
    const [formValue, setFormValue] = useState("");
    const [messages, setMessages] = useState([]);
    const [sent, setSent] = useState(false);

    useEffect(() => {
           getConversation().catch()
        return (

        )
    }, [user])


    async function getConversation() {
        const {data} = await api.get(`chat?username=${user.username}` );
        await setMessages(data);
    }

    const changeHandler = (e) => setFormValue(e.target.value);

    const sendMessage = async (e) => {
        e.preventDefault();
        try {
            await api.post(`chat?username=${user.username}`, {"text": formValue});
        } catch (e) {
            console.log(e)
        }
        await getConversation();
        setFormValue("");
    }

    return (
        <>
            <Modal show={show} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title> {user.firstName} {user.lastName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        {
                            messages.map(message => (
                                message.sender === user.username ?
                                    <Alert key={message.time} variant="primary">
                                    {message.text}
                                </Alert> :
                                    <Alert key={message.time} variant="secondary">
                                        {message.text}
                                    </Alert>

                                ))
                        }
                    </div>
                    <Form>
                        <InputGroup className="mb-3">
                            <Form.Group>
                                <Form.Control
                                    type="text"
                                    placeholder="Type here..."
                                onChange={changeHandler}
                                required/>
                            </Form.Group>
                            <Button
                                onClick={sendMessage}
                            >Send</Button>
                        </InputGroup>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}