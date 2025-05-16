import React, { useState } from "react";
import { Button, Container, Row, Col, Card, Form } from "react-bootstrap";
import { useClipboard } from "use-clipboard-copy";
import { FaClipboard } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const CheckSecret = ({ setActivePage }: any) => {
  const [words, setWords] = useState<any>({
    1: "team",
    2: "trap",
    3: "come",
    4: "cause",
    5: "prosper",
    6: "search",
    7: "pool",
    8: "thumb",
    9: "spread",
    10: "disorder",
    11: "amused",
    12: "gather",
  });

  const clipboard = useClipboard();

  const handleWordChange = (index: any, value: any) => {
    setWords((prevWords: any) => ({
      ...prevWords,
      [index]: value,
    }));
  };

  const copyToClipboard = () => {
    const phraseText = Object.values(words).join(" ");
    clipboard.copy(phraseText);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Handle wallet securing logic here
    console.log("Recovery phrase saved:", Object.values(words).join(" "));
  };

  const renderWordInputs = () => {
    const inputs = [];
    for (let i = 1; i <= 12; i++) {
      inputs.push(
        <Col key={i} xs={4} className="mb-3">
          <div className="wordContainer">
            <div className="wordNumber">{i}</div>
            <Form.Control
              type="text"
              value={words[i]}
              onChange={(e: any) => handleWordChange(i, e.target.value)}
              className="wordInput"
            />
          </div>
        </Col>
      );
    }
    return inputs;
  };

  return (
    <div className="">
      <Container>
        <Card className="recoveryPhraseCard">
          <Card.Body>
            <h1 className="title">Create Your Recovery Phrase</h1>

            <p className="instruction mb-3">
              Write down this 12-word Secret Recovery Phrase and keep it in a
              safe place where only you can access it.
            </p>

            <Form onSubmit={handleSubmit}>
              <Row className="wordsContainer">{renderWordInputs()}</Row>

              <p className="saveInstruction">
                Save these words in the correct order and keep them safe.
              </p>

              <div className="actionsContainer mt-3">
                <Button
                  variant="outline-secondary"
                  className="copyButton"
                  onClick={copyToClipboard}
                >
                  <FaClipboard className="clipboardIcon" /> Copy to Clipboard
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
        <div className="d-flex justify-content-center mt-4">
          <Button
            onClick={() => {
              setActivePage("createdone");
            }}
            type="submit"
            variant="primary"
            className="submitButton"
          >
            Confirm Phrase
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default CheckSecret;
