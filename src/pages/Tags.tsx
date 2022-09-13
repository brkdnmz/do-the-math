import { useContext, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { IoAddCircle } from "react-icons/io5";
import Header from "../components/Header";
import TagAdder from "../components/TagAdder";
import TagComponent from "../components/TagComponent";
import AdminOnly from "../components/util/AdminOnly";
import DynamicOpacity from "../components/util/DynamicOpacity";
import { ProblemContext } from "../context/ProblemContext";
import { Tag } from "../db/collections/Tag";

export default function Tags() {
  const context = useContext(ProblemContext);
  const [addingTag, setAddingTag] = useState(false);

  const onTagAdd = async (tag: string) => {
    try {
      if (tag.length === 0) {
        throw Error("Tag length must be greater than zero.");
      }

      await Tag.add(tag);
      setAddingTag(() => false);
    } catch (e) {
      console.log(e);
    }
  };

  const onTagAddCancel = () => {
    setAddingTag(() => false);
  };

  const onTagDelete = async (tag: string) => {
    try {
      await Tag.delete(tag);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Header pageHeader="Tags" />
      <Card>
        <Card.Body>
          <Row className="g-1 align-items-center">
            {context.tags.map((tag) => (
              <Col key={tag.name} className="d-flex col-auto">
                <TagComponent tag={tag} onDelete={onTagDelete} />
              </Col>
            ))}
            <Col className="d-flex col-auto">
              {!addingTag ? (
                <AdminOnly>
                  <DynamicOpacity>
                    <IoAddCircle
                      role="button"
                      color="green"
                      size={20}
                      onClick={() => setAddingTag(true)}
                    />
                  </DynamicOpacity>
                </AdminOnly>
              ) : (
                <TagAdder onAdd={onTagAdd} onCancel={onTagAddCancel} />
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}
