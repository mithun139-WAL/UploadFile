/* eslint-disable react/no-children-prop */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable linebreak-style */
import React from 'react';
import {Card, CardBody, CardTitle} from 'reactstrap';
import ImageModal from './ImageModal';

export default function Photo({Thumbnail, Title, Url}) {
  return (
    <div className="mt-4">
      <ImageModal top width="100%" Thumbnail={Thumbnail} Url={Url} />
      <CardBody>
        <CardTitle style={{height: '3em'}} className="text-center " tag="p">
          {Title}
        </CardTitle>
      </CardBody>
    </div>
  );
}
