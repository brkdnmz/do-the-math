import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Container,
  Form,
  InputGroup,
  NavDropdown,
  Row,
} from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { IoAdd, IoPricetags } from "react-icons/io5";
import { ProblemContext } from "../context/ProblemContext";
import { Tag } from "../db/collections/Tag";
import FlexCol from "./util/CenteringCol";

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
  }, [hideTimeout, mouseEntered]);

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
        onMouseOver={() => setMouseEntered(() => true)}
        onMouseLeave={() => setMouseEntered(() => false)}
      >
        {tags.map((tag) => (
          <React.Fragment key={tag.name}>
            <NavDropdown.ItemText>
              <Container
                fluid
                className="p-0"
              >
                <Row style={{ width: "200px", fontSize: "12px" }}>
                  <FlexCol className="col text-break align-items-center">
                    {tag.name}
                  </FlexCol>
                  <FlexCol className="col-auto justify-content-end align-items-center">
                    <Button
                      variant="link"
                      className="p-0 m-0 d-flex"
                      onClick={() => Tag.delete(tag.name)}
                    >
                      <FaTrash color="red" />
                    </Button>
                  </FlexCol>
                </Row>
              </Container>
            </NavDropdown.ItemText>
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
