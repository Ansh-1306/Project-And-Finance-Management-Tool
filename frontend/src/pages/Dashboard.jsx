import React, { useState, useContext, memo, Fragment } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Accordion, useAccordionButton, AccordionContext } from 'react-bootstrap'



const VerticalNav = () => {
    return (<Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
            <Accordion.Header>Accordion Item 1</Accordion.Header>
            <Accordion.Body>
            <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code> .accordion-body</code>, though the transition does limit overflow.
            </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
            <Accordion.Header>Accordion Item 2</Accordion.Header>
            <Accordion.Body>
            <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code> .accordion-body </code>, though the transition does limit overflow.
            </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
            <Accordion.Header>Accordion Item 3</Accordion.Header>
            <Accordion.Body>
            <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code> .accordion-body </code>, though the transition does limit overflow.
            </Accordion.Body>
        </Accordion.Item>
    </Accordion>
    )
}

export default VerticalNav
