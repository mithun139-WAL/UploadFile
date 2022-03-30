/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
/* eslint-disable linebreak-style */
import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Pagination, PaginationItem, PaginationLink} from 'reactstrap';

export default function Pages({album, albumNo}) {
  return (
    <div
      style={{
        display: 'block',
        width: 700,
      }}
    >
      <Pagination>
        {album.map((val) => {
          return (
            <PaginationItem>
              <PaginationLink onClick={() => setAlbumNo(val.id)} href="#">
                {val.id}
              </PaginationLink>
            </PaginationItem>
          );
        })}
      </Pagination>
    </div>
  );
}
