import React from 'react'
import { Form, Col } from 'react-bootstrap'

export default function SearchForm({ params, onParamsChange }) {
  return (
    <Form className="mb-4">
      <Form.Row className="align-items-end">
        <Form.Group as={Col}>
          <Form.Label>Description</Form.Label>
          <Form.Control
            onChange={onParamsChange}
            value={params.description}
            name="description"
            type="text"
          />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Location</Form.Label>
          <Form.Control
            onChange={onParamsChange}
            value={params.location}
            name="location"
            type="text"
          />
        </Form.Group>
        <Form.Group as={Col} xs="auto" className="mt-2">
          <Form.Check
            onChange={onParamsChange}
            value={params.full_time}
            name="full_time"
            type="checkbox"
            id="full-time"
            label="Full Time"
          />
        </Form.Group>
      </Form.Row>
    </Form>
  ); 
}
