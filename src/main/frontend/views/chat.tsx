import React, {useState} from "react";
import {Button, TextField} from "@vaadin/react-components";
import {ChatAIService} from "Frontend/generated/endpoints";
import Markdown from "react-markdown";

export default function Chat() {
    const [question, setQuestion] = useState<string>("")
    const [response, setResponse] = useState<string>("")

    async function askQuestion() {
        ChatAIService.ragChat(question).then(
            response => setResponse(response)
        )
    }
    return (
        <div>
            <h3>Chat</h3>
            <div>
                <TextField onChange={(e => setQuestion(e.target.value))} />
                <Button onClick={askQuestion}>Send</Button>
            </div>
            <Markdown>
                {response}
            </Markdown>
        </div>
    );
}