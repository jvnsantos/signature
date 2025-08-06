import { Fragment } from 'react';
import { Breadcrumb } from "react-bootstrap";

export default function Pageheader(props:any) {
  return (
    <Fragment>
      <div className="page-header">
        <h1 className="page-title my-auto">{props.title}</h1>
        <div className="ms-md-1 ms-0">
          <Breadcrumb className="mb-0" bsPrefix='breadcrumb mb-0'>
            <Breadcrumb.Item href="#!">{props.heading}</Breadcrumb.Item>
            <Breadcrumb.Item active aria-current="page">{props.active}</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
    </Fragment>
  );
}
