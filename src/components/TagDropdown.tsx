import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  InputGroup,
  NavDropdown,
  Row,
} from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { IoAdd, IoPricetags } from "react-icons/io5";
import { ProblemContext } from "../context/ProblemContext";
import { Tag } from "../db/collections/Tag";

export default function TagDropdown() {
  const { tags } = useContext(ProblemContext);
  const [show, setShow] = useState(false);
  const [mouseEntered, setMouseEntered] = useState(false);
  const [hideTimeout, sethideTimeout] = useState<NodeJS.Timeout | null>(null);
  const [newTagName, setNewTagName] = useState("");

  useEffect(() => {
    if (mouseEntered) {
      if (hideTimeout) {
        clearTimeout(hideTimeout);
      }
      sethideTimeout(() => null);
      setShow(() => true);
      return;
    }

    if (hideTimeout) return;

    const timeout = setTimeout(() => {
      setShow(() => false);
    }, 300);

    sethideTimeout(timeout);
  }, [mouseEntered]);

  const addNewTag = () => {
    if (!newTagName) return;
    Tag.add(newTagName);
    setNewTagName(() => "");
  };

  return (
    <>
      <NavDropdown
        title={<IoPricetags />}
        className="fs-5"
        show={show}
        onClick={(e) => e.preventDefault()}
        onMouseEnter={() => setMouseEntered(() => true)}
        onMouseLeave={() => setMouseEntered(() => false)}
      >
        {tags.map((tag) => (
          <React.Fragment key={tag.name}>
            <NavDropdown.Item>
              <Row>
                <Col className="col-9">{tag.name}</Col>
                <Col className="col-3 align-self-end text-end">
                  <FaTrash onClick={() => Tag.delete(tag.name)} />
                </Col>
              </Row>
            </NavDropdown.Item>
            <NavDropdown.Divider />
          </React.Fragment>
        ))}
        <NavDropdown.ItemText className="text-center">
          <InputGroup>
            <Form.Control
              value={newTagName}
              onChange={(e) => setNewTagName(() => e.target.value)}
            />
            <Button onClick={() => addNewTag()}>
              <IoAdd />
            </Button>
          </InputGroup>
        </NavDropdown.ItemText>
      </NavDropdown>
    </>
  );
}
